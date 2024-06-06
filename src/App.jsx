import "./styles/theme.css";
import "./styles/main.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import "./i18n";
import { ThemeProvider } from "./context/ThemeContext";

import Home from "./pages/Home"
import Directories from "./pages/Directories"
import Directory from "./pages/Directory"
import Website from "./pages/Website"
import Error from "./pages/Error"

export default function App() {

  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes basename="/">
            <Route path="/" element={<Home />} />
            <Route path="/directories" element={<Directories />} />
            <Route path="/directories/:id" element={<Directory />} />
            <Route path="/directories/:id/:id" element={<Website />} />

            {/* Error page needs to be last */}
            <Route path="*" element={<Error />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}
