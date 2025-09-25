import { useSession } from "@/contexts/session";
import { type PropsWithChildren } from "react";

type ProtectedComponentProps = PropsWithChildren<{
  fallback?: React.ReactNode;
}>;

export function ProtectedComponent({
  children,
  fallback = null
}: ProtectedComponentProps) {
  const { data: session } = useSession();

  if (!session) {
    return fallback;
  }

  return <>{children}</>;
}
