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

export interface OrganizationInvitationFormProps {
    onSubmit: (
        values: OrganizationInvitationFormValues
    ) => void | Promise<void>;
}

export type OrganizationInvitationFormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
    // organizationId: z.string().nonempty('Organization ID is required')
    invitationCode: z.string().nonempty('Invitation code is required')
});

export default function OrganizationInvitationForm(
    props: OrganizationInvitationFormProps
) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            // We are now using organizationId as the invitation code
            invitationCode: ''
        }
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(props.onSubmit)}>
                <div className="grid grid-cols-1 gap-6 space-y-0">
                    {/* Invitation Code */}
                    <FormField
                        control={form.control}
                        name="invitationCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Invitation Code</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter Invitation Code"
                                        {...field}
                                        value={field.value ?? ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Join Organization</Button>
                </div>
            </form>
        </Form>
    );
}
