import { buildGetRequest } from '../utils/request-utils';
import FAKE_RESPONSE from '../fake-response';
import Row from './row';

const UPDATE_INTERVAL = 4000;
const URL = 'https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=56.84,55.27,33.48,41.48';

class ReusableRowsVector {
    constructor() {
        this.unused = [];
        this.used = [];
    }

    get data() {
        return this.used;
    }

    deleteByKey = key => {
        const node = this.used.find(n => n.key === key);
        if (!node) {
            console.error('Deleting key not found');
            return;
        }
        this.used = this.used.filter(n => n.key !== key);
        this.unused = [...this.unused, node];
    };

    insert = (key, data) => {
        let node;
        if (!this.unused.length) {
            node = new Row(key, data);
        } else {
            node = this.unused[0];
            this.unused = this.unused.slice(1);
            node.edit(key, data);
        }
        this.used = [...this.used, node];
    };

    updateByKey = (key, data) => {
        const node = this.used.find(n => n.key === key);
        if (!node) {
            console.error('Editing key not found');
            return;
        } else {
            node.edit(key, data);
        }
    };
}

class Table {
    constructor() {
        this.node = document.createElement('div');
        this.rows = new ReusableRowsVector();
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
