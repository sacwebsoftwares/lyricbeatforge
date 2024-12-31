import React from 'react';
import { Home, Search, Library, Plus } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const mainMenuItems = [
  { title: 'Home', icon: Home, url: '/' },
  { title: 'Search', icon: Search, url: '#' },
  { title: 'Your Library', icon: Library, url: '#' },
];

const playlistItems = [
  { title: 'Create Playlist', icon: Plus, url: '#' },
];

export function AppSidebar() {
  return (
    <Sidebar className="w-64 bg-[#000000] border-r border-[#282828]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-4 px-4 py-3 text-[#B3B3B3] hover:text-white transition-colors">
                      <item.icon className="w-6 h-6" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="px-4 py-2 text-sm font-bold text-[#B3B3B3]">
            PLAYLISTS
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {playlistItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-4 px-4 py-3 text-[#B3B3B3] hover:text-white transition-colors">
                      <item.icon className="w-6 h-6" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}