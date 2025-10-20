import { toast } from "sonner";

export const alertSuccess = (message: string) => {
  toast.success(message);
};

export const alertError = (message: string) => {
  toast.error(message);
};
