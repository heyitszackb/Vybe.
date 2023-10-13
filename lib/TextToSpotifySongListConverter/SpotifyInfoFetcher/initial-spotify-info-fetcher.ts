import { SpotifySongs, SpotifySong, VybeError } from "../types";
import { getSpotifyApi } from "../spotify-helpers";
// Promise<SpotifySongs | VybeError>
export async function initialSpotifyInfoFetcher(basicSongObjectList: any) {
    const api = await getSpotifyApi();
    if (api instanceof VybeError) {
        return api;
    }

    try {
        return await api.search("The beatles", ["track"]);
    } catch(e: any) {
        return new VybeError(e.status, e.message, '"The beatles", ["track"]');
    }
}