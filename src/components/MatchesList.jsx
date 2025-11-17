import UpcomingMatches from "../pages/UpcomingMatches";

const matches = [
  {
    id: 1,
    title: "CSK vs KKR",
    sub: "10th IPL Match",
    style: "bg-card-grad-4",
  },
  {
    id: 2,
    title: "SRH vs RCB",
    sub: "11th IPL Match",
    style: "bg-card-grad-4",
  },
  {
    id: 3,
    title: "RCB vs CSK",
    sub: "12th IPL Match",
    style: "bg-card-grad-4",
  },
];

const completedMatches = [
  {
    id: 1,
    title: "India vs Australia",
    sport: "Cricket",
    time: "Today 3:00 PM",
    type: "T20",
    prize: "₹50,000",
    entries: 245,
  },
  {
    id: 2,
    title: "Manchester United vs Liverpool",
    sport: "Football",
    time: "Today 5:30 PM",
    type: "Premier League",
    prize: "₹75,000",
    entries: 412,
  },
  {
    id: 3,
    title: "Lakers vs Celtics",
    sport: "Basketball",
    time: "Today 8:00 PM",
    type: "NBA",
    prize: "₹100,000",
    entries: 567,
  },
];

function MatchCard({ m }) {
  return (
    <div className={`rounded-2xl shadow p-6 mb-4 ${m.style}`}>
      <div className="text-xs text-pink-600 text-center">{m.sub}</div>
      <div className="text-center font-extrabold text-2xl mt-2 text-pink-700">{m.title}</div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center font-bold">
            CS
          </div>
          <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center font-bold">
            KK
          </div>
        </div>
        <div className="text-sm text-pink-600">07:30 PM</div>
      </div>
    </div>
  );
}

export default function MatchesList({ activeTab }) {
  return (
    <>
      {activeTab === "Matches" ? (
        <section>
          <UpcomingMatches />
        </section>
      ) : activeTab === "Live" ? (
        <section>
          <div className="mt-3 flex gap-3 mb-3">
            <button className="w-24 px-4 py-2 rounded-sm bg-pink-500 text-white hover:cursor-pointer">
              All
            </button>
            <button className="w-24 px-4 py-2 rounded-sm bg-white text-black border border-gray-300 hover:cursor-pointer">
              Joined
            </button>
          </div>
          {matches.map((m) => (
            <MatchCard key={m.id} m={m} />
          ))}
        </section>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
          {completedMatches.map((match) => (
            <div
              key={match.id}
              className="bg-card rounded-xl p-6 shadow-md hover:shadow-glow transition-smooth border border-border group cursor-pointer hover:border-primary/50"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    {match.sport}
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-smooth">
                    {match.title}
                  </h3>
                </div>
                <span className="ml-4 px-3 py-1 bg-accent/10 text-accent font-semibold text-xs rounded-lg">
                  {match.type}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {match.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {match.entries} entries
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground font-semibold mb-1">
                    Prize Pool
                  </div>
                  <div className="text-2xl font-black text-accent">
                    {match.prize}
                  </div>
                </div>
                <button className="px-6 py-2 bg-linear-to-r from-primary hover:cursor-pointer to-accent text-white font-semibold rounded-lg hover:shadow-glow transition-smooth hover:scale-105 active:scale-95">
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
