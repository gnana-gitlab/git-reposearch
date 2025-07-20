"use client";

import type { FC } from "react";
import { useState, useEffect, useCallback } from "react";
import { AppHeader } from "@/components/app-header";
import { SearchBar } from "@/components/search-bar";
import { RepoTable } from "@/components/repo-table";
import { PaginationControl } from "@/components/pagination-control";
import type { Repository } from "@/lib/types";
import { searchRepositories } from "@/lib/github-api";

const REPOS_PER_PAGE = 10;

const Home: FC = () => {
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState(false);

  const totalPages = Math.ceil(totalCount / REPOS_PER_PAGE);

  const fetchRepos = useCallback(async (currentQuery: string, page: number) => {
    if (currentQuery.trim() === "") {
      setRepositories([]);
      setTotalCount(0);
      setIsLoading(false);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    try {
      const { items, total_count } = await searchRepositories(
        currentQuery,
        page,
        REPOS_PER_PAGE
      );
      setRepositories(items);
      setTotalCount(total_count);
    } catch (error) {
      console.error("Failed to fetch repositories:", error);
      setRepositories([]);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = (newQuery: string) => {
    const trimmedQuery = newQuery.trim();
    setQuery(trimmedQuery);
    setCurrentPage(1);
    fetchRepos(trimmedQuery, 1);
  };
  
  useEffect(() => {
    if (query.trim() && currentPage > 1) {
      fetchRepos(query, currentPage);
    }
  }, [currentPage, query, fetchRepos]);

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <section className="mb-8" aria-labelledby="search-heading">
            <h1 id="search-heading" className="sr-only">
              Search GitHub Repositories
            </h1>
            <SearchBar onSearch={handleSearch} />
          </section>
          
          <section aria-live="polite" aria-busy={isLoading}>
            <RepoTable
              repos={repositories}
              isLoading={isLoading}
              perPage={REPOS_PER_PAGE}
              hasSearched={hasSearched}
            />
          </section>
          
          {totalCount > 0 && !isLoading && (
            <section className="mt-8" aria-label="Pagination">
              <PaginationControl
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalResults={totalCount}
                perPage={REPOS_PER_PAGE}
              />
            </section>
          )}
        </div>
      </main>
      <footer className="text-center py-4 text-sm text-muted-foreground">
        <p>Built using the GitHub Repository search API</p>
      </footer>
    </div>
  );
};

export default Home;
