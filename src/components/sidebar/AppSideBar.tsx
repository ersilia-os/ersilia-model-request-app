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
import {
  HelpCircle,
  Home,
  List,
  LogOut,
  UserRoundPen,
  UsersRound,
} from "lucide-react";
import { NavMain } from "./NavMain";
import Link from "next/link";
import Image from "next/image";
import { NavAdmin } from "./NavAdmin";

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
    url: "/help",
    icon: HelpCircle,
  },
];
const admin = [
  {
    title: "User Submissions",
    url: "/admin/user-submissions",
    icon: UserRoundPen,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: UsersRound,
  },
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  isAdmin: boolean;
}

export function AppSidebar({ isAdmin, ...props }: AppSidebarProps) {
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
        {isAdmin && <NavAdmin items={admin} />}
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
