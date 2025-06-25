export const TAGS = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const;
export type Tag = (typeof TAGS)[number];