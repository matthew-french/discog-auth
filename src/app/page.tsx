'use server'

import Image from "next/image";

import { getUserCollection } from '@/lib/actions'
import { getAuthSession } from '@/utils/serverUtils'
import { getIdentity } from '@/lib/actions'
import { redirect } from 'next/navigation'
import Link from "next/link"

import { buttonVariants } from '@/components/ui/button'

interface Folder {
  id: number;
  count: number;
  name: string;
  resource_url: string;
}

interface Collection {
  folders: Folder[];
}

export default async function Home() {
  const session = await getAuthSession()

  if (!session) {
    redirect('/login')
  }

  const folders: Folder[] = await getUserCollection(session)

  const identity = await getIdentity(session)

  console.log('identity', identity)
  console.log('session', (session))
  console.log('folders', folders)

  return (
    <>
      <div>
      {session ?
        <div>
          <Image
            src={session.user.picture || ''}
            alt={session.user.name}
            width={200}
            height={200}
          />
          <p>{session.user.name}</p>
          <p>{session.user.email}</p>
          </div>
        : <p>loading...</p>
      }
      </div>
      {folders ?
      <div>
      {
        folders.map((folder: Folder) => (
          <div key={folder.id}>
            <h2>{folder.name}</h2>
            <p>Count: {folder.count}</p>
            <Link
            href={`/collection/${folder.id}`}
            key={folder.id}
            className={buttonVariants({ variant: 'link' })}
          >
            Link to Folder {folder.id}
          </Link>
          </div>
        ))
      }
      </div>
      : <p>loading...</p>
      }

    </>
  )
}
