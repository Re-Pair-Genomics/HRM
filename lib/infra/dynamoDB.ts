/// <reference path="../../.sst/platform/config.d.ts" />

export const userTable = new sst.aws.Dynamo('UserTable', {
    fields: {
        userId: 'string',
        dataType: 'string'
    },
    primaryIndex: { hashKey: 'userId', rangeKey: 'dataType' }
});
