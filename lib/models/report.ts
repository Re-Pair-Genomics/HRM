import { ReportComment } from './reportComment';

export interface Report {
    PK: `REPORT#${string}`;
    reviewerId: string;
    status: 'Pending' | 'Approved' | 'Changes Requested';
    reportDate: Date; // the work date user enters
    reportedHours: number;
    comments: ReportComment[];

    reportId: string;
    employeeId: string;
    timestamp: Date; // the date reported is created
}
