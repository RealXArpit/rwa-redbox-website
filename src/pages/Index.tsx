import { useState } from "react";
import { Nav, Footer } from "@/components/redbox/Layout";
import PageHome from "@/pages/PageHome";
import PageDevelopers from "@/pages/PageDevelopers";
import PageRealtors from "@/pages/PageRealtors";
import PageHow from "@/pages/PageHow";
import PageAbout from "@/pages/PageAbout";
import PageFaq from "@/pages/PageFaq";

const pages: Record<string, React.FC<{ setPage: (page: string) => void }>> = {
  home: PageHome,
  developers: PageDevelopers,
  realtors: PageRealtors,
  how: PageHow,
  about: PageAbout,
  faq: PageFaq,
};

const Index = () => {
  const [page, setPage] = useState("home");

  const goTo = (p: string) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const Page = pages[page] || PageHome;

  return (
    <div className="min-h-screen">
      <Nav page={page} setPage={goTo} />
      <Page setPage={goTo} />
      <Footer setPage={goTo} />
    </div>
  );
};

export default Index;
