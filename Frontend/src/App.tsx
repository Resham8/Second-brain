import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ShareBrain from "./pages/ShareBrain";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import { useAuth } from "./state/useAuthStore";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Toast from "./components/Toast";

const queryClient = new QueryClient();

function App() {
  const checkAuth = useAuth((state) => state.checkAuth);
  const loading = useAuth((state) => state.loading);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Auth isSignup={true} />} />
          <Route path="/signin" element={<Auth isSignup={false} />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/share/:shareLink" element={<ShareBrain />} />
        </Routes>
        <Toast/>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
