import { createNode } from '../../utils/dom-utils';

class Row {
    handleRowClick = () => {
        this.props.selection.rowKey = this.props.selection.rowKey !== this.key ? this.key : null;
    };

    constructor({ columns, selection, key, data }) {
        this.node = createNode({ className: 'table_row', onClick: this.handleRowClick });

        this.props = { selection };
        this.key = key;
        this.data = data;

        this.cellNodes = columns.map(column => {
            const cellNode = createNode({ className: 'table_cell', width: column.width });

            cellNode.presentation = column.presentation;
            cellNode.valueExtractor = column.valueExtractor;
            cellNode.link = column.link;
            this.node.appendChild(cellNode);

            return cellNode;
        });
        this.edit(key, data);
    }

    edit = (key, data) => {
        this.data = data;
        this.cellNodes.forEach(cellNode => {
            const extractedData = cellNode.valueExtractor(data);
            const text = cellNode.presentation ? cellNode.presentation(extractedData) : extractedData;
            if (cellNode.link) {
                const linkUrl = cellNode.link(extractedData);
                const linkNode = createNode({
                    tagName: 'a',
                    href: linkUrl,
                    className: 'link',
                    text,
                    title: 'Смотреть на flightradar24.com'
                });
                cellNode.appendChild(linkNode);
            } else {
                cellNode.innerText = text;
            }
        });
        this.key = key;
    };
}

export default Row;
