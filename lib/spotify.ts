import SpotifyWebApi from 'spotify-web-api-js';

export const spotifyApi = new SpotifyWebApi();

export function setAccessToken(token: any) {
  spotifyApi.setAccessToken(token);
}

