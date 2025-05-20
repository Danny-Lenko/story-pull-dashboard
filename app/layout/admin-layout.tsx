import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { OuterSidebar } from './outer-sidebar';
import { Outlet } from 'react-router';
import { InnerSidebar } from './inner-sidebar';
import { outerSidebarWidth } from '~/lib/const/consts-style';
import { ThemeProvider } from '~/components/dedicated/layout/theme-provider';

const sidebarPaths = [
  '/admin/content-manager',
  '/admin/content-type-builder',
  '/admin/settings',
];

export default function SidebarLayout() {
  const path = window.location.pathname;

  const isSidebarAllowed = sidebarPaths.some((sidebarPath) =>
    path.startsWith(sidebarPath)
  );

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
        <SidebarProvider>
          {isSidebarAllowed && <InnerSidebar />}
          <main
            className="w-full overflow-hidden"
            style={{
              // transform: `translateX(${outerSidebarWidth})`,
              marginLeft: `${outerSidebarWidth}`,
            }}
          >
            <Outlet />
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </>
  );
}
