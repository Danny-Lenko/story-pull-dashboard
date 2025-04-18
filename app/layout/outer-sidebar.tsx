import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';

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
    url: '#',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
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
