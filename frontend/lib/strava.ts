/**
 * Server-only Strava club stats.
 *
 * The public club page (strava.com/clubs/{id}) only renders member count for
 * logged-out visitors — activity totals are gated behind a "join Strava"
 * upsell. Getting real distance/run numbers requires the official API with
 * an OAuth token from an athlete who is a member of the club. See
 * frontend/README.md (or ask in the repo) for how STRAVA_CLIENT_ID,
 * STRAVA_CLIENT_SECRET and STRAVA_REFRESH_TOKEN were obtained.
 *
 * GET /clubs/{id}/activities only returns the club's most recent activities
 * (capped by Strava, no per-activity date field) — so the distance total
 * here reflects "recent activity", not a clean weekly/monthly window.
 */

const STRAVA_API = 'https://www.strava.com/api/v3'
const DEFAULT_CLUB_ID = '1778757'

type StravaClub = {
  member_count?: number
}

type StravaClubActivity = {
  distance?: number
  type?: string
  sport_type?: string
}

type TokenCache = {accessToken: string; expiresAt: number}

let tokenCache: TokenCache | null = null

async function getAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  if (tokenCache && tokenCache.expiresAt - 300 > now) {
    return tokenCache.accessToken
  }

  const clientId = process.env.STRAVA_CLIENT_ID
  const clientSecret = process.env.STRAVA_CLIENT_SECRET
  const refreshToken = process.env.STRAVA_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      'Missing Strava credentials: set STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET and STRAVA_REFRESH_TOKEN',
    )
  }

  const res = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Strava token refresh failed: ${res.status} ${await res.text()}`)
  }

  const data = await res.json()
  tokenCache = {accessToken: data.access_token, expiresAt: data.expires_at}
  return tokenCache.accessToken
}

export type ClubStats = {
  memberCount: number | null
  recentDistanceKm: number | null
}

export async function getClubStats(clubId = process.env.STRAVA_CLUB_ID || DEFAULT_CLUB_ID): Promise<ClubStats> {
  try {
    const accessToken = await getAccessToken()
    const headers = {Authorization: `Bearer ${accessToken}`}

    const [clubRes, activitiesRes] = await Promise.all([
      fetch(`${STRAVA_API}/clubs/${clubId}`, {headers, next: {revalidate: 3600}}),
      fetch(`${STRAVA_API}/clubs/${clubId}/activities?per_page=200`, {headers, next: {revalidate: 3600}}),
    ])

    if (!clubRes.ok || !activitiesRes.ok) {
      throw new Error(`Strava API error: club=${clubRes.status} activities=${activitiesRes.status}`)
    }

    const club: StravaClub = await clubRes.json()
    const activities: StravaClubActivity[] = await activitiesRes.json()

    const runs = Array.isArray(activities)
      ? activities.filter((activity) => activity.type === 'Run' || activity.sport_type === 'Run')
      : []
    const totalDistanceMeters = runs.reduce((sum, activity) => sum + (activity.distance || 0), 0)

    return {
      memberCount: typeof club.member_count === 'number' ? club.member_count : null,
      recentDistanceKm: runs.length > 0 ? Math.round(totalDistanceMeters / 1000) : null,
    }
  } catch (error) {
    console.error('Failed to fetch Strava club stats', error)
    return {memberCount: null, recentDistanceKm: null}
  }
}
