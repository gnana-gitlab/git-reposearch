"use client";

import type { FC } from "react";
import { Github } from "lucide-react";

export const AppHeader: FC = () => {
  return (
    <header className="bg-card border-b shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Github className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              GitHub RepoSearch
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};
