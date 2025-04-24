import { memo } from 'react';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '~/components/ui/sidebar';
import { CreateButton } from './create-button';

// TODO: CHECK COLLAPSIBLE OPEN STATE IF CONTENT EXISTS AND NOT IF CERTAIN INDEX

type ContentType = {
  title: string;
  url: string;
};

const MenuSection = ({
  contentTypes,
  index,
  paramsPath,
  title,
}: {
  contentTypes: ContentType[];
  index: number;
  paramsPath: string;
  title: string;
}) => {
  const collapsibleTriggerTitle =
    title === 'collection'
      ? 'Collection Types'
      : title === 'single'
        ? 'Single Types'
        : 'Components';

  const createButtonTitle =
    title === 'collection'
      ? 'Create new collection type'
      : title === 'single'
        ? 'Create new single type'
        : 'Create new component';

  return (
    <SidebarMenu>
      <Collapsible defaultOpen={index === 0} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger className="collapsible-trigger" asChild>
            <SidebarMenuButton>
              <span className="uppercase">{collapsibleTriggerTitle}</span>
              <ChevronRight className="transition-transform chevron-icon" />
              <Badge variant="secondary" className="ml-auto">
                {contentTypes.length}
              </Badge>
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent>
            {contentTypes.map((item) => (
              <SidebarMenuSub key={item.title}>
                <SidebarMenuSubItem>
                  <SidebarMenuButton asChild isActive={item.url === paramsPath}>
                    <Link to={`/admin/content-type-builder${item.url}`}>
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            ))}
          </CollapsibleContent>

          <CreateButton title={createButtonTitle} />
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  );
};

export default memo(MenuSection);
