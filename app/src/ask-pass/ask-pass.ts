import { getKeyForEndpoint } from '../lib/auth'
import { TokenStore } from '../lib/stores/token-store'

/** Parse the GIT_ASKPASS prompt and determine the appropriate response. */
export async function responseForPrompt(
  prompt: string
): Promise<string | null> {
  const username: string | undefined = process.env.DESKTOP_USERNAME
  if (username == null || !username.length) {
    return null
  }

  if (prompt.startsWith('Username')) {
    return username
  } else if (prompt.startsWith('Password')) {
    const endpoint: string | undefined = process.env.DESKTOP_ENDPOINT
    if (endpoint == null || !endpoint.length) {
      return null
    }

    const key = getKeyForEndpoint(endpoint)
    return await TokenStore.getItem(key, username)
  }

  return null
}
