'use client';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SignupForm, { SignupFormValues } from './SignupForm';
import { signup } from '../action/signup';

export default function Page() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function onSubmit(values: SignupFormValues) {
        try {
            await signup(values);
            router.push('/login');
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
                    <CardTitle>Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    {errorMessage && (
                        <p className="text-red-500 text-sm mb-4">
                            {errorMessage}
                        </p>
                    )}
                    <SignupForm onSubmit={onSubmit} />
                </CardContent>
                <CardFooter>
                    <p>
                        Already have an account? Log in{' '}
                        <Link href="/login" className="underline text-blue-500">
                            here
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
