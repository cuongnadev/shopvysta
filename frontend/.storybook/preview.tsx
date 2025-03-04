import type { Preview } from "@storybook/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../src/index.css";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export const decorators = [
    (Story) => (
        <QueryClientProvider client={new QueryClient()}>
            <Router>
                <Story/>
            </Router>
        </QueryClientProvider>
    ),
]

export default preview;