import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/utils/serverUtils";
import { getArtist } from "@/lib/actions";


interface Props {
  recordId: string;
}

export async function generateMetadata({ params }: { params: Props }): Promise<Metadata> {
  const session = await getAuthSession();

  if (!session) {
    return {
      title: "Error in loading playlist data",
    };
  }

  const { recordId } = params;

  return {
    title: `Discog - Releases - Folder ${recordId}}`,
  };
}

export default async function RecordPage({ params }: { params: Props }) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const { recordId } = params;

  const artistResponse = await getArtist(session, recordId);

  console.log('discogResponse', artistResponse)

  return (
    <h1>Record {recordId}</h1>
  )
}
