import "./styles/theme.css";
import "./styles/main.css";
import "./styles/fontStyle.css"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./i18n";
import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";

import Home from "./pages/Home"
import Layout from "./pages/Layout";
import Directories from "./pages/Directories"
import Directory from "./pages/Directory"
import Website from "./pages/Website"
import Error from "./pages/Error"

export default function App() {

  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <Layout>
            <Routes basename="/observatorio-react">
              <Route path="/observatorio-react" element={<Home />} />
              <Route path="/observatorio-react/directories" element={<Directories />} />
              <Route path="/observatorio-react/directories/:id" element={<Directory />} />
              <Route path="/observatorio-react/directories/:id/:id" element={<Website />} />

              {/* Error page needs to be last */}
              <Route path="/observatorio-react/*" element={<Error />} />
            </Routes>
          </Layout>
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}
