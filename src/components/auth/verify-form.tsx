'use client';
import { verifyToken } from '@/action/auth/verify';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/dashboard/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import Button from '../ui/button';
import Input from '../ui/input';

const formSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: 'Code must be 6 characters long.',
    })
    .max(6, {
      message: 'Code must be 6 characters long.',
    }),
});

export default function VerifyForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // verify the user
    setIsLoading(true);

    const res = await verifyToken({
      code: values.code,
    });

    setIsLoading(false);

    if (res?.serverError) {
      toast.error(res.serverError);
      return;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center space-x-3">
          <Button
            disabled={isLoading}
            className="w-auto flex items-centese-x-3"
          >
            <span>Submit</span>
          </Button>
          {isLoading && <span>Loading...</span>}
        </div>
      </form>
    </Form>
  );
}
