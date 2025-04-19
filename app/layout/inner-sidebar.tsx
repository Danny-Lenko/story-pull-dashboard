import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ChevronRight,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { outerSidebarWidth } from '~/lib/consts-style';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible';

const mockSidebarItems = {
  collection: [
    {
      title: 'Article',
      url: '/content-types/api::article.article',
    },
    {
      title: 'Author',
      url: '/content-types/api::author.author',
    },
  ],
  single: [],
};

export function InnerSidebar() {
  return (
    <>
      <Sidebar
        style={
          {
            transform: `translateX(${outerSidebarWidth})`,
            backgroundColor: 'unset !important',
          } as React.CSSProperties
        }
        className="!bg-amber-50 custom-sidebar-bg"
      >
        <SidebarContent>
          <SidebarHeader>k</SidebarHeader>
          <SidebarGroup>
            <SidebarGroupContent>
              {Object.entries(mockSidebarItems).map(([key, value], index) => (
                <SidebarMenu>
                  <Collapsible
                    defaultOpen={index === 0}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem className="recursive-pointer">
                      <CollapsibleTrigger
                        className="collapsible-trigger"
                        asChild
                      >
                        <SidebarMenuButton>
                          <span>
                            {key === 'collection'
                              ? 'Collection Types'
                              : key === 'single'
                                ? 'Single Types'
                                : 'Components'}
                          </span>
                          <ChevronRight className="ml-auto transition-transform chevron-icon" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {value.map((item) => (
                          <SidebarMenuSub>
                            <SidebarMenuSubItem>
                              <SidebarMenuButton asChild>
                                <a
                                  href={`/admin/content-type-builder${item.url}`}
                                >
                                  {item.title}
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        ))}
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                </SidebarMenu>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <style>{`
        .custom-sidebar-bg > * {
          background-color: var(--color-background);
        }

        .collapsible-trigger[data-state="open"] .chevron-icon {
          transform: rotate(90deg);
        }

        .recursive-pointer *{
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
