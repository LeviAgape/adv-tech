export interface Finance {
  processId?: string;
  value: number;
  portion: number;
}

export interface PaymentProcess {
  processId?: string;
  paidAmount: number;
  paidPortion: number;
  paidDate: string;
}
