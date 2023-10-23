import { VybeSongs, VybeSong, VybeError, SongsAndArtists } from "../types";
import { getSpotifyApi } from "../spotify-helpers";
import { PartialSearchResult, Track } from "@spotify/web-api-ts-sdk";

export async function initialSpotifyInfoFetcher(listOfSongsAndArtists: SongsAndArtists): Promise<VybeSong[] | VybeError> {
    const api = await getSpotifyApi();
    if (api instanceof VybeError) {
        return api;
    }

    let vybeSongs: VybeSong[] = [];

    for (let songAndArtist of listOfSongsAndArtists.songs) {
        const query: string = `${songAndArtist.song_name} ${songAndArtist.artists[0]}`;
        let track: Track;
        try {
            let output = await api.search(query, ["track"],'US', 1);
            track = output.tracks.items[0]; // Take the first track returned, could be optimized in the future
        } catch(e: any) {
            return new VybeError(e.status, e.message, query);
        }
        if (checkOverlap(track.artists.map(artist => artist.name), songAndArtist.artists)) {
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
        } else {
            console.log("CAUGHT YOUUUUU")
        }
        
    }

    return vybeSongs;
}

function checkOverlap(arr1: string[], arr2: string[]): boolean {
    const lowercaseArr1 = arr1.map(artist => artist.toLowerCase());
    const lowercaseArr2 = arr2.map(artist => artist.toLowerCase());

    console.log("ARR1", arr1)
    console.log("ARR2", arr2)

    for (const artist of lowercaseArr1) {
        if (lowercaseArr2.includes(artist)) {
            return true;
        }
    }

    return false;
}