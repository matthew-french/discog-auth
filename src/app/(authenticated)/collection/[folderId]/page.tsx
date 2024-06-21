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

export async function generateMetadata({ folderId, searchParams } : any): Promise<Metadata> {
  const session = await getAuthSession();
  if (!session) {
    return {
      title: "Error in loading playlist data",
    };
  }
  return {
    title: `Discog - Releases - Folder ${folderId} - Page ${searchParams.page}`,
  };
}

export default async function FolderPage({ params, searchParams }: { params: Props; searchParams?: SearchParams }) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const { folderId } = params;

  const discogResponse = await getFolderById(session, folderId, searchParams) as DiscogResponse;

  return (
    <>
      <CollectionPage pagination={discogResponse.pagination} releases={discogResponse.releases} />
    </>
  );
}
