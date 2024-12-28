import { ReportComment } from './reportComment'

export class Report {

    public reviewerId: string;
    public status: "Pending" | "Approved" | "Changes Requested";
    public reportDate: Date; // the work date user enters
    public reportedHours: number;
    public comments: ReportComment[] = [];

    readonly reportId: string;
    readonly employeeId: string;
    readonly timestamp: Date; // the date reported is created
    

    // static factory method for creating Report object
    public static createReport({
        reportId,
        employeeId,
        reviewerId,
        status,
        timestamp = new Date(),
        reportDate,
        reportedHours,
        comments = []
    }: {
        reportId: string;
        employeeId: string;
        reviewerId: string;
        status: "Pending" | "Approved" | "Changes Requested";
        timestamp: Date;
        reportDate: Date;
        reportedHours: number;
        comments?: ReportComment[];
    }) {
        return new this(
            reportId,
            employeeId,
            reviewerId,
            status,
            timestamp,
            reportDate,
            reportedHours,
            comments
        );
    }

    constructor(
        reportId: string,
        employeeId: string,
        reviewerId: string,
        status: "Pending" | "Approved" | "Changes Requested",
        timestamp: Date,
        reportDate: Date,
        reportedHours: number,
        comments: ReportComment[]
    ) {
        this.reportId = reportId;
        this.employeeId = employeeId;
        this.reviewerId = reviewerId;
        this.status = status;
        this.timestamp = timestamp;
        this.reportDate = reportDate;
        this.reportedHours = reportedHours;
        this.comments = comments;
    }

    addComment(comment: ReportComment) {
        this.comments.push(comment);
    }
}