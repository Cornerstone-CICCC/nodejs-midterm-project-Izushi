export interface NotionPost {
  id: string;
  title: string;
  publishdate: string;
  editdate?: string;
  tags: string[];
  thumbnail?: string;
  like?: number
};