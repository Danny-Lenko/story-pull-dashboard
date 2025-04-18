import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { OuterSidebar } from './outer-sidebar';
import { Outlet } from 'react-router';
import { InnerSidebar } from './inner-sidebar';
import { outerSidebarWidth } from '~/lib/consts-style';
import { ThemeProvider } from '~/components/dedicated/layout/theme-provider';

export default function SidebarLayout() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
          <main
            style={{
              transform: `translateX(${outerSidebarWidth})`,
            }}
          >
            <Outlet />
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </>
  );
}
