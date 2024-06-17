import { OAuthConfig, OAuthUserConfig } from 'next-auth/providers/oauth'
import { DiscogsProfile } from '@/types/types'

const DiscogsProvider = <P extends DiscogsProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> => ({
  id: 'discogs',
  name: 'Discogs',
  type: 'oauth',
  version: '1.0',
  encoding: 'PLAINTEXT',
  authorization: 'https://www.discogs.com/oauth/authorize',
  accessTokenUrl: 'https://api.discogs.com/oauth/access_token',
  requestTokenUrl: 'https://api.discogs.com/oauth/request_token',
  profileUrl: 'https://api.discogs.com/oauth/identity',
  async profile(profile, tokens) {
    const url = new URL(`https://api.discogs.com/users/${profile.username}`);
    const oauth_timestamp = Math.floor(new Date().getTime() / 1000).toString();
    const oauth_nonce = Math.random().toString(36).substring(2);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `OAuth oauth_consumer_key="${options.clientId}", oauth_nonce="${oauth_nonce}", oauth_token="${tokens.oauth_token}", oauth_signature="${options.clientSecret}&", oauth_signature_method="PLAINTEXT", oauth_timestamp="${oauth_timestamp}"`,
      'User-Agent': 'spotify-discog/1.0 +http://localhost:3000',
    }

    const res = await fetch(url, { headers })

    console.log('CALL 1')

    const data = await res.json()

    return {
      id: profile.id.toString(),
      name: profile.username,
      email: data.email,
      image: data.avatar_url,
      accessToken: tokens.oauth_token,
      tokenSecret: tokens.oauth_token_secret,
      nonce: oauth_nonce,
      timestamp: oauth_timestamp
    }
  },
  style: {
    logo: 'https://www.svgrepo.com/show/330306/discogs.svg',
    logoDark: 'https://www.svgrepo.com/show/330306/discogs.svg',
    bg: '#fff',
    text: '#000000',
    bgDark: '#000000',
    textDark: '#fff'
  },
  options
})

export default DiscogsProvider
