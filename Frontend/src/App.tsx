import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ShareBrain from "./pages/ShareBrain";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Auth isSignup={true} />} />
          <Route path="/signin" element={<Auth isSignup={false}/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/share/:shareLink" element={<ShareBrain />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
