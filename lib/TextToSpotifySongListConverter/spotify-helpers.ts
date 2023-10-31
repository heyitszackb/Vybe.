// Utils
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

// Types
import { SongsAndArtists, VybeError, VybeSong } from "@/lib/TextToSpotifySongListConverter/types";

export async function getSpotifyApi(): Promise<SpotifyApi | VybeError> {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
        return new VybeError('500', 'Spotify client id or secret not found.', 'N/A');
    }
    const api = SpotifyApi.withClientCredentials(clientId, clientSecret);
    return api;
}

// Test Data:
export const dummySongsAndArtists: SongsAndArtists = {
  songs: [
    {
      artists: ["Frank Sinatra"],
      song_name: "Fly Me to the Moon"
    },
    {
      artists: ["The Dave Brubeck Quartet"],
      song_name: "Take Five"
    },
    {
      artists: ["Nina Simone"],
      song_name: "Feeling Good"
    },
    {
      artists: ["Stan Getz", "João Gilberto" , "Astrud Gilberto"],
      song_name: "The Girl from Ipanema"
    },
    {
      artists: ["Chet Baker"],
      song_name: "My Funny Valentine"
    },
    {
      artists: ["Erroll Garner"],
      song_name: "Misty"
    },
    {
      artists: ["Nat King Cole"],
      song_name: "Autumn Leaves"
    },
    {
      artists: ["Miles Davis"],
      song_name: "Blue in Green"
    },
    {
      artists:["Ella Fitzgerald", "Louis Armstrong"],
      song_name: "Summertime"
    },
    {
      artists: ["Glenn Miller"],
      song_name: "Moonlight Serenade"
    },
    {
      artists: ["Thelonious Monk"],
      song_name: "Round Midnight"
    },
    {
      artists: ["Duke Ellington"],
      song_name: "Take the 'A' Train"
    },
    {
      artists: ["Herbie Hancock"],
      song_name: "Cantaloupe Island"
    },
    {
      artists: ["Duke Ellington", "John Coltrane"],
      song_name: "Satin Doll"
    },
    {
      artists: ["Tony Bennett"],
      song_name: "The Way You Look Tonight"
    }
  ]
}

export const dummySongs: VybeSong[] = [
      {
        name: "Breezin'",
        uri: "spotify:track:1m3BAsNsQAaSNMD2M6vlKY",
        artists: ["George Benson"],
        previewUrl: "https://p.scdn.co/mp3-preview/9fdd27aa36c177a509f99abedbb941aadaa915f0?cid=f00473afeb904a4aacb6cd9330966b0c",
        albumName: "Breezin'",
        imageUrl: "https://i.scdn.co/image/ab67616d0000b2735a5a012f4063c464eab6aec3",
        isExplicit: false,
        genres: [],
        spotifyUrl: "https://open.spotify.com/track/1m3BAsNsQAaSNMD2M6vlKY"
      },
      {
        name: "Sailing",
        uri: "spotify:track:4ogaI0XfmAunA0LyjveMSF",
        artists: ["Christopher Cross"],
        previewUrl: "https://p.scdn.co/mp3-preview/075dc3ab610d5618fcb3a318874519d566466ec2?cid=f00473afeb904a4aacb6cd9330966b0c",
        albumName: "Christopher Cross",
        imageUrl: "https://i.scdn.co/image/ab67616d0000b27362ef34ea93e13e644cd4c5e9",
        isExplicit: false,
        genres: ["Soft Rock"],
        spotifyUrl: "https://open.spotify.com/track/4ogaI0XfmAunA0LyjveMSF"
      },
      {
        name: "Beyond the Sea",
        uri: "spotify:track:3KzgdYUlqV6TOG7JCmx2Wg",
        artists: ["Bobby Darin"],
        previewUrl: "https://p.scdn.co/mp3-preview/ab71015cd8957e29f04aadf38fb40741c8e2b711?cid=f00473afeb904a4aacb6cd9330966b0c",
        albumName: "That's All",
        imageUrl: "https://i.scdn.co/image/ab67616d0000b273e774643594281699bde1e4ed",
        isExplicit: false,
        genres: ["Pop", "Jazz"],
        spotifyUrl: "https://open.spotify.com/track/3KzgdYUlqV6TOG7JCmx2Wg"
      },
      {
        name: "Mediterranean Sundance / Rio Ancho - Live at Warfield Theatre, San Francisco, CA - December 5, 1980",
        uri: "spotify:track:0og2U8tsBAR7NJysRR6uBU",
        artists: ["Al Di Meola", "John McLaughlin", "Paco de Lucía"],
        previewUrl: "https://p.scdn.co/mp3-preview/fd1143590f0a452dc047c651f5e631062c65cd1b?cid=f00473afeb904a4aacb6cd9330966b0c",
        albumName: "Friday Night in San Francisco",
        imageUrl: "https://i.scdn.co/image/ab67616d0000b27371178f8b84cffcf181a92a69",
        isExplicit: false,
        genres: ["Jazz", "Flamenco"],
        spotifyUrl: "https://open.spotify.com/track/0og2U8tsBAR7NJysRR6uBU"
      },
      {
        name: "Island In The Sun",
        uri: "spotify:track:0dRcFOOCdwbEMFLeibJhxV",
        artists: ["Harry Belafonte"],
        previewUrl: "https://p.scdn.co/mp3-preview/d9e11114e4fba32534b1a730e0e172d60f4b8b67?cid=f00473afeb904a4aacb6cd9330966b0c",
        albumName: "The Essential Harry Belafonte",
        imageUrl: "https://i.scdn.co/image/ab67616d0000b273ef78da554cb83f444d8e7b2a",
        isExplicit: false,
        genres: ["Calypso"],
        spotifyUrl: "https://open.spotify.com/track/0dRcFOOCdwbEMFLeibJhxV"
      },
      {
        name: "Moonlight Serenade",
        uri: "spotify:track:3ziJFd6JeioC8Xfct0UXpJ",
        artists: ["Glenn Miller"],
        previewUrl: "https://p.scdn.co/mp3-preview/4cdbfc9bf06abd76f9225e76dd7f8e9c3186a58e?cid=f00473afeb904a4aacb6cd9330966b0c",
        albumName: "Ultimate Big Band Collection: Glenn Miller",
        imageUrl: "https://i.scdn.co/image/ab67616d0000b2730cc5eb834d42e68068a11e93",
        isExplicit: false,
        genres: ["Big Band"],
        spotifyUrl: "https://open.spotify.com/track/3ziJFd6JeioC8Xfct0UXpJ"
      },
      {
        name: "Smooth Operator - Single Version",
        uri: "spotify:track:1Hv1VTm8zeOeybub15mA2R",
        artists: ["Sade"],
        previewUrl: "https://p.scdn.co/mp3-preview/43f389ca63d0814eb6e316b42f13011d802373ff?cid=f00473afeb904a4aacb6cd9330966b0c",
        albumName: "The Best of Sade",
        imageUrl: "https://i.scdn.co/image/ab67616d0000b2735e25e034e25258b356774c79",
        isExplicit: false,
        genres: [],
        spotifyUrl: "https://open.spotify.com/track/1Hv1VTm8zeOeybub15mA2R"
      },
    ];