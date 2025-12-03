export interface ArticleData {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  category: string;
  content: string[];
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
    placeAnswerSources?: {
      reviewSnippets?: {
        content: string;
      }[];
    }[];
  };
}

export interface AiUpdateResponse {
  text: string;
  groundingChunks?: GroundingChunk[];
}

export enum UpdateType {
  LATEST_NEWS = 'LATEST_NEWS',
  ALTERNATIVES = 'ALTERNATIVES',
  SENTIMENT = 'SENTIMENT',
  CHAT = 'CHAT'
}
