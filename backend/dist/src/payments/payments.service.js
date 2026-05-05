"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let PaymentsService = class PaymentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async mockConfirm(orderId, dto) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: {
                payments: true,
                tickets: true,
                ticketCategory: true,
            },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found.');
        }
        if (order.status === client_1.OrderStatus.PAID) {
            return order;
        }
        const payment = order.payments.find((item) => item.provider === dto.provider);
        if (!payment) {
            throw new common_1.NotFoundException('Payment record not found for this provider.');
        }
        if (order.tickets.length > 0) {
            throw new common_1.BadRequestException('Tickets already generated for this order.');
        }
        return this.prisma.$transaction(async (tx) => {
            const category = await tx.matchTicketCategory.findUnique({
                where: { id: order.ticketCategoryId },
            });
            if (!category) {
                throw new common_1.NotFoundException('Ticket category not found for this order.');
            }
            if (category.quota !== null) {
                const remainingQuota = category.quota - category.soldCount;
                if (order.quantity > remainingQuota) {
                    throw new common_1.BadRequestException('Not enough tickets remaining for this category.');
                }
            }
            const updatedPayment = await tx.payment.update({
                where: { id: payment.id },
                data: {
                    providerReference: dto.providerReference ?? `MOCK-${dto.provider}-${Date.now()}`,
                    status: client_1.PaymentStatus.SUCCEEDED,
                    paidAt: new Date(),
                },
            });
            await tx.payment.updateMany({
                where: {
                    orderId,
                    id: {
                        not: payment.id,
                    },
                    status: client_1.PaymentStatus.PENDING,
                },
                data: {
                    status: client_1.PaymentStatus.CANCELLED,
                },
            });
            const updatedOrder = await tx.order.update({
                where: { id: orderId },
                data: {
                    status: client_1.OrderStatus.PAID,
                },
            });
            await tx.matchTicketCategory.update({
                where: { id: order.ticketCategoryId },
                data: {
                    soldCount: {
                        increment: updatedOrder.quantity,
                    },
                },
            });
            const ticketsData = Array.from({ length: updatedOrder.quantity }, (_, index) => {
                const ticketCode = `TCK-${updatedOrder.id.toUpperCase()}-${index + 1}`;
                return {
                    orderId: updatedOrder.id,
                    matchId: updatedOrder.matchId,
                    ticketCategoryId: order.ticketCategoryId,
                    ticketCode,
                    qrPayload: JSON.stringify({
                        ticketCode,
                        orderId: updatedOrder.id,
                        matchId: updatedOrder.matchId,
                        ticketCategoryId: order.ticketCategoryId,
                        ticketCategoryName: order.ticketCategory.name,
                    }),
                    holderName: updatedOrder.buyerName,
                    status: client_1.TicketStatus.GENERATED,
                };
            });
            await tx.ticket.createMany({
                data: ticketsData,
            });
            const result = await tx.order.findUnique({
                where: { id: orderId },
                include: {
                    payments: true,
                    tickets: true,
                    ticketCategory: true,
                    match: {
                        include: {
                            ticketCategories: {
                                orderBy: [{ price: 'asc' }, { name: 'asc' }],
                            },
                        },
                    },
                },
            });
            return {
                order: result,
                payment: updatedPayment,
            };
        });
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map