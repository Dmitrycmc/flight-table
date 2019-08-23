import Table from './components/table';

window.onload = () => {
    const body = document.getElementsByTagName('body')[0];
    const table = new Table();
    body.appendChild(table.node);
};
