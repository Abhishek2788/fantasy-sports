import { BasketballIcon } from "./icons/BasketballIcon";
import { CricketIcon } from "./icons/CricketIcon";
import { FootballIcon } from "./icons/footballIcon";
import { HockeyIcon } from "./icons/hockeyIcon";

export const SportsSection = () => {
  const sports = [
    {
      name: "Cricket",
      icon: <CricketIcon className="w-10 h-auto fill-white!" />,
    },
    {
      name: "Football",
      icon: <FootballIcon className="w-10 h-auto fill-white!" />,
    },
    {
      name: "Basketball",
      icon: <BasketballIcon className="w-10 h-auto fill-white!" />,
    },
    {
      name: "Hockey",
      icon: <HockeyIcon className="w-10 h-auto fill-white!" />,
    },
  ];

  return (
    <nav className="overflow-x-auto whitespace-nowrap lg:p-4 lg:text-center">
      <div className=" grid grid-cols-4 gap-4 items-center px-1">
        {sports.map((sport, index) => (
          <div
            key={sport.name}
            className={`flex flex-col items-center p-2 rounded-lg cursor-pointer`}
          >
            <div
              className={`flex flex-col items-center p-4 rounded-full cursor-pointer ${
                index === 0 ? "bg-pink-600" : "text-blue-950"
              }`}
            >
              {sport.icon}
            </div>
            <span
              className={`text-sm sm:text-base mt-1 ${
                index === 0 ? "text-white font-bold" : ""
              }`}
            >
              {sport.name}
            </span>
          </div>
        ))}
      </div>
    </nav>
  );
};

