import { Search, X } from "lucide-react";
import { useFilterStore } from "../state/useFilterStore";

function SearchInput() {
  const searchItem = useFilterStore((state) => state.searchItem);
  const setSearchItem = useFilterStore((state) => state.setSearchItem);
  
  return (
    <div className="w-full max-w-md p-2">
      <div className="flex items-center border border-gray-300 rounded-md bg-white focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-blue-500 transition-colors">
        <Search className="ml-6 text-gray-400" size={20} />
        <input
          type="text"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="Search content, titles, or tags..."
          className="flex-1 px-4 py-2 outline-none bg-transparent"
        />
        {searchItem && (
          <button
            className="mr-6 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
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