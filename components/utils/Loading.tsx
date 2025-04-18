import { ReactNode } from "react";

export default function Loading({
  children,
  isLoading,
}: {
  children: ReactNode;
  isLoading?: boolean;
}) {
  if (!isLoading) return <>{children}</>;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <span className="loading loading-spinner text-primary loading-lg">
        {children}
      </span>
    </div>
  );
}
