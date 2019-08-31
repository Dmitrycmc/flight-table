class Row {
    getSortKey = order => {
        return this.columns[order.column].valueExtractor(this.data);
    };

    constructor(columns, order, onRowClick, key, data) {
        this.node = document.createElement('div');
        this.node.classList.add('table_row');
        this.node.onclick = () => onRowClick(key);
        this.order = order;
        this.data = data;
        this.columns = columns;

        this.cellNodes = columns.map(column => {
            const cellNode = document.createElement('div');

            cellNode.classList.add('table_cell');
            cellNode.style.width = column.width + 'px';
            cellNode.presentation = column.presentation;
            cellNode.valueExtractor = column.valueExtractor;
            this.node.appendChild(cellNode);

            return cellNode;
        });
        this.edit(key, data);
    }

    edit = (key, data) => {
        this.data = data;
        this.cellNodes.forEach(cellNode => {
            const extractedData = cellNode.valueExtractor(data);
            cellNode.innerText = cellNode.presentation ? cellNode.presentation(extractedData) : extractedData;
        });
        this.key = key;
    };
}

export default Row;
