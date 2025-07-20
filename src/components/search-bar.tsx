"use client";

import type { FC } from "react";
import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const PREVIOUS_SEARCHES_KEY = "githubRepoSearch_previous";
const MAX_PREVIOUS_SEARCHES = 5;

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");
  const [previousSearches, setPreviousSearches] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const storedSearches = localStorage.getItem(PREVIOUS_SEARCHES_KEY);
      if (storedSearches) {
        setPreviousSearches(JSON.parse(storedSearches));
      }
    } catch (error) {
      console.error("Could not read from localStorage", error);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent, searchTerm: string) => {
    e.preventDefault();
    const trimmedQuery = searchTerm.trim();
    onSearch(trimmedQuery);
    if (trimmedQuery) {
      updatePreviousSearches(trimmedQuery);
    }
    setIsFocused(false);
  };

  const updatePreviousSearches = (newSearch: string) => {
    try {
      const updatedSearches = [
        newSearch,
        ...previousSearches.filter((s) => s !== newSearch),
      ].slice(0, MAX_PREVIOUS_SEARCHES);
      setPreviousSearches(updatedSearches);
      localStorage.setItem(PREVIOUS_SEARCHES_KEY, JSON.stringify(updatedSearches));
    } catch (error) {
      console.error("Could not write to localStorage", error);
    }
  };

  const showSuggestions = isFocused && query === "" && previousSearches.length > 0;

  return (
    <div className="relative" ref={wrapperRef}>
      <form onSubmit={(e) => handleSearchSubmit(e, query)} className="flex items-center gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for repositories (e.g., 'shadcn/ui')"
            className="pl-10 h-12 text-base"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onFocus={() => setIsFocused(true)}
          />
        </div>
        <Button type="submit" size="lg" className="h-12 bg-accent hover:bg-accent/90 text-accent-foreground">
          Search
        </Button>
      </form>
       
      {showSuggestions && (
        <Card className="absolute z-10 w-full mt-2 shadow-lg">
          <ul className="py-2">
            <li className="px-4 py-2 text-xs font-semibold text-muted-foreground">
              Recent Searches
            </li>
            {previousSearches.map((term) => (
              <li key={term}>
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-secondary"
                  onClick={(e) => {
                    setQuery(term);
                    handleSearchSubmit(e, term);
                  }}
                >
                  {term}
                </button>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};
