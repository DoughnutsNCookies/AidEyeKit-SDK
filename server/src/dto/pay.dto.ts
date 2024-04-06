export class GetPayDTO {
  label: string;
  icon: string;

  constructor(label: string, icon: string) {
    this.label = label;
    this.icon = icon;
  }
}

export class PostPayDTO {
  transaction: string;
  message: string;

  constructor(transaction: string, message: string) {
    this.transaction = transaction;
    this.message = message;
  }
}
