import { auth } from "@/auth";

/**
 * 
 * @param type Get the user's artists or tracks
 * @param session User session
 * @param limit Number of results to return
 * @returns JSON object of top artists or tracks
 */
export async function getUserTop(type: string, limit: Number = 5) {
    const data = await querySpotify("https://api.spotify.com/v1/me/top/" + type + "?limit=" + limit);
    return data.items;
}

/**
 * 
 * @param type Get the top artists or tracks
 * @param session User session
 * @param limit Number of results to return
 * @returns JSON object of top artists or tracks
 */
export async function getSearchTop(query: string, type: string, limit: Number = 5) {
    const data = await querySpotify("https://api.spotify.com/v1/search?q=" + query.trim().replaceAll(" ", "+") + "&type=" + type + "&limit=" + limit);
    return data;
}

async function querySpotify(query: string) {
    const session = await auth();

    if (session && session.user) {
        let token = session.accessToken

        const response = await fetch(query, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return await response.json();
    }
}

interface SpotifyArtist {
    external_urls: {
        spotify: string
    },
    followers: {
        href: string | null,
        total: number
    },
    genres: string[],
    href: string,
    id: string,
    images: {
        height: number,
        url: string,
        width: number
    }[],
    name: string,
    popularity: number,
    type: string,
    uri: string
}

interface SpotifyTrack {
    album: {
        album_type: string,
        artists: SpotifyArtist[],
        available_markets: string[],
        external_urls: {
            spotify: string
        },
        href: string,
        id: string,
        images: {
            height: number,
            url: string,
            width: number
        }[],
        name: string,
        release_date: string,
        release_date_precision: string,
        total_tracks: number,
        type: string,
        uri: string
    },
    artists: SpotifyArtist[],
    available_markets: string[],
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_ids: {
        isrc: string
    },
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    is_local: boolean,
    name: string,
    popularity: number,
    preview_url: string | null,
    track_number: number,
    type: string,
    uri: string,
}

export type { SpotifyArtist };
export type { SpotifyTrack };