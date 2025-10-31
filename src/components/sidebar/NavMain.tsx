"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { PlusCircle, type LucideIcon } from "lucide-react";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Add Model"
              className="bg-plum text-primary-foreground hover:bg-plum-hover hover:text-primary-foreground active:bg-plum/90 active:text-primary-foreground min-w-8 duration-200 ease-linear font-bold"
            >
              <Link
                href="/new-model"
                className="flex space-x-2 items-center w-full"
              >
                <PlusCircle className="size-4" />
                <span>Add Model</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                className=" hover:bg-plum-hover/10  active:bg-plum/90 active:text-primary-foreground"
              >
                {item.icon && <item.icon />}
                <Link
                  href={item.url}
                  className="flex space-x-2 items-center w-full"
                >
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
