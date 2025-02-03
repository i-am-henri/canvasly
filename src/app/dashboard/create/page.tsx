'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/dashboard/breadcrumb';
import { Button } from '@/components/dashboard/button';
import { Input } from '@/components/dashboard/input';
import { Separator } from '@/components/dashboard/separator';
import { SidebarTrigger } from '@/components/dashboard/sidebar';
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';

export default function Page() {
  const [emojiPicker, setEmojiPicker] = useState(false);
  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2">
        <div className="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                  Create a new presentation
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 px-4 py-10 items-center justify-center">
        <form action="" className="flex flex-col gap-4 lg:w-[400px]">
          <h2 className="text-lg font-medium">Create a new presentation</h2>
          <div className="flex gap-2">
            {emojiPicker ? (
              <EmojiPicker
                className="border border-zinc-200 dark:border-zinc-800 rounded-lg absolute"
                onEmojiClick={(e) => console.log(e)}
              />
            ) : (
              <></>
            )}
            <Button
              onClick={() => setEmojiPicker(true)}
              variant={'outline'}
              className="w-min"
            >
              😊
            </Button>
            <Input placeholder="Enter title" />
          </div>
          <Button variant={'outline'} className="w-min">
            Create
          </Button>
        </form>
      </div>
    </>
  );
}
