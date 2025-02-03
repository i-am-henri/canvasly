'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/dashboard/breadcrumb';
import { Separator } from '@/components/dashboard/separator';
import { SidebarTrigger } from '@/components/dashboard/sidebar';
import CreateForm from '@/components/forms/create-form';
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
        <CreateForm />
      </div>
    </>
  );
}
