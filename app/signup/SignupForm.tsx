'use client';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export interface SignupFormProps {
    onSubmit: (values: SignupFormValues) => void | Promise<void>;
}

export type SignupFormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
    email: z.string().email('Invalid email address'),
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .refine(
            (password) => /[A-Z]/.test(password),
            'Password must contain at least one uppercase letter'
        )
        .refine(
            (password) => /[a-z]/.test(password),
            'Password must contain at least one lowercase letter'
        )
        .refine(
            (password) => /[0-9]/.test(password),
            'Password must contain at least one number'
        )
        .refine(
            (password) => /[!@#$%^&*]/.test(password),
            'Password must contain at least one special character (!@#$%^&*)'
        )
});

export default function SignupForm(props: SignupFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(props.onSubmit)}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="example@gmail.com"
                                    {...field}
                                    value={field.value ?? ''}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Your username"
                                    {...field}
                                    value={field.value ?? ''}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Your password"
                                    {...field}
                                    value={field.value ?? ''}
                                />
                            </FormControl>
                            <FormDescription>
                                Password must be at least 8 characters long and
                                contain at least one uppercase letter, one
                                lowercase letter, one number, and one special
                                character (!@#$%^&*).
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
