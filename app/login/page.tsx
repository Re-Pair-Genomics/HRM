'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import Link from 'next/link';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UsernameLoginForm, {
    UsernameLoginFormValues
} from './UsernameLoginForm';
import EmailLoginForm, { EmailLoginFormValues } from './EmailLoginForm';
import { login } from '../actions/login';

type LoginMethod = 'email' | 'username';

export default function Page() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    async function onSubmit(values: UsernameLoginFormValues | EmailLoginFormValues) {
        try {
            const { token, user } = await login(values);
            localStorage.setItem('rePairGenomicsToken', token);
            if (user.organizationId) {
                // TODO: redirect to the organization dashboard
            } else {
                router.push('/choose-organization');
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
        }
    }
    const [loginMethod, setLoginMethod] = useState<LoginMethod>('email');
    return (
        <div className="flex items-center justify-center h-screen">
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        <div className="flex flex-row items-center">
                            <p className="align-text-bottom mr-3">
                                Login Method:{' '}
                            </p>
                            <Select
                                onValueChange={(value) =>
                                    setLoginMethod(value as LoginMethod)
                                }
                                defaultValue={'email'}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue>
                                        {loginMethod === 'email'
                                            ? 'Email'
                                            : 'Username'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="email">Email</SelectItem>
                                    <SelectItem value="username">
                                        Username
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {errorMessage && (<p className="text-red-500 text-sm mb-4">{errorMessage}</p>)}
                    {loginMethod === 'email' ? (
                        <EmailLoginForm onSubmit={onSubmit} />
                    ) : (
                        <UsernameLoginForm onSubmit={onSubmit} />
                    )}
                </CardContent>
                
                <CardFooter>
                    <p>
                        Not registered? Sign up{' '}
                        <Link
                            href="/signup"
                            className="underline text-blue-500"
                        >
                            here
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
