import axios from 'axios';
import type { Note } from '../types/note';


const BASE_URL = 'https://notehub-public.goit.study/api';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const getAuthHeaders = () => {
  if (!token) {
    throw new Error('Authorization token is missing. Please set NEXT_PUBLIC_NOTEHUB_TOKEN.');
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNotePayload {
  title: string;
  content?: string;
  tag: Note['tag'];
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
  tag,
}: Partial<FetchNotesParams> = {}): Promise<FetchNotesResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
  });

  if (search.trim()) params.append('search', search.trim());
  if (tag) params.append('tag', tag);

  const response = await axios.get<FetchNotesResponse>(
    `${BASE_URL}/notes?${params.toString()}`,
    getAuthHeaders()
  );

  return response.data;
};

export const createNote = async (
  note: NewNotePayload
): Promise<Note> => {
  const response = await axios.post<Note>(
    `${BASE_URL}/notes`,
    note,
    getAuthHeaders()
  );
  return response.data;
};

export const deleteNote = async (
  id: number
): Promise<Note> => {
  const response = await axios.delete<Note>(
    `${BASE_URL}/notes/${id}`,
    getAuthHeaders()
  );
  return response.data;
};
export const fetchNoteById = async (id: number): Promise<Note> => {
  const response = await axios.get<Note>(
    `${BASE_URL}/notes/${id}`,
    getAuthHeaders()
  );
  return response.data;
};
