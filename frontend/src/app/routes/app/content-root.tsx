import { Outlet } from "react-router-dom"
import { AppLayout } from "src/components/layouts/app-layout"

export const ContentRoot = () => {
  return(
    <AppLayout>
      <Outlet/>
    </AppLayout>
  );
};