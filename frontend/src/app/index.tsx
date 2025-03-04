import { useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { createRouter } from "./router";
import { AppProvider } from "./provider";

const AppRouter = () => {
  const router = useMemo(() => createRouter(), []);
  return <RouterProvider router={router} />;
};

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
