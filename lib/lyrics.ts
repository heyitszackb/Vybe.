const lyricsFinder = require('lyrics-finder');


export const getSongLyricInfo = async () => {
    let lyrics = await lyricsFinder("NF", "The search") || "Not Found!";
}