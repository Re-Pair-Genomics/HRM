import { UserProfile } from './userProfile';
import { Action } from './action';
import { PaymentDetails } from './paymentDetails';
import { Report } from './report';
import { Payroll } from './payroll';
import { Organization } from './organization';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  organization: Organization | null;
  profile: UserProfile | null;
  actions: { [name: string]: Action };
  paymentInfo: PaymentDetails | null;
  reportHistory: { [timestamp: number]: Report };
  payrollHistory: { [timestamp: number]: Payroll };
}
