"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

export function useAdmin() {
  const { user, isLoading } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetch(`/api/check-admin?email=${encodeURIComponent(user.email)}`)
        .then((res) => res.json())
        .then((data) => setIsAdmin(data.isAdmin))
        .catch(() => setIsAdmin(false));
    }
  }, [user]);

  return { user, isAdmin, isLoading };
}
