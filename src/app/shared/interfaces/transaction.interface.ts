export interface FirebaseTransaction {
  amount: number;
  categoryType: string;
  date: Date;
  description: string;
  income: boolean;
  title: string;
}

export interface Transaction extends FirebaseTransaction {
  id: string;
}
