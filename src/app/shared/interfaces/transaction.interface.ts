export interface FirebaseTransaction {
  amount: number;
  categoryType: string;
  date: string;
  description: string;
  income: boolean;
  title: string;
}

export interface Transaction extends FirebaseTransaction {
  id: string;
}
