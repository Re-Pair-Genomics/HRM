'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { onSubmit } from './onSubmit';
import { signupController } from '@/lib/functions/signup/signupController';

const formSchema = z.object({
    userId: z.string(),
    noteId: z.string()
});

export default function MyForm({ formName }: { formName: string }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userId: 'jerrywcy',
            noteId: '123456'
        }
    });

    return (
        <>
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(async (values) => {
                    await onSubmit(formName, values.userId, values.noteId);
                })}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="userId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>UserId</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="noteId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>NoteId</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
        <Button onClick={signupController}>test sign up</Button>
        </>
    );
}
