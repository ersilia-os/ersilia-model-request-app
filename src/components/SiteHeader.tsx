"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

function getPageTitle(pathname: string): string {
  const exactTitles: Record<string, string> = {
    "/": "Dashboard",
    "/new-model": "Add new model",
    "/submissions": "Submissions",
  };

  if (exactTitles[pathname]) {
    return exactTitles[pathname];
  }

  if (pathname.startsWith("/submissions/")) {
    return "Submission Details";
  }

  if (pathname.startsWith("/new-model/")) {
    return "Model Details";
  }

  return "ersilia";
}
export function SiteHeader() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium text-plum">{title}</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            asChild
            size="sm"
            className="hidden sm:flex hover:bg-plum/10"
          >
            <a
              href="https://github.com/ersilia-os/ersilia/issues"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
