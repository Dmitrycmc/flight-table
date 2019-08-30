class Header {
    constructor(columns) {
        this.node = document.createElement('div');
        this.node.classList.add('header_row');

        this.cellNodes = columns.map(column => {
            const cellNode = document.createElement('div');

            cellNode.classList.add('header_cell');
            cellNode.innerText = column.title;
            cellNode.style.width = column.width + 'px';

            this.node.appendChild(cellNode);

            return cellNode;
        });
    }
}

export default Header;
