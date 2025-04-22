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
import { Button } from '~/components/ui/button';

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
  const pathname = window.location.pathname.split('/')[2];

  const headerContent =
    pathname === 'content-type-builder'
      ? 'Content Type Builder'
      : pathname === 'content-manager'
        ? 'Content Manager'
        : 'Settings';

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
          <SidebarHeader className="m-3 px-0 relative after:content-[''] after:absolute after:w-[25px] after:h-[1px] after:bg-sidebar-border after:-bottom-3 after:left-0">
            {headerContent}
          </SidebarHeader>
          <SidebarGroup>
            <SidebarGroupContent>
              {Object.entries(mockSidebarItems).map(([key, value], index) => (
                <SidebarMenu>
                  <Collapsible
                    defaultOpen={index === 0}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger
                        className="collapsible-trigger"
                        asChild
                      >
                        <SidebarMenuButton>
                          <span className="uppercase">
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
                      <Button
                        className="hover:no-underline cursor-pointer text-[var(--link)] hover:text-[var(--link-hover)]"
                        variant="link"
                      >
                        {key === 'collection'
                          ? 'Create new collection type'
                          : key === 'single'
                            ? 'Create new single type'
                            : 'Create new component'}
                      </Button>
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
      `}</style>
    </>
  );
}
