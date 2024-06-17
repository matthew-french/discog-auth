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
  folderId: string
): Promise<any> => {

  const data = await customGet(
    `https://api.discogs.com/users/${session.user.name}/collection/folders/${folderId}/releases`,
    session
  );

  const folder = data;

  return folder;
};
