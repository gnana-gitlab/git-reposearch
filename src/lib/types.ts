export interface Repository {
  id: number;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface GitHubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}
