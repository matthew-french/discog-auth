import { getFolderById } from "@/lib/actions";
import { getAuthSession } from "@/utils/serverUtils";

import { Metadata } from "next";

import { redirect } from "next/navigation";

import CollectionPage  from "@/components/collection-page"

import DiscogResponse from "@/types/DiscogResponse";

interface Props {
  folderId: string;
}

interface SearchParams {
  page: string;
  perPage: string;
  sort: string;
  sortOrder: string;
}

export async function generateMetadata({ params, searchParams }: { params: Props; searchParams?: SearchParams }): Promise<Metadata> {
  const session = await getAuthSession();

  if (!session) {
    return {
      title: "Error in loading playlist data",
    };
  }

  const { folderId } = params;

  return {
    title: `Discog - Releases - Folder ${folderId} - Page ${searchParams?.page || 1}`,
  };
}

export default async function FolderPage({ params, searchParams }: { params: Props; searchParams?: SearchParams }) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const { folderId } = params;

  const defaultParams: SearchParams = { ...{ page: '1', perPage: '24', sort: 'artist', sortOrder: 'asc' }, ...searchParams };

  const discogResponse = await getFolderById(session, folderId, defaultParams)

  return (
    <>
      <CollectionPage pagination={discogResponse.pagination} releases={discogResponse.releases} />
    </>
  );
}
