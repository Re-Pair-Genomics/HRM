/// <reference path="./.sst/platform/config.d.ts" />


export default $config({
    app(input) {
        return {
            name: 'hrm',
            region: 'us-east-1',
            removal: input?.stage === 'production' ? 'retain' : 'remove',
            protect: ['production'].includes(input?.stage),
            home: 'aws',
            providers: {
                aws: {
                    region: 'us-east-1',
                    profile: input.stage === 'production' ? 'production' : 'dev'
                }
            }
        };
    },
    async run() {
        const table = new sst.aws.Dynamo('Table', {
            fields: {
                PK: 'string',
                username: "string",
                email: "string"
            },
            primaryIndex: { hashKey: 'PK' },
            globalIndexes: {
                UserEmailIndex: {
                    hashKey: 'email'
                },
                UserUsernameIndex: {
                    hashKey: 'username',
                }
            }
        });
        new sst.aws.Nextjs('MyWeb', {
            link: [table]
        });
    },
    console: {
        autodeploy: {
            target(event) {
                if (
                    event.type === 'branch' &&
                    event.branch === 'main' &&
                    event.action === 'pushed'
                ) {
                    return { stage: 'production' };
                }
            }
        }
    }
});
