import { auth0 } from "@/lib/auth0";
import prisma from "@/lib/prisma";
import { UserRole } from "@prisma-generated";
import { NextRequest, NextResponse } from "next/server";

type Handler = (req: NextRequest) => Promise<Response>;

export function withAdmin(handler: Handler) {
  return async (req: NextRequest) => {
    const session = await auth0.getSession(req);

    if (!session?.user) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    const email = session.user.email;

    const dbUser = await prisma.user.findUnique({
      where: { email },
      select: { role: true },
    });

    if (!dbUser || dbUser.role !== UserRole.ADMIN) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return handler(req);
  };
}
