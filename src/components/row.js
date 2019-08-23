class Row {
    constructor(key, data) {
        this.node = document.createElement('div');
        this.node.classList.add('table_row');

        this.cellNodes = [...Array(19)].map(() => document.createElement('div'));
        this.cellNodes.forEach(cellNode => {
            cellNode.classList.add('table_cell');
            this.node.appendChild(cellNode);
        });

        this.edit(key, data);
    }

    edit = (key, data) => {
        this.cellNodes.forEach((cellNode, i) => {
            cellNode.innerText = data[i];
        });
        this.key = key;
    };
}

export default Row;
