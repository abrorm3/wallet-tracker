export class Transaction {
  constructor(
    public title: string,
    public categoryType: string,
    public description: string,
    public income: boolean,
    public date: Date,
    public amount: number
  ) {
    this.title = title;
    this.categoryType = categoryType;
    this.description = description;
    this.income = income;
    this.date = date;
    this.amount = amount;
  }
}
