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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const match = await this.prisma.match.findUnique({
            where: { id: dto.matchId },
            include: {
                ticketCategories: true,
            },
        });
        if (!match) {
            throw new common_1.NotFoundException('Match not found.');
        }
        if (match.status !== client_1.MatchStatus.PUBLISHED) {
            throw new common_1.BadRequestException('Tickets can only be sold for published matches.');
        }
        const category = match.ticketCategories.find((item) => item.id === dto.ticketCategoryId);
        if (!category) {
            throw new common_1.BadRequestException('Selected ticket category does not belong to this match.');
        }
        if (category.quota !== null) {
            const remainingQuota = category.quota - category.soldCount;
            if (dto.quantity > remainingQuota) {
                throw new common_1.BadRequestException('Not enough tickets remaining for this category.');
            }
        }
        const unitPrice = new client_1.Prisma.Decimal(category.price);
        const totalAmount = unitPrice.mul(dto.quantity);
        return this.prisma.order.create({
            data: {
                reference: `ORD-${Date.now()}`,
                matchId: dto.matchId,
                ticketCategoryId: category.id,
                buyerName: dto.buyerName,
                buyerPhone: dto.buyerPhone,
                buyerEmail: dto.buyerEmail,
                quantity: dto.quantity,
                unitPrice,
                totalAmount,
                status: client_1.OrderStatus.PENDING,
                payments: {
                    createMany: {
                        data: [
                            {
                                provider: client_1.PaymentProvider.WAVE_MOCK,
                                amount: totalAmount,
                                status: client_1.PaymentStatus.PENDING,
                            },
                            {
                                provider: client_1.PaymentProvider.ORANGE_MONEY_MOCK,
                                amount: totalAmount,
                                status: client_1.PaymentStatus.PENDING,
                            },
                        ],
                    },
                },
            },
            include: {
                match: {
                    include: {
                        ticketCategories: {
                            orderBy: [{ price: 'asc' }, { name: 'asc' }],
                        },
                    },
                },
                ticketCategory: true,
                payments: true,
            },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map