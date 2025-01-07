'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export interface OrganizationFormProps {
    onSubmit: (values: OrganizationFormValues) => void | Promise<void>;
}

export type OrganizationFormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
    name: z.string(),
    address: z.string(),
    phone: z
        .string()
        .regex(/^\+?\d{10,15}$/, 'Phone number must be valid')
        .optional()
        .or(z.literal('')),
    email: z
        .string()
        .email('Invalid email address')
        .optional()
        .or(z.literal('')),
    website: z.string().url('Invalid website URL').optional().or(z.literal(''))
});

export default function OrganizationForm(props: OrganizationFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            address: '',
            phone: '',
            email: '',
            website: ''
        }
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(props.onSubmit)}>
                {' '}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-0">
                    {/* Organization Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Organization Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter organization name"
                                        {...field}
                                        value={field.value ?? ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Address */}
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter address"
                                        {...field}
                                        value={field.value ?? ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Phone */}
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter phone number"
                                        {...field}
                                        value={field.value ?? ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter email"
                                        {...field}
                                        value={field.value ?? ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Website */}
                    <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                    <Input
                                        type="url"
                                        placeholder="Enter website URL"
                                        {...field}
                                        value={field.value ?? ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {/* Submit Button */}
                <div className="mt-6 flex justify-start">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    );
}
