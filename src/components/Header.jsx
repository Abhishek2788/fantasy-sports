import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md transition-smooth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-primary to-accent rounded-lg blur opacity-75 group-hover:opacity-100 transition-smooth"></div>
              <div className="relative px-4 py-2 bg-white rounded-lg">
                <span className="text-2xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                  Fantasy
                </span>
              </div>
            </div>
            <span className="hidden sm:inline text-sm font-semibold text-muted-foreground">
              Sports
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-1">
            <Link
              to="/matches"
              className="px-4 py-2 text-sm font-medium bg-accent text-background hover:bg-destructive-foreground rounded-lg transition-smooth"
            >
              Matches
            </Link>
            <Link
              to="/contests"
              className="px-4 py-2 text-sm font-medium bg-accent text-background hover:bg-destructive-foreground rounded-lg transition-smooth"
            >
              Contests
            </Link>
            <Link
              to="/leaderboard"
              className="px-4 py-2 text-sm font-medium bg-accent text-background hover:bg-destructive rounded-lg transition-smooth"
            >
              Leaderboard
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm font-semibold text-white bg-linear-to-r from-primary to-accent rounded-lg hover:shadow-glow transition-smooth">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
