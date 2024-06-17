'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { AuthSession } from '@/types/types'

import { getServerSession } from 'next-auth/next'

type Headers = {
  'Content-Type': string;
  'Authorization': string;
  'User-Agent': string;
};

const getHeaders = (session: AuthSession):Headers => {
  const oauth_nonce = Math.floor(new Date().getTime() / 1000).toString();
  const oauth_timestamp = oauth_nonce;

  return {
    'Content-Type': 'application  /json',
    'Authorization': `OAuth oauth_consumer_key="${process.env.DISCOGS_CONSUMER_KEY}", oauth_nonce="${oauth_nonce}", oauth_token="${session.user.accessToken}", oauth_signature="${process.env.DISCOG_SECRET}&${session.user.tokenSecret}", oauth_signature_method="PLAINTEXT", oauth_timestamp="${oauth_timestamp}"`,
    'User-Agent': 'spotify-discog/1.0 +http://localhost:3000'
  }
}

export const customGet = async (url: string, session: AuthSession | null) => {
  if (!session) {
    return null;
  }

  const headers = getHeaders(session)

  const res = await fetch(url, { headers }).then(res => res.json());

  return res;
};

export const getAuthSession = async () => {
  const session = (await getServerSession(authOptions)) as AuthSession

  if (!session) {
    return null
  }

  const currentTimestamp = Math.floor(Date.now())

  if (currentTimestamp >= session.user.exp * 1000) {
    return null
  }


  return session
}
