import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

const NotFound = lazy(() => import("./pages/NotFound"));
const CookieConsent = lazy(() =>
  import("@/components/ui/cookie-consent").then((m) => ({ default: m.CookieConsent }))
);

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Suspense fallback={null}>
      <CookieConsent />
    </Suspense>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/servicos" element={
          <Suspense fallback={null}>
            <Servicos />
          </Suspense>
        } />
        <Route path="*" element={
          <Suspense fallback={null}>
            <NotFound />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;