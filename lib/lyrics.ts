const lyricsFinder = require('lyrics-finder');


export const getSongLyricInfo = async () => {
    console.log("begin")
    let lyrics = await lyricsFinder("NF", "The search") || "Not Found!";
    console.log(lyrics);
}