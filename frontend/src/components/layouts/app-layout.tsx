import { AppFooter } from "./app-footer";
import { AppHeader } from "./app-header";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
        <AppHeader />
        <main 
            className="flex bg-gray-100 flex-col items-center justify-center flex-1 
            gap-[14px] px-[8px] py-[14px] 
            sm:gap-[20px] sm:px-[14px] sm:py-[20px]"
        >
            {children}
        </main>
        <AppFooter />
    </div>
  );
};
