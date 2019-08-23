class Row {
    constructor(columns, key, data) {
        this.node = document.createElement('div');
        this.node.classList.add('table_row');

        this.cellNodes = [...Array(19)].map(() => document.createElement('div'));
        this.cellNodes.forEach((cellNode, i) => {
            cellNode.classList.add('table_cell');
            cellNode.style.width = columns[i].width + 'px';
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
