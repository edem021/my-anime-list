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
import AnimeSongsPage from "./pages/AnimeArtistsPage.jsx";
import VtubersPage from "./pages/VtubersPage.jsx";
import ArtistSongsPage from "./pages/ArtistsPage.jsx";
import VtuberSongsPage from "./pages/VtuberSongsPage.jsx";
import Particles from "./components/Particles.jsx";
import VtuberSongDetailsPage from "./pages/VtuberSongDetailsPage.jsx";
import CreateFormPage from "./pages/CreateFormPage.jsx";
import { useEffect, useState } from "react";

function App() {
  const [api, setApi] = useState({});
  const location = useLocation();

  useEffect(() => {
    const fetchApiContent = async () => {
      try {
        const res = await fetch("http://localhost:5000/api");
        if (!res.ok) throw new Error("Failed to fetch api content");
        const data = await res.json();
        setApi(data);
      } catch (error) {
        console.error("Error fetching api content", error);
      }
    };
    fetchApiContent();
  }, []);

  return (
    <div
      data-theme="sunset"
      className="min-h-screen w-full bg-base-300 relative"
    >
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={1500}
          particleSpread={20}
          speed={0.2}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={true}
        />
      </div>
      <Header />
      <SideMenu />
      <main className="ml-64 p-2 min-h-screen rounded-sm flex flex-col justify-between relative">
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
              path="/create"
              element={
                <PageTransition>
                  <CreateFormPage />
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
              path="/anime"
              element={
                <PageTransition>
                  <AnimeSongsPage />
                </PageTransition>
              }
            />
            <Route
              path="/vtuber"
              element={
                <PageTransition>
                  <VtubersPage />
                </PageTransition>
              }
            />
            <Route
              path="/artist"
              element={
                <PageTransition>
                  <ArtistSongsPage />
                </PageTransition>
              }
            />
            <Route
              path="/vtuber/:id"
              element={
                <PageTransition>
                  <VtuberSongsPage vtubers={api.vtubers} />
                </PageTransition>
              }
            />
            <Route
              path="/vtuber/:id/song/:songId"
              element={
                <PageTransition>
                  <VtuberSongDetailsPage vtubers={api.vtubers} />
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
