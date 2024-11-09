import React from "react";
import RouterConfig from "./routes/router";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Router } from "react-router-dom";
import { PropertyProvider } from "./context/PropertyContext";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
        <PropertyProvider>
            {" "}
            {/* Wrap your routes with BrowserRouter */}
            <RouterConfig />
    </PropertyProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
  );
}

export default App;
