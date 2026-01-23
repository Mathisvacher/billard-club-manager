import { ReactNode } from "react";

interface AppCardProps {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  header?: ReactNode;
}
export default function AppCard({
  title,
  action,
  header,
  children,
}: AppCardProps) {
  return (
    <div className="flex flex-col w-full h-full bg-card border border-border-light rounded-2xl p-4">
      {(title || action || header) && (
        <div className="flex items-center justify-between w-full mb-4">
          {header ?? (
            <>
              {title && (
                <h2 className="font-semibold text-2xl whitespace-nowrap">
                  {title}
                </h2>
              )}
              {action && <div>{action}</div>}
            </>
          )}
        </div>
      )}

      {children}
    </div>
  );
}
