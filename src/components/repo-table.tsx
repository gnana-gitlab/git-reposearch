"use client";

import type { FC } from "react";
import { formatDistanceToNow } from "date-fns";
import { Star } from "lucide-react";
import type { Repository } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RepoTableProps {
  repos: Repository[];
  isLoading: boolean;
  perPage: number;
  hasSearched: boolean;
}

export const RepoTable: FC<RepoTableProps> = ({ repos, isLoading, perPage, hasSearched }) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-0">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60%] pl-6 font-bold text-base text-foreground">Repository</TableHead>
                <TableHead className="w-[20%] text-right font-bold text-base text-foreground">Stars</TableHead>
                <TableHead className="w-[20%] text-right pr-6 font-bold text-base text-foreground">Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: perPage }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex flex-col gap-2 w-full">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-5 w-12 ml-auto" />
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Skeleton className="h-5 w-24 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  if (!hasSearched) {
    return (
      <Card className="flex items-center justify-center py-16">
        <p className="text-muted-foreground">Please search to view the repositories</p>
      </Card>
    );
  }

  if (repos.length === 0) {
    return (
      <Card className="flex items-center justify-center py-16">
        <p className="text-muted-foreground">No repositories found.</p>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60%] pl-6 font-bold text-base text-foreground">Repository</TableHead>
              <TableHead className="w-[20%] text-right font-bold text-base text-foreground">Stars</TableHead>
              <TableHead className="w-[20%] text-right pr-6 font-bold text-base text-foreground">Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {repos.map((repo) => (
              <TableRow key={repo.id}>
                <TableCell className="pl-6 py-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={repo.owner.avatar_url} alt={`${repo.owner.login} avatar`} />
                      <AvatarFallback>{repo.owner.login.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1 overflow-hidden">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary-foreground hover:text-accent hover:underline truncate"
                      >
                        {repo.full_name}
                      </a>
                      <p className="text-sm text-muted-foreground truncate">
                        {repo.description}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary" className="flex items-center gap-1.5 justify-center w-fit ml-auto">
                    <Star className="h-3.5 w-3.5 text-yellow-500 fill-current" />
                    <span>{repo.stargazers_count.toLocaleString()}</span>
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground pr-6">
                  {formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
