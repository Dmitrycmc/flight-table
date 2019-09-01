import { createNode } from '../../utils/dom-utils';

class Header {
    constructor({ columns, order }) {
        this.props = { columns, order };
        this.node = createNode({ className: 'header_row' });

        this.cellNodes = columns.map((column, i) => {
            const cellNode = createNode({
                className: 'header_cell',
                width: column.width,
                onClick: () => this.handleClick(i)
            });

            this.node.appendChild(cellNode);

            return cellNode;
        });

        this.update();
    }

    update = () => {
        this.cellNodes.forEach((cellNode, i) => {
            const triangle = this.props.order.type === 'asc' ? ' ▲' : ' ▼';
            cellNode.innerText = this.props.columns[i].title + (this.props.order.column === i ? triangle : '');
        });
    };

    handleClick = i => {
        if (this.props.order.column === i) {
            this.props.order.type = this.props.order.type === 'asc' ? 'desc' : 'asc';
        } else {
            this.props.order.column = i;
            this.props.order.type = 'asc';
        }
        this.update();
    };
}

export default Header;
