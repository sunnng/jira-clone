import { UserButton } from "@/features/auth/components/user-button";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">首页</h1>
        <p className="text-muted-foreground">在此监控您的所有项目和任务</p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
};
