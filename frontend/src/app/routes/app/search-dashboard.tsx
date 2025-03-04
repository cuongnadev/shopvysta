import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppFooter } from "src/components/layouts/app-footer";
import { Button } from "src/components/ui";
import { Link } from "src/components/ui";
import { LocalIcon } from "src/assets/local-icon";
import { Input } from "src/components/ui";

export const SearchDashboardRouter = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const search = () => {
    if (inputRef.current) {
      const query = inputRef.current?.value.trim();
      if (query) {
        navigate(`search/result?q=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <main className="flex items-center justify-center min-h-[calc(100vh-76px)] bg-[#e5e5e5] p-4">
        <div className="flex flex-col sm:flex-row items-center justify-center p-6 sm:p-[65px] sm:px-[82px] bg-white rounded-[4px] w-full max-w-[800px] gap-2">
          <Link
            to="/"
            className="flex flex-row items-center mb-4 sm:mb-0"
          >
            <LocalIcon
              iconName="logo_icon"
              width={40}
              height={40}
            />
            <span className="text-[20px] sm:text-[24px] font-bold">
              WWEBSITEE
            </span>
          </Link>
          <div className="flex flex-wrap sm:flex-nowrap gap-4 justify-center sm:justify-start w-full">
            <Input
              className="w-full sm:w-[290px] h-[47px]"
              icon={
                <LocalIcon
                  iconName="search_icon"
                  width={16}
                  height={16}
                />
              }
              placeholder="What are you looking for?"
              ref={inputRef}
            />
            <Button
              className="w-full sm:w-[100px] h-[48px] rounded-[4px] font-bold"
              onClick={search}
            >
              Find
            </Button>
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
};
