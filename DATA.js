async function fetchData(urls, callback) {
    const data = [];
    for (const url of urls) {
        const response = await fetch(url);
        if (!response.ok)
            throw someError;
        data.push(await response.json());
    }
    phraseNormalizing(data); // not sure if this belongs to "DATA" or "TRANSFORM"
    phraseMetaData(data);
    callback(data);
}
function rhymeCheck(word1, word2){
    return g_data[2][word1].filter(row=>{
        return row[0]===word2;
    }).length > 0;
}
function phraseNormalizing(data){
    data[0] = data[0].map(phrase=>phrase.split(' ').map(normalizeString).join(' '))
}
function phraseMetaData(data){
    data[3] = {};
    for(const phrase of data[0]){
        const wordArr = phrase.split(' ').map(normalizeString);
        let syllables = 0;
        let foundUnknownWord = false;
        for(const word of wordArr){
            if(data[1][word]){
                syllables += data[1][word].length;
            } else {
                foundUnknownWord = true;
            }
        }
        if(!foundUnknownWord){
            data[3][phrase] = {
                syllables,
                lastWord: wordArr.slice(-1)[0]
            };
        }
    }
}