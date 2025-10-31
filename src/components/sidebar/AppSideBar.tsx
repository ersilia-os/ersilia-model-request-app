"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HelpCircle, Home, List, LogOut } from "lucide-react";
import { NavMain } from "./NavMain";
import Link from "next/link";
import Image from "next/image";

const navLink = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Submissions",
    url: "/submissions",
    icon: List,
  },
  {
    title: "Help",
    url: "https://ersilia.gitbook.io/ersilia-book/",
    icon: HelpCircle,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="bg-ersilia">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 mb-2"
            >
              <Link href="/">
                <Image
                  src="/images/ersilia_logo.png"
                  alt="Ersilia logo"
                  width={120}
                  height={120}
                  priority
                  unoptimized
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-ersilia">
        <NavMain items={navLink} />
      </SidebarContent>
      <SidebarFooter className="bg-ersilia">
        <SidebarMenuButton className="min-w-8 duration-200 ease-linear hover:bg-red-600 hover:text-primary-foreground">
          <LogOut />
          <a href="/auth/logout" className="w-full">
            Log out
          </a>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
