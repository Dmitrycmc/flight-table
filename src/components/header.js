class Header {
    constructor(columns, order, handleSorting) {
        this.node = document.createElement('div');
        this.node.classList.add('header_row');
        this.order = order;
        this.columns = columns;
        this.handleSorting = handleSorting;

        this.cellNodes = columns.map((column, i) => {
            const cellNode = document.createElement('div');

            cellNode.classList.add('header_cell');
            cellNode.style.width = column.width + 'px';
            cellNode.onclick = () => this.handleClick(i);

            this.node.appendChild(cellNode);

            return cellNode;
        });

        this.update();
    }

    update = () => {
        this.cellNodes.forEach((cellNode, i) => {
            const triangle = this.order.type === 'asc' ? ' ▲' : ' ▼';
            cellNode.innerText = this.columns[i].title + (this.order.column === i ? triangle : '');
        });
        this.handleSorting();
    };

    handleClick = i => {
        if (this.order.column === i) {
            this.order.type = this.order.type === 'asc' ? 'desc' : 'asc';
        } else {
            this.order.column = i;
            this.order.type = 'asc';
        }
        this.update();
    };
}

export default Header;
