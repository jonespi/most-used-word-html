export const hasTextContent = (node) => {
    return node.nodeName === 'P' || node.nodeName === 'DIV' || node.nodeName === 'LINK' || node.nodeName === 'TITLE';
}

export const parseTextMap = (text) => {
    const textStrings = text.filter(w => w);
    const countObj = textStrings.reduce((acc, word) => {
        if (!acc[word.toLowerCase()]) {
            acc[word.toLowerCase()] = 1;
        } else {
            acc[word.toLowerCase()]++;
        }
        return acc;
    }, {});
    const sorted = Object.entries(countObj).sort((a, b) => b[1] - a[1]);
    return sorted.slice(0, 11)
}

export const noNewLines = (word) => {
    const filterLineBreaks = word.replace(/[\r\n]{2,}/g, " ")
    return filterLineBreaks.trim().length > 1;
}