/// <reference path="../../.sst/platform/config.d.ts" />

import { userTable } from './dynamoDB';

export const api = new sst.aws.ApiGatewayV2('Api', {
    transform: {
        route: {
            handler: {
                link: [userTable]
            }
        }
    }
});

api.route('POST /signup', 'lib/functions/signup/signup.handler');
