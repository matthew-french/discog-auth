import { DefaultSession } from 'next-auth'

export interface DiscogsProfile extends Record<string, any> {
  id: number
  username: string
  resource_url: string
  consumer_name: string
}

interface AuthUser {
  name: string
  email: string
  picture?: string | null
  sub: string
  accessToken: string
  tokenSecret: string
  nonce: string
  iat: number
  exp: number
  jti: string
  expires: string
}

export interface AuthSession extends Omit<DefaultSession, 'user'> {
  user: AuthUser
}

export interface Folder {
  id: number;
  count: number;
  name: string;
  resource_url: string;
}

export interface Collection {
  folders: Folder[];
}
