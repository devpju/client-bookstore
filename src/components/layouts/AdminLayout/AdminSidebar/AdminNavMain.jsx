import { Collapsible } from '@/components/shadcnUI/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/shadcnUI/sidebar';
import { Link, useLocation } from 'react-router';

export default function AdminNavMain({ items }) {
  const location = useLocation();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.url}
            asChild
            defaultOpen={item.isActive}
            className='group/collapsible'
          >
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={item.title}
                className={`py-6 text-primary transition-colors ${location.pathname.includes(item.url) ? 'bg-green-200 hover:bg-green-200' : 'hover:bg-sky-200/70'}`}
              >
                {item.icon && <item.icon />}
                <Link to={item.url} className='w-full py-4'>
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
