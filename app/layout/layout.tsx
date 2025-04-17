import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
// import { AppSidebar } from "@/components/app-sidebar"
import { OuterSidebar } from './outer-sidebar';
import { Outlet } from 'react-router';
import { InnerSidebar } from './inner-sidebar';
import { outerSidebarWidth } from '~/lib/consts-style';

export default function SidebarLayout() {
  return (
    <>
      <SidebarProvider
        className="min-h-0"
        defaultOpen={false}
        style={
          {
            '--sidebar-width-icon': outerSidebarWidth,
          } as React.CSSProperties
        }
      >
        <OuterSidebar />
      </SidebarProvider>
      <SidebarProvider defaultOpen>
        <InnerSidebar />
        <main>
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  );
}
