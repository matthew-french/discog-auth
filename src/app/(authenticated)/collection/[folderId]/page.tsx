
import { getFolderById } from "@/lib/actions";
import { getAuthSession } from "@/utils/serverUtils";

import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

interface Props {
  params: {
    folderId: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const session = await getAuthSession();
  if (!session) {
    return {
      title: "Error in loading playlist data",
    };
  }
  return {
    title: `Discog - Releases`,
  };
}

export default async function FolderPage({ params }: Props) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const folderId = params.folderId;
  const data = await getFolderById(session, folderId);

  const { releases } = data;

  return (
    <>
      <div className="">
        {releases ? releases.map((item: any) => (
          <div key={item.id} className="">
            <p>ID: {item.basic_information.id}</p>
            <p>Artist: {item.basic_information.artists[0].name}</p>
            {item.basic_information.thumb ? (
              <Image
                src={item.basic_information.thumb}
                alt={item.basic_information.name}
                height={240}
                width={240}
                className="object-contain rounded-sm w-60 h-60"
                priority
              />
            ) : (
              <div className="w-full h-40">
                no image
              </div>
            )}
          </div>
        )) : (
          <div className="w-full h-40">
            no image
          </div>
        )}
      </div>
    </>
  );
}
