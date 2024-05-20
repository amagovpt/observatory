import "./styles/theme.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import "./i18n";
import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";

import Home from "./pages/Home"
import Directory from "./pages/Directory"
import Error from "./pages/Error"

export default function App() {
  const [allData, setAllData] = useState([]);
  const [setEle] = useState([]);
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes basename="/directory">
            <Route path="/directory" element={<Home />} />
            <Route path="/directory/:id" element={<Directory />} />

            {/* Error page needs to be last */}
            <Route path="*" element={<Error />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}
