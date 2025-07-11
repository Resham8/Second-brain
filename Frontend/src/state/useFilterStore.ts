import { create } from "zustand";
import type { ContentType } from "../config";

type FilterType = ContentType | "All Content";

interface FilterStore {
    activeType: FilterType;
    setActiveType: (type:FilterType) => void;
    searchItem:string;
    setSearchItem:(term:string) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
    activeType: "All Content",
    setActiveType: (type) => set({activeType: type}),
    searchItem: "",
    setSearchItem: (term) => set({ searchItem: term })
}))
