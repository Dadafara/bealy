export type Stories = {
  objectID: string;
  title: string;
  url: string;
  author: string;
  created_at: string;
  story_id: string;
  story_text?: string | null;
  num_comments: number;
  points: number;
  stories: [];
};
