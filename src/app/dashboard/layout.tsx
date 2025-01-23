import { CommandMenu } from '@/components/command-menu';
import { SidebarInset, SidebarProvider } from '@/components/dashboard/sidebar';
import SidebarWithData from '@/components/sidebar-data';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
export const metadata: Metadata = {
  title: 'Dashboard | Canvasly',
  description:
    'Canvasly is a free platform for creating and sharing presentations. You can export them to pptx, pdf and more, work with friends and colleagues.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SidebarProvider>
      <CommandMenu />
      <SidebarWithData />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
