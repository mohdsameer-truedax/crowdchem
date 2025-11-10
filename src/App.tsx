import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import UseCases from "./pages/UseCases";
import Contact from "./pages/Contact/Index";
import NotFound from "./pages/ErrorPage/NotFound";
import ServerError from "./pages/ErrorPage/ServerError";
import Offline from "./pages/ErrorPage/Offline";
import NewsPost from "./pages/News/NewsPost";
import CertRedirect from "./pages/CertRedirect";
import ScrollToTop from "./utils/ScrolltoTop";
import { GAListener } from "./components/GAListener";
import { AnalyticsConsent } from "./components/AnalyticsConsent";

import ScrollToHash from "./components/ScrollToHash";
import JsonLoader from "./components/JsonLoader";
import { LangWrapper } from "./routes/LangWrapper";

const LegacyLangRedirect = () => {
  const params = useParams();
  const lang = (params.lang || "").toString().toLowerCase().slice(0, 3);
  const rest = (params["*"] || "").toString();
  const [path, hash] = rest.split('#');
  const targetPath = path ? `/${path}` : "/";
  const targetHash = hash ? `#${hash}?lang=${lang}` : `?lang=${lang}`;
  return <Navigate to={`${targetPath}${targetHash}`} replace />;
};



function App() {
  
  return (
    <Router>
        <ScrollToHash/>
        <GAListener />
        <JsonLoader/>
      {/* Consent modal */}
      <AnalyticsConsent />
      <Navbar />
      <ScrollToTop/>
      <Routes>
         <Route path="/" element={<LangWrapper Component={Home} />} />
                    <Route path="/usecases" element={<LangWrapper Component={UseCases} />} />
          <Route path="/contact" element={<LangWrapper Component={Contact} />} />
          <Route path="/:lang/*" element={<LegacyLangRedirect />} />
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/usecases" element={<UseCases />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}

        <Route path="/news/:slug" element={<LangWrapper Component={NewsPost} />} />

        {/* ✅ Certificate redirect */}
        <Route path="/crowdchem/cert/iso" element={<CertRedirect />} />

        {/* ✅ Error pages */}
        <Route path="/404" element={<NotFound />} />
        <Route path="/500" element={<ServerError />} />
        <Route path="/offline" element={<Offline />} />

        {/* ✅ Catch-all: redirect unknown routes to /404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
