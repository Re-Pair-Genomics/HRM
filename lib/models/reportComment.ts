export class ReportComment {

    public comment: string;

    readonly reportId: string;
    readonly creatorId: string;
    readonly timestamp: Date;

    // static factory method for creating ReportComment object
    static createReportComment({
        reportId,
        creatorId,
        timestamp = new Date(),
        comment
    }: {
        reportId: string;
        creatorId: string;
        timestamp: Date;
        comment: string;
    }) {
        return new this(
            reportId,
            creatorId,
            timestamp,
            comment
        );
    }

    constructor(
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