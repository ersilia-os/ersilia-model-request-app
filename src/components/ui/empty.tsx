"use client"

import * as React from "react"
import { cn } from "@/lib/utils" // optional, see note below

export function Empty({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 border border-dashed rounded-xl",
        className
      )}
    >
      {children}
    </div>
  )
}

export function EmptyHeader({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col items-center space-y-2", className)}>
      {children}
    </div>
  )
}

export function EmptyMedia({
  className,
  children,
  variant = "icon",
}: React.HTMLAttributes<HTMLDivElement> & { variant?: "icon" | "image" }) {
  return (
    <div
      className={cn(
        variant === "icon" && "mb-3 text-muted-foreground",
        variant === "image" && "mb-4",
        className
      )}
    >
      {children}
    </div>
  )
}

export function EmptyTitle({
  className,
  children,
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>
  )
}

export function EmptyDescription({
  className,
  children,
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  )
}

export function EmptyContent({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-4", className)}>{children}</div>
}