import { buildGetRequest } from '../utils/request-utils';

const UPDATE_INTERVAL = 1000;
const URL = 'https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=56.84,55.27,33.48,41.48';

const Table = document.createElement('div');
Table.innerText = 'd';
setInterval(() => {
    const data = buildGetRequest(URL);
    data.then(res => {
        console.log(res);
    }).catch(() => {
        console.log("Couldn't get data");
    });
}, UPDATE_INTERVAL);

export default Table;
