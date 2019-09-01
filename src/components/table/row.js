import { createNode } from '../../utils/dom-utils';

class Row {
    getSortKey = () => {
        return this.props.columns[this.props.order.column].valueExtractor(this.data);
    };

    handleRowClick = () => {
        this.props.selection.rowKey = this.props.selection.rowKey !== this.key ? this.key : null;
    };

    constructor({ columns, order, selection, key, data }) {
        this.node = createNode({ className: 'table_row', onClick: this.handleRowClick });

        this.props = { order, columns, selection };
        this.key = key;
        this.data = data;

        this.cellNodes = columns.map(column => {
            const cellNode = createNode({ className: 'table_cell', width: column.width });

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
