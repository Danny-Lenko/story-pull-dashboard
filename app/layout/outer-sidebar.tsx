import {
  Home,
  NotebookPen,
  Inbox,
  Search,
  Settings,
  Hammer,
  Images,
  LibraryBig,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { Button } from '~/components/ui/button';
import { ModeToggle } from './mode-toggle';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/admin',
    icon: Home,
  },
  {
    title: 'Content Manager',
    url: '/admin/content-manager',
    icon: NotebookPen,
  },
  {
    title: 'Media Library',
    url: '/admin/media-library',
    icon: LibraryBig,
  },
  {
    title: 'Content Type Builder',
    url: '/admin/content-type-builder',
    icon: Hammer,
  },
  {
    title: 'Settings',
    url: '/admin/settings',
    icon: Settings,
  },
  {
    title: 'Mode',
    icon: ModeToggle,
  },
];

export function OuterSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarHeader className="text-center">S</SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent className="!p-0">
            <SidebarMenu className="gap-3">
              {items.map((item) => (
                <Button
                  asChild
                  title={item.title}
                  variant="ghost"
                  key={item.title}
                >
                  <a href={item.url}>
                    <item.icon className="!w-5 !h-5" />
                  </a>
                </Button>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
