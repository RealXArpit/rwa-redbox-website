import { useLayoutEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Nav, Footer } from "./Layout";

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const pageMap: Record<string, string> = {
    "/": "home",
    "/developers": "developers",
    "/realtors": "realtors",
    "/how": "how",
    "/about": "about",
    "/ecosystem-partner": "ecosystem-partner",
    "/faq": "faq",
  };

  const goTo = (p: string) => {
    const route = p === "home" ? "/" : `/${p}`;
    navigate(route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentPage = pageMap[location.pathname] || "home";

  return (
    <div className="min-h-screen overflow-x-clip">
      <Nav page={currentPage} setPage={goTo} />
      <Outlet />
      <Footer setPage={goTo} />
    </div>
  );
};

export default AppLayout;
