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
                    profile:
                        input.stage === 'production'
                            ? 'jerrywcy-production'
                            : 'jerrywcy-dev'
                }
            }
        };
    },
    async run() {
        const table = new sst.aws.Dynamo('MyTable', {
            fields: {
                userId: 'string',
                noteId: 'string'
            },
            primaryIndex: { hashKey: 'userId', rangeKey: 'noteId' }
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
