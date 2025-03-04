import { createBrowserRouter } from "react-router-dom";

/**
 *
 */
export const createRouter = () => {
  return createBrowserRouter([
    {
      path: "",
      lazy: async () => {
        const { AppRouterRoot } = await import("./routes/root");
        return { Component: AppRouterRoot };
      },
      children: [
        {
          path: "",
          lazy: async () => {
            const { SearchDashboardRouter } = await import("./routes/app/search-dashboard");
            return { Component: SearchDashboardRouter };
          },
        },
        {
          path: "search",
          lazy: async () => {
            const { ContentRoot } = await import("./routes/app/content-root");
            return { Component: ContentRoot };
          },
          children: [
            {
              path: "result",
              lazy: async () => {
                const { SearchResultRouter } = await import("./routes/app/search-result");
                return { Component: SearchResultRouter };
              },
            },
            {
              path: "policy",
              lazy: async () => {
                const { DataPolicyRoute } = await import("./routes/app/datapolicy");
                return { Component: DataPolicyRoute };
              },
            },
            {
              path: "privacy",
              lazy: async () => {
                const { DataPrivacyRoute } = await import("./routes/app/dataprivacy");
                return { Component: DataPrivacyRoute };
              },
            },
            {
              path: "imprint",
              lazy: async () => {
                const { ImPrintRoute } = await import("./routes/app/imprint");
                return { Component: ImPrintRoute };
              },
            }
          ]
        }
      ],
    },
    {
      path: "*",
      lazy: async () => {
        const { NotFoundRouter } = await import("./routes/not-found");
        return { Component: NotFoundRouter };
      },
    },
  ]);
};
