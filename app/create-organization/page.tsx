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
import { createOrganization } from '../actions/createOrganization';
import OrganizationForm, { OrganizationFormValues } from './OrganizationForm';

export default function Page() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function onSubmit(values: OrganizationFormValues) {
        try {
            await createOrganization(values, localStorage.getItem('JWTToken'));
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
        }
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <Card>
                <CardHeader>
                    <CardTitle>Organization Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    {errorMessage && (
                        <p className="text-red-500 text-sm mb-4">
                            {errorMessage}
                        </p>
                    )}
                    <OrganizationForm onSubmit={onSubmit} />
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
