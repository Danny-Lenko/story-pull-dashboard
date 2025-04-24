import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { outerSidebarWidth } from '~/lib/consts-style';

import MenuSection from '~/components/dedicated/layout/inner-sidebar/menu-section';
import { useLocation, useNavigate } from 'react-router';

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
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const pathname = pathParts[2];
  const paramsPath = '/' + pathParts[3] + '/' + pathParts[4];

  console.log('LOCATION: ', paramsPath);

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
                <MenuSection
                  key={key}
                  contentTypes={value}
                  index={index}
                  paramsPath={paramsPath}
                  title={key}
                />
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
