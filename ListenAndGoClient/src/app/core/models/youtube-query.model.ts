export interface YoutubeQueryResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: YoutubePageInfo;
  items: YoutubeItem[];
}

export interface YoutubePageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface YoutubeItem {
  kind: string;
  etag: string;
  id: YoutubeId;
  snippet: YoutubeSnippet;
}

export interface YoutubeId {
  kind: string;
  videoId: string;
}

// basic information about the video
export interface YoutubeSnippet {
  publishedAt: string; // date string
  channelId: string;
  title: string;
  description: string;
  thumbnails: YoutubeThumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string; // date string
}

export interface YoutubeThumbnails {
  default: YoutubeThumbnailInfo;
  medium: YoutubeThumbnailInfo;
  high: YoutubeThumbnailInfo;
}

export interface YoutubeThumbnailInfo {
  url: string;
  width: number;
  height: number;
}
