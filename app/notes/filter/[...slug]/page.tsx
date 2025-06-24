import { fetchNotes } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Note } from "@/types/note";

export default async function NotesPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const queryClient = new QueryClient();

  const tag = params.slug?.[0];
  const query = tag === "All" || !tag ? "" : tag;

  const initialPage = 1;

  await queryClient.prefetchQuery({
    queryKey: ["notes", query, initialPage],
    queryFn: () => fetchNotes(query, initialPage),
  });

  const initialData = queryClient.getQueryData([
    "notes",
    query,
    initialPage,
  ]) as {
    notes: Note[];
    totalPages: number;
  };

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        query={query}
        page={initialPage}
        initialData={initialData}
      />
    </HydrationBoundary>
  );
}

export const dynamic = "force-dynamic";
