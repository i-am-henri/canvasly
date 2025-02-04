import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/dashboard/breadcrumb';
import { Separator } from '@/components/dashboard/separator';
import { SidebarTrigger } from '@/components/dashboard/sidebar';
import { PresentationEditor } from '@/components/presentation';
import SlidesView from '@/components/presentation/slidesView';
import { verifySession } from '@/lib/dal';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const user = await verifySession();
  // fetch the presentation with the project id
  const presentation = await db.presentation.findUnique({
    where: {
      id: id,
      userId: user?.userId,
    },
  });

  if (!presentation) {
    notFound();
  }
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
                  {presentation.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-row gap-4 px-4 py-0">
        <div className="flex flex-col border-r lg:w-[200px] border-r-foreground-muted">
          <SlidesView />
        </div>
        <PresentationEditor />
      </div>
    </>
  );
}
