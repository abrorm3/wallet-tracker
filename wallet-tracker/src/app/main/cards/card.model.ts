export class Card{
  public typeName:string;
  public amount: number;
  public currencyImagePath: string;

  constructor(name:string, amount:number, currencyImagePath:string){
    this.typeName=name;
    this.amount=amount;
    this.currencyImagePath=currencyImagePath
  }
}
