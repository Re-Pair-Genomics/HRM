'use client';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import Link from 'next/link';
import SignupForm, { SignupFormValues } from './SignupForm';

export default function Page() {
    function onSubmit(values: SignupFormValues) {
        console.log(values);
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <Card>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
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
