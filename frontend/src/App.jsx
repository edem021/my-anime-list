import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import PageTransition from "./components/PageTransition.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SideMenu from "./components/SideMenu.jsx";
import SchedulePage from "./pages/SchedulePage.jsx";
import LatestEpisodesPage from "./pages/LatestEpisodesPage.jsx";
import SongListPage from "./pages/SongListPage.jsx";

function App() {
  const location = useLocation();

  return (
    <div data-theme="sunset" className="min-h-screen w-full bg-base-300">
      <Header />
      <SideMenu />
      <main className="ml-64 p-2 min-h-screen rounded-sm flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <HomePage />
                </PageTransition>
              }
            />
            <Route
              path="/login"
              element={
                <PageTransition>
                  <LoginPage />
                </PageTransition>
              }
            />
            <Route
              path="/schedule"
              element={
                <PageTransition>
                  <SchedulePage />
                </PageTransition>
              }
            />
            <Route
              path="/latest-episodes"
              element={
                <PageTransition>
                  <LatestEpisodesPage />
                </PageTransition>
              }
            />
            <Route
              path="/song-list"
              element={
                <PageTransition>
                  <SongListPage />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
        <Footer />
      </main>
    </div>
  );
}

export default App;
