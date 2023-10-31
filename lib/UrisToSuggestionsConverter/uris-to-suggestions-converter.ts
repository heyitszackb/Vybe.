// Types
import { VybeError, VybeSong } from "../TextToSpotifySongListConverter/types";

// Utils
import { getSpotifyApi } from "../TextToSpotifySongListConverter/spotify-helpers";

export async function urisToSuggestionsConverter(uris: string[]): Promise<VybeSong[] | VybeError> {
    const api = await getSpotifyApi();
    if (api instanceof VybeError) {
        return api;
    }

    let vybeSongs: VybeSong[] = [];

    try {
        const recommendations = await api.recommendations.get({
            seed_tracks: uris,
            limit: 23,
        });
        
        recommendations.tracks.forEach((track) => {
            if (track.preview_url) {
                vybeSongs.push(new VybeSong(
                    track.name,
                    track.uri,
                    track.artists.map(artist => artist.name),
                    track.preview_url,
                    track.album.name,
                    track.album.images[0].url,
                    track.explicit,
                    track.album.genres,
                    track.external_urls.spotify
                    ))
            }
        })
    } catch (e: any) {
        console.log(e)
        return new VybeError(e.status, e.message, uris.join(", "));
    }

    return vybeSongs;
}