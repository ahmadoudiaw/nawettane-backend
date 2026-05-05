import { PaymentProvider } from '@prisma/client';
export declare class MockConfirmPaymentDto {
    provider: PaymentProvider;
    providerReference?: string;
}
