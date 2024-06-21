import { customGet } from '@/utils/serverUtils'
// https://www.discogs.com/developers/#page:user-collection,header:user-collection-collection

// GET
// /users/{username}/collection/folders

// Body
// {ß
//   "folders": [
//     {
//       "id": 0,
//       "count": 23,
//       "name": "All",
//       "resource_url": "https://api.discogs.com/users/example/collection/folders/0"
//     },
//     {
//       "id": 1,
//       "count": 20,
//       "name": "Uncategorized",
//       "resource_url": "https://api.discogs.com/users/example/collection/folders/1"
//     }
//   ]
// }

import {
  AuthSession,
  Folder,
} from '@/types/types'

export const getArtist = async (session: AuthSession, artistId: string): Promise<any> => {
  const data = await customGet(
    `https://api.discogs.com/artists/${artistId}`,
    session
  );

  return data;
}

export const getIdentity = async (session: AuthSession): Promise<any> => {
  const data = await customGet(
    'https://api.discogs.com/oauth/identity',
    session
  );

  return data;
}

export async function getUserCollection(session: AuthSession): Promise<Folder[]> {
  const data = await customGet(
    `https://api.discogs.com/users/${session.user.name}/collection/folders`,
    session
  )

  return data.folders
}

export const getFolderById = async (
  session: AuthSession,
  folderId = '1' as string,
  searchParams = {
    page: '1',
    perPage: '100',
    sort: 'artist',
    sortOrder: 'asc',
  } as {
    page: string;
    perPage: string;
    sort: string;
    sortOrder: string;
  }
): Promise<any> => {

  const { page = '1', perPage = '52', sort = 'artist', sortOrder = 'asc'} = searchParams;

  console.log('searchParams', searchParams)

  const data = await customGet(
    `https://api.discogs.com/users/${session.user.name}/collection/folders/${folderId}/releases?page=${page}&per_page=${perPage}&sort=${sort}&sort_order=${sortOrder}`,
    session
  );

  return data;
};
