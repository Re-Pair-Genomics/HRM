/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/* deno-fmt-ignore-file */
import 'sst';
export {};
declare module 'sst' {
    export interface Resource {
        Api: {
            type: 'sst.aws.ApiGatewayV2';
            url: string;
        };
        MyTable: {
            name: string;
            type: 'sst.aws.Dynamo';
        };
        MyWeb: {
            type: 'sst.aws.Nextjs';
            url: string;
        };
        UserTable: {
            name: string;
            type: 'sst.aws.Dynamo';
        };
    }
}
