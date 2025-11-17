import React, { useState } from "react";
import { BannerCarousel } from "../components/BannerCarousel";
import MatchesList from "../components/MatchesList";
import { SportsSection } from "../components/SportsSection";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Matches");

  return (
    <div className="min-h-screen bg-background">
      <header className=" top-0 z-40 bg-linear-to-b from-primary via-primary to-primary/90 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* User info section */}
          <div className="pt-6 pb-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold opacity-80 uppercase tracking-wide">
                Welcome back,
              </div>
              <div className="text-2xl font-black mt-1">Bhupender Singh</div>
            </div>
            <div className="text-right bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl">
              <div className="text-xs font-semibold opacity-90 uppercase tracking-wide">
                Available Balance
              </div>
              <div className="text-3xl font-black mt-1 text-accent">
                ₹100
              </div>
            </div>
          </div>

          {/* Sports section */}
          <div className="mt-4 sm:mt-6">
            <SportsSection />
          </div>

          {/* Banner carousel */}
          <div className="mt-4 sm:mt-8 pb-2 sm:pb-6">
            <BannerCarousel />
          </div>

          <div className="mt-2 sm:mt-6 border-t border-white/20">
            <div className="flex items-center gap-2 pt-4">
              {["Matches", "Live", "Completed"].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-6 py-3 w-1/3 sm:w-32 hover:cursor-pointer font-semibold text-sm sm:text-base rounded-t-xl transition-smooth ${
                    activeTab === t
                      ? "bg-white text-primary shadow-md"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="transition-smooth">
          <MatchesList activeTab={activeTab} />
        </div>
      </main>
    </div>
  );
}
