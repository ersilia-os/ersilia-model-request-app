"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavAdmin({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Admin</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              tooltip={item.title}
              className={
                isActive(item.url)
                  ? "bg-plum text-primary-foreground hover:bg-plum active:bg-plum/90 hover:text-primary-foreground active:text-primary-foreground"
                  : "hover:bg-plum-hover/10 active:bg-plum-hover/5"
              }>
              {item.icon && <item.icon />}
              <Link
                href={item.url}
                className="flex w-full items-center space-x-2">
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
