export class ReportComment {

    public comment: string;

    readonly reportId: string;
    readonly creatorId: string;
    readonly timestamp: Date;

    public constructor(
        reportId: string,
        creatorId: string,
        timestamp: Date,
        comment: string
    ) {
        this.reportId = reportId;
        this.creatorId = creatorId;
        this.timestamp = timestamp;
        this.comment = comment;
    }
}