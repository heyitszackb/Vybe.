"use client";

import React from "react";
import { useRouter } from "next/navigation";
// @ts-ignore
import SpotifyAuth from "react-spotify-auth";
import { spotifyApi, setAccessToken } from "@/lib/spotify";

const Login = () => {
    const router = useRouter();

    function onSuccess(token: any) {
        setAccessToken(token);
        router.push("/");
    }

    function onFailure(error: any) {
        console.error(error);
    }

    return (
        <div>
            <SpotifyAuth
                redirectUri="http://localhost:3000/callback"
                clientID={process.env.SPOTIFY_CLIENT_ID}
                scopes={["user-read-email", "user-library-read"]}
                onSuccess={onSuccess}
                onFailure={onFailure}
            />
        </div>
    );
};

export default Login;
