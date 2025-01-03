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
import UsernameLoginForm, {
    UsernameLoginFormValues
} from './UsernameLoginForm';
import EmailLoginForm, { EmailLoginFormValues } from './EmailLoginForm';

type LoginMethod = 'email' | 'username';

export default function Page() {
    function onSubmit(values: UsernameLoginFormValues | EmailLoginFormValues) {
        console.log(values);
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
