import { Search } from "lucide-react";
import bg from "../../assets/hero.jpg";

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="w-full h-full flex items-center justify-center flex-col ">
        <h2 className="text-6xl font-bold relative text-white">Discover estate more easily</h2>
        <h4 className="text-2xl font-light relative text-white">
          Labyrinth help people find perfect estate for better life
        </h4>
        <div className="relative inset-0 flex gap-1 w-3/6 h-12 bg-slate-50 p-2 rounded-full my-10 justify-between">
          <div className="relative">
            <select className="h-8 w-full text-sm text-gray-500 bg-transparent appearance-none mx-2 pr-8 focus:outline-none">
              <option selected>Choose a action</option>
              <option value="buy">For buy</option>
              <option value="sell">For sell</option>
              <option value="rent">For rent</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
          <div className="relative">
            <select className="h-8 w-full text-sm text-gray-500 bg-transparent appearance-none pr-8 focus:outline-none">
              <option selected>Choose a property</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="garage">Garage</option>
              <option value="office">Office</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
          <input type="text" name="location" id="location" placeholder="Search for location.." />
          <button className="bg-black text-white rounded-full h-full w-36 flex flex-row text-xl justify-center items-center gap-3">
            <Search />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
