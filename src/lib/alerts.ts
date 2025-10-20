import { toast } from "sonner";

export const alertSuccess = (message: string) => {
  toast.success(message, {
    style: {
      "--normal-bg": "var(--color-mint)",
      "--normal-text": "var(--color-plum)",
    } as React.CSSProperties,
  });
};

export const alertError = (message: string) => {
  toast.error(message, {
    style: {
      "--normal-bg": "#DD2D4A",
      "--normal-text": "#FFFFFF",
    } as React.CSSProperties,
  });
};
