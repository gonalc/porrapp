import { useSession } from "@/contexts/session";

export function ProtectedComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return <>{children}</>;
}
