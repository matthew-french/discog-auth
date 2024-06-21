import { customGet } from '@/utils/serverUtils'

import {
  AuthSession,
  Folder,
} from '@/types/types'

interface SearchParams {
  page: string;
  perPage: string;
  sort: string;
  sortOrder: string;
}

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
  params: Partial<SearchParams>
): Promise<any> => {
  const defaultParams: SearchParams = { page: '1', perPage: '12', sort: 'artist', sortOrder: 'asc' };
  const searchParams: SearchParams = { ...defaultParams, ...params };
  const { page, perPage, sort, sortOrder } = searchParams;


  console.log('searchParams', searchParams)

  const data = await customGet(
    `https://api.discogs.com/users/${session.user.name}/collection/folders/${folderId}/releases?page=${page}&per_page=${perPage}&sort=${sort}&sort_order=${sortOrder}`,
    session
  );

  return data;
};
