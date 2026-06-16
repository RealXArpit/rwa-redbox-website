import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/redbox/AppLayout";
import PageHome from "./pages/PageHome";
import PageDevelopers from "./pages/PageDevelopers";
import PageRealtors from "./pages/PageRealtors";
import PageHow from "./pages/PageHow";
import PageAbout from "./pages/PageAbout";
import PageFaq from "./pages/PageFaq";
import PageCrep from "./pages/PageCrep";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<PageHome />} />
            <Route path="/developers" element={<PageDevelopers />} />
            <Route path="/realtors" element={<PageRealtors />} />
            <Route path="/how" element={<PageHow />} />
            <Route path="/about" element={<PageAbout />} />
            <Route path="/ecosystem-partner" element={<PageCrep />} />
            <Route path="/faq" element={<PageFaq />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
