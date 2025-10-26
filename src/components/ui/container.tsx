export default function Container({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto px-6 sm:px-20 w-full max-w-5xl">{children}</main>;
}
