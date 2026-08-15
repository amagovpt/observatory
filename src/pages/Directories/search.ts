import type { ObservatoryResult, WebsiteSummary } from '@/features/observatory';

export interface SearchResultRow {
  directoryName: string;
  directoryId: number;
  name: string;
  id: number;
  declaration: number | null;
  stamp: number | null;
  score: number;
  nPages: number;
}

// Secondary search function that checks if the text matches
// website -> the website being checked
// text -> the text being searched
export function _search(website: WebsiteSummary, text: string): boolean {
  const parts = text.trim().toLowerCase().split(' ');
  let hasText = true;

  // Normalize URL by removing protocol, www, and trailing slashes
  const normalizeUrl = (url?: string) => {
    if (!url) return '';
    return url
      .replace(/^https?:\/\//, '') // Remove http:// or https://
      .replace(/^www\./, '') // Remove www.
      .replace(/\/$/, ''); // Remove trailing slash
  };

  const totalText = (
    website.name +
    ' ' +
    website.startingUrl +
    ' ' +
    normalizeUrl(website.startingUrl) +
    ' ' +
    (website.entity ?? '')
  )
    .trim()
    .toLowerCase()
    .normalize('NFD');

  for (const part of parts ?? []) {
    const normalizedText = part.normalize('NFD');

    if (!totalText.includes(normalizedText)) {
      hasText = false;
    }
  }

  return hasText;
}

// Main search function that goes through the data
// text -> the text being searched
// dataProcess -> the observatory dataset
export function searchFuntion(text: string, dataProcess: ObservatoryResult): SearchResultRow[] {
  if (!text || text.trim() === '' || text.trim().length <= 2) {
    return [];
  }

  const searchResults: SearchResultRow[] = [];
  dataProcess.directoriesList.forEach((directory) => {
    dataProcess.directories[directory.id]?.websitesList.forEach((website) => {
      if (_search(website, text)) {
        searchResults.push({
          directoryName: directory.name,
          directoryId: directory.id,
          name: website.name,
          id: website.id,
          declaration: website.declaration,
          stamp: website.stamp,
          score: website.score,
          nPages: website.nPages,
        });
      }
    });
  });

  return searchResults;
}
