class Header {
    constructor(columns) {
        this.node = document.createElement('div');
        this.node.classList.add('header_row');

        this.cellNodes = columns.map(() => document.createElement('div'));
        this.cellNodes.forEach((cellNode, i) => {
            cellNode.classList.add('header_cell');
            cellNode.innerText = columns[i].title;
            cellNode.style.width = columns[i].width + 'px';

            this.node.appendChild(cellNode);
        });
    }
}

export default Header;
