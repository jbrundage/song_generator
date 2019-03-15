function normalizeString(word){
    return word.toLowerCase().replace(/[^0-9a-z]/gi, '');
}
function generateFlatLyrics(
    data,
    requirementsArr = [{syllables: 14, rhymesWithPreviousLastWord: false}]
) {
    const lyrics = [g_first_lyric];

    console.group("called generateFlatLyrics:");
    console.log('data === ',data);
    console.log('requirementsArr === ',requirementsArr);
    console.log('first line === ',g_first_lyric);
    for(let req of requirementsArr) {
        const lastPhrase = lyrics.slice(-1);
        console.log('lastPhrase === ',lastPhrase);
        const matches = findRequirementMatches(
            Object.keys(data[3]),
            {
                limit: 10,
                validate: (phrase) => {
                    // console.log('phrase === ',phrase);
                    // console.log('data[3][phrase] === ',data[3][phrase]);
                    if(!data[3][phrase])return false;
                    // const syllableCountsMatch = req.syllables === data[3][phrase].syllables;
                    return rhymeCheck(data[3][lastPhrase].lastWord, data[3][phrase].lastWord);
                    // const desiredRhymeMatch = req.rhymesWithPreviousLastWord ? rhymesWithPrev : !rhymesWithPrev;
                    // return syllableCountsMatch && desiredRhymeMatch;
                }
            }
        );
        if(matches.length === 0){
            console.log("no matches found");
            break;
        } else {
            console.log('next line matches === ',matches);
            lyrics.push(matches[Math.floor(Math.random() * matches.length)]);
            console.log('next line === ',matches[matches.length-1]);
        }
    }
    console.groupEnd();
    return lyrics;
}

function findRequirementMatches(
    phraseArr,
    {
        limit = 10,
        validate = () => true
    },
) {
    const matches = [];
    let count = 0;
    for (const phrase of phraseArr) {
        if (validate(phrase)) {
            matches.push(phrase);
            count++;
        }
        if (count === limit) break;
    }
    return matches;
}