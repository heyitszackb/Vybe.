import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { VybeError } from "@/lib/TextToSpotifySongListConverter/types";

export async function getSpotifyApi(): Promise<SpotifyApi | VybeError> {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
        return new VybeError('500', 'Spotify client id or secret not found.', 'N/A');
    }
    const api = SpotifyApi.withClientCredentials(clientId, clientSecret);
    return api;
}