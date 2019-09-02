import Table from './components/table/table';
import columns from './columns';
import './global.css';
import { devMode } from './utils/dev-utils';
import Tag from './components/tag';
import Title from './components/table/title';

const UPDATE_INTERVAL = devMode() ? 5000000 : 3000;
const URL = 'https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=56.84,55.27,33.48,41.48';

window.onload = () => {
    const body = document.getElementsByTagName('body')[0];
    const title = new Title({ text: 'Самолеты вблизи аэропорта Домодедово' });
    body.appendChild(title.node);
    const table = new Table({ columns, url: URL, updateInterval: UPDATE_INTERVAL });
    body.appendChild(table.node);
    const tag = new Tag();
    body.appendChild(tag.node);
};
