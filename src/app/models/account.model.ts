export interface Account {
  accountId: number;
  accountNumber: string;
  accountType: string;
  initialBalance: number;
  status: string;
  customer?: any;
  transactions?: any;
}
