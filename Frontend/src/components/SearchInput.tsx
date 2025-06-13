import { Search, X } from "lucide-react";
import { useFilterStore } from "../state/useFilterStore";

function SearchInput() {
  const searchItem = useFilterStore((state) => state.searchItem);
  const setSearchItem = useFilterStore((state) => state.setSearchItem);
  return (
    <div className="relative w-full max-w-md p-2">
      <div className="relative">
        <Search
          className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 z-10"
          size={20}
        />
        <input
          type="text"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="Search content, titles, or tags..."
          className="w-full pl-12 pr-12 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-blue-500 outline-none transition-colors bg-white"
        />
        {searchItem && (
          <button
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors z-10 cursor-pointer"
            onClick={() => setSearchItem("")}
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchInput;
