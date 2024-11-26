import React from "react";
import RouterConfig from "./routes/router";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom"; // Use BrowserRouter for routing
import { PropertyProvider } from "./context/PropertyContext";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PropertyProvider>
            <RouterConfig />
          </PropertyProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
