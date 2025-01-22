'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/dashboard/form';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import Button from '../ui/button';
import Input from '../ui/input';

const formSchema = z.object({
  username: z
    .string()
    .min(4, {
      message: 'Username must be 4 characters long.',
    })
    .max(50, {
      message: 'Username must be at most 50 characters long.',
    }),
  email: z.string().email({
    message: 'Email must be defined!',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be 8 characters long.',
    })
    .max(50, {
      message: 'Password must be at most 50 characters long.',
    }),
});

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // sign the user in with better-auth
    await authClient.signUp.email(
      {
        name: values.username,
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          redirect('/dashboard');
        },
        onError: (ctx) => {
          setIsLoading(false);
          toast.error(
            `${ctx.error.status}: ${ctx.error.message || ctx.error.statusText}`
          );
        },
      }
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
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
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
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
