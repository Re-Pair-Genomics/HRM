import { UserProfile } from './userProfile';
import { Action } from './action';
import { PaymentDetails } from './paymentDetails';
import { Report } from './report';
import { Payroll } from './payroll';
import { Organization } from './organization';

export type ReportHistory = Record<number, Report>;
export type PayrollHistory = Record<number, Payroll>;

export interface User {
  id: string;
  username: string; // TODO: How about the users can directly log in with his/her id and password? We don't need username.
  // TODO: The 'status' attribute is ignored. We should keep all users' info, no matter they are active or inactive. However, only active users are allowed to log into their accounts.
  email: string;
  password: string;
  organization: Organization | null;
  profile: UserProfile | null;
  actions: Record<string, Action>;
  paymentInfo: PaymentDetails | null;
  reportHistory: ReportHistory | Promise<ReportHistory>;
  payrollHistory: PayrollHistory | Promise<ReportHistory>;
  createdDate: string;
}
