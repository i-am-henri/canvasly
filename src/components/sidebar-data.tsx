// wrapper for the sidebar to fetch the data and pass the data to the
// client components.

import { AppSidebar } from './app-sidebar';

export default async function SidebarWithData() {
  // Fetching the shared projects

  return <AppSidebar />;
}
