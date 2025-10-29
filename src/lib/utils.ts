import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeFilename(filename: string): string {
  const lastDotIndex = filename.lastIndexOf(".");
  const extension = lastDotIndex !== -1 ? filename.slice(lastDotIndex) : "";

  const timestamp = Date.now();

  return `ersilia_${timestamp}${extension.toLowerCase()}`;
}

export const setItem = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const getItem = (key: string) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  } catch (error) {
    console.log(error);
  }
};

export const removeItem = (key: string) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};
