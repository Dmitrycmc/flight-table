import { buildGetRequest } from '../utils/request-utils';
import FAKE_RESPONSE from '../fake-response';

const UPDATE_INTERVAL = 4000;
const URL = 'https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=56.84,55.27,33.48,41.48';

class Table {
    constructor() {
        this.node = document.createElement('div');
        this.update();
        setInterval(() => {
            this.update();
        }, UPDATE_INTERVAL);
    }

    update = () => {
        const request = buildGetRequest(URL);
        request
            .then(res => {
                this.rerender(res);
            })
            .catch(res => {
                this.rerender(FAKE_RESPONSE);
            });
    };

    rerender = data => {
    };
}

export default Table;
