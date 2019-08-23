import { buildGetRequest } from '../utils/request-utils';
import FAKE_RESPONSE from '../fake-response';
import Vector from '../utils/reuseble-scalable-vector';
import Row from './row';

const UPDATE_INTERVAL = 40000000000;
const URL = 'https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=56.84,55.27,33.48,41.48';

class Table {
    constructor() {
        this.node = document.createElement('div');
        this.rows = new Vector(Row);
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

    removeAllChildren = () => {
        while (this.node.hasChildNodes()) {
            this.node.removeChild(this.node.firstChild);
        }
    };

    rerender = ({ full_count, version, ...data }) => {
        const dataKeys = Object.keys(data);
        const deletedKeys = this.rows.data.map(row => row.key).filter(rowKey => dataKeys.every(key => rowKey !== key));
        const newDataKeys = dataKeys.filter(key => this.rows.data.every(row => row.key !== key));
        const updatedKeys = dataKeys.filter(key => this.rows.data.some(row => row.key !== key));

        deletedKeys.forEach(key => {
            this.rows.deleteByKey(key);
        });
        newDataKeys.forEach(key => {
            this.rows.insert(key, data[key]);
        });
        updatedKeys.forEach(key => {
            this.rows.updateByKey(key, data[key]);
        });

        this.removeAllChildren();

        this.rows.data.forEach(r => this.node.appendChild(r.node));
    };
}

export default Table;
