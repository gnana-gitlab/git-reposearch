import type { GitHubSearchResponse } from './types';

export const searchRepositories = async (
  query: string,
  page: number = 1,
  perPage: number = 10
): Promise<GitHubSearchResponse> => {
  const GITHUB_API_URL = 'https://api.github.com/search/repositories';
  const url = `${GITHUB_API_URL}?q=${encodeURIComponent(
    query
  )}&page=${page}&per_page=${perPage}&sort=stars&order=desc`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch repositories from GitHub API');
  }

  const data: GitHubSearchResponse = await response.json();
  return data;
};
