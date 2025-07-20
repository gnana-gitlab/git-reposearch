import type { Repository, GitHubSearchResponse } from './types';

const MOCK_REPOS: Repository[] = [
  {
    id: 1,
    full_name: 'facebook/react',
    description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
    stargazers_count: 215000,
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    html_url: 'https://github.com/facebook/react',
  },
  {
    id: 2,
    full_name: 'vuejs/vue',
    description: '🖖 Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.',
    stargazers_count: 205000,
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    html_url: 'https://github.com/vuejs/vue',
  },
  {
    id: 3,
    full_name: 'angular/angular',
    description: 'The modern web developer’s platform.',
    stargazers_count: 90000,
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    html_url: 'https://github.com/angular/angular',
  },
  {
    id: 4,
    full_name: 'sveltejs/svelte',
    description: 'Cybernetically enhanced web apps.',
    stargazers_count: 73000,
    updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    html_url: 'https://github.com/sveltejs/svelte',
  },
  {
    id: 5,
    full_name: 'shadcn/ui',
    description: 'Beautifully designed components built with Radix UI and Tailwind CSS.',
    stargazers_count: 55000,
    updated_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    html_url: 'https://github.com/shadcn/ui',
  },
  {
    id: 6,
    full_name: 'vercel/next.js',
    description: 'The React Framework',
    stargazers_count: 115000,
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    html_url: 'https://github.com/vercel/next.js',
  },
  {
    id: 7,
    full_name: 'tailwindlabs/tailwindcss',
    description: 'A utility-first CSS framework for rapid UI development.',
    stargazers_count: 75000,
    updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    html_url: 'https://github.com/tailwindlabs/tailwindcss',
  },
  {
    id: 8,
    full_name: 'microsoft/TypeScript',
    description: 'TypeScript is a superset of JavaScript that compiles to clean JavaScript output.',
    stargazers_count: 95000,
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    html_url: 'https://github.com/microsoft/TypeScript',
  },
  {
    id: 9,
    full_name: 'tensorflow/tensorflow',
    description: 'An Open Source Machine Learning Framework for Everyone',
    stargazers_count: 178000,
    updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    html_url: 'https://github.com/tensorflow/tensorflow',
  },
  {
    id: 10,
    full_name: 'twbs/bootstrap',
    description: 'The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web.',
    stargazers_count: 166000,
    updated_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    html_url: 'https://github.com/twbs/bootstrap',
  },
  {
    id: 11,
    full_name: 'd3/d3',
    description: 'Bring data to life with SVG, Canvas and HTML. 📊📈🎉',
    stargazers_count: 106000,
    updated_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    html_url: 'https://github.com/d3/d3',
  },
  {
    id: 12,
    full_name: 'airbnb/javascript',
    description: 'JavaScript Style Guide',
    stargazers_count: 138000,
    updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    html_url: 'https://github.com/airbnb/javascript',
  },
  {
    id: 13,
    full_name: 'kamranahmedse/developer-roadmap',
    description: 'Interactive roadmaps, guides and other educational content to help developers grow in their careers.',
    stargazers_count: 260000,
    updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    html_url: 'https://github.com/kamranahmedse/developer-roadmap',
  },
  {
    id: 14,
    full_name: 'rust-lang/rust',
    description: 'Empowering everyone to build reliable and efficient software.',
    stargazers_count: 88000,
    updated_at: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    html_url: 'https://github.com/rust-lang/rust',
  },
  {
    id: 15,
    full_name: 'denoland/deno',
    description: 'A modern runtime for JavaScript and TypeScript.',
    stargazers_count: 91000,
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    html_url: 'https://github.com/denoland/deno',
  },
];


export const searchRepositories = (
  query: string,
  page: number = 1,
  perPage: number = 10
): Promise<GitHubSearchResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredRepos = MOCK_REPOS.filter(
        (repo) =>
          repo.full_name.toLowerCase().includes(query.toLowerCase()) ||
          repo.description?.toLowerCase().includes(query.toLowerCase())
      );

      const start = (page - 1) * perPage;
      const end = start + perPage;
      const paginatedItems = filteredRepos.slice(start, end);

      resolve({
        total_count: filteredRepos.length,
        incomplete_results: false,
        items: paginatedItems,
      });
    }, 500 + Math.random() * 500); // Simulate network delay
  });
};
