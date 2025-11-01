"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import {
  HelpCircle,
  Home,
  List,
  LogOut,
  PlusCircle,
  UserRoundPen,
  UsersRound,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavAdmin } from "./NavAdmin";
import { NavMain } from "./NavMain";

const navLink = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Add Model",
    url: "/new-model",
    icon: PlusCircle,
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
              className="mb-2 data-[slot=sidebar-menu-button]:!p-1.5">
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
        <SidebarMenuButton className="hover:bg-plum/10 active:bg-plum/10 min-w-8 duration-200 ease-linear">
          <LogOut />
          <a href="/auth/logout" className="w-full">
            Log out
          </a>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
