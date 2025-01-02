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
    username: string;
    email: string;
    password: string;
    organization: Organization | null;
    profile: UserProfile | null;
    actions: Record<string, Action>;
    paymentInfo: PaymentDetails | null;
    reportHistory: ReportHistory | Promise<ReportHistory>;
    payrollHistory: PayrollHistory | Promise<ReportHistory>;
}
