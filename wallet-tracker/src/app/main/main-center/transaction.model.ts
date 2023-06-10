export class Transaction{
  public title: string;
  public categoryComp: any;
  public description: string;
  public income: boolean;
  public date: Date;
  public amount: number;


  constructor(title:string, category:any, desc:string, income:boolean, date:Date, amount:number){
    this.title = title;
    this.categoryComp = category;
    this.description = desc;
    this.income = income;
    this.date = date;
    this.amount = amount;
  }
}
