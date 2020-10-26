import axios from 'axios';
import { hasTextContent, noNewLines } from './utils'

export const getLinkData = async (url) => {
    const response = await axios.get(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = response.data;
    const span = document.createElement('span');
    span.innerHTML = data;
    const children = span.children;
    const text = [];
    for (let i = 0; i < children.length; i++) {
        if (hasTextContent(children[i]) && children[i].textContent) {
            text.push(children[i].textContent.replace(/(<([^>]+)>)/ig, " "));
        }
    };
    return text.join(" ").replace(/[^a-zA-Z ]/g, " ").split(" ").filter(n => noNewLines(n));
}

export const postIPTrack = async ({ url }) => {
    // const response = await axios.post(`http://my-api.com/track`, {
    //     url
    // });
    // const json = await response.json();
    // return json;
    return;
}