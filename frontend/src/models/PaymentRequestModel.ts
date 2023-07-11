class PaymentRequestModel {
  amount: number;
  currency: string;

  constructor(amount: number, currency: string) {
    this.amount = amount;
    this.currency = currency;
  }
}

export default PaymentRequestModel;
