import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MemberAvatarProps {
  fallbackClassName?: string;
  name: string;
  className?: string;
}

export const MemberAvatar = ({
  fallbackClassName,
  name,
  className,
}: MemberAvatarProps) => {
  return (
    <Avatar
      className={cn(
        "size-5 transition border border-neutral-300 rounded-full",
        className,
        fallbackClassName
      )}
    >
      <AvatarFallback
        className={cn(
          "bg-neutral-300 font-medium text-neutral-500 flex items-center justify-center",
          fallbackClassName
        )}
      >
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
