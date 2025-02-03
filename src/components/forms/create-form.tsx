'use client';
import { createPresentation } from '@/action/platform/create-presentation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/dashboard/form';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import EmojiPicker from 'emoji-picker-react';
import {} from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../dashboard/button';
import { Input } from '../dashboard/input';

const singleEmojiRegex = /^\p{Emoji}$/u;

export const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(50),
  emoji: z.string().regex(singleEmojiRegex, 'Only a single emoji is allowed'),
});

export default function CreateForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [emoji, setEmoji] = useState('😊');
  const [emojiPicker, setEmojiPicker] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      emoji: '😊',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // handle submit of the form
    setIsLoading(true);
    const res = await createPresentation({
      emoji,
      title: values.title,
    });
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-4 flex flex-col lg:w-[400px] relative"
      >
        <h2 className="text-lg font-medium">Create a new presentation</h2>
        <div className="flex space-x-3 lg:w-[400px]">
          {emojiPicker && (
            <EmojiPicker
              className={cn(
                'absolute top-5 w-60',
                emojiPicker ? 'block' : 'hidden'
              )}
              onEmojiClick={(e) => {
                setEmoji(e.emoji);
                setEmojiPicker(!emojiPicker);
              }}
            />
          )}
          <FormField
            control={form.control}
            name="emoji"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Button
                    onClick={() => setEmojiPicker(true)}
                    variant={'outline'}
                    className="w-min"
                  >
                    {emoji}
                  </Button>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter a title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant={'outline'}
            type="submit"
            disabled={isLoading}
            className="w-auto flex items-centese-x-3"
          >
            Submit
          </Button>
          {isLoading && <span>Loading...</span>}
        </div>
      </form>
    </Form>
  );
}
