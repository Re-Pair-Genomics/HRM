'use client';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import Link from 'next/link';
import { useState } from 'react';
import { joinOrganization } from '../actions/joinOrganization';
import OrganizationInvitationForm, {
    OrganizationInvitationFormValues
} from '@/app/join-organization/OrganizationInvitationForm';

// TODO: 是否有一层逻辑检测组织是否存在，如果存在则跳转到组织页面，如果不存在则跳转到创建组织页面

export default function Page() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function onSubmit(values: OrganizationInvitationFormValues) {
        try {
            await joinOrganization(
                { organizationId: values.invitationCode },
                localStorage.getItem('JWTToken')
            );
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
        }
    }
    // ths page only has a form with a text field for the invitation code and a submit button
    return (
        <div className="flex items-center justify-center h-screen">
            <Card>
                <CardHeader>
                    <CardTitle className={'text-center'}>
                        Join Organization
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {errorMessage && (
                        <p className="text-red-500 text-sm mb-4">
                            {errorMessage}
                        </p>
                    )}
                    <OrganizationInvitationForm onSubmit={onSubmit} />
                </CardContent>
                <CardFooter>
                    <p>
                        <Link
                            href="/choose-organization"
                            className="underline text-blue-500"
                        >
                            Back
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
