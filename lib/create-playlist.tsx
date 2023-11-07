import { SpotifyApi } from '@spotify/web-api-ts-sdk';

export const createPlaylist = async (sdk: SpotifyApi, uris: string[], name: string, description: string, isPublic: boolean) => {
    let user;
    try {
        user = await sdk.currentUser.profile();
    } catch (error: any) {
        console.log("LOG IN",error);
    }
    console.log(user)

    if (!user) {
        throw new Error("User not found");
    }

    let playlist;
    try { 
        playlist = await sdk.playlists.createPlaylist(user.id, {
            name,
            description,
            collaborative: false,
            public: isPublic,
        })
    } catch (error: any) {
        console.log("AFTER LOG IN",error);
    }

    if (!playlist) {
        throw new Error("Playlist not found");
    }

    try {
        await sdk.playlists.addItemsToPlaylist(playlist.id, uris);
    } catch (error: any) {
        console.log(error);
    }
};