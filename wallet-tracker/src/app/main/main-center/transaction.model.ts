export class Transaction{
  public title: string;
  public categoryType: string;
  public description: string;
  public income: boolean;
  public date: string;
  public amount: number;


  constructor(title:string, category:string, desc:string, income:boolean, date:string, amount:number){
    this.title = title;
    this.categoryType = category;
    this.description = desc;
    this.income = income;
    this.date = date;
    this.amount = amount;
  }
}
