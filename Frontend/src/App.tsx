import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ShareBrain from "./pages/ShareBrain";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import { useAuth } from "./state/useAuthStore";

const queryClient = new QueryClient();

function App() {
  const {isAuthenticated, checkAuth} = useAuth();

  useEffect(() => {
    checkAuth();
  },[])

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Auth isSignup={true} />} />
          <Route path="/signin" element={<Auth isSignup={false}/>} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to={"/signin"}/>} />
          <Route path="/share/:shareLink" element={<ShareBrain />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
