class Row {
    constructor(key, data) {
        this.node = document.createElement('div');
        this.edit(key, data);
    }

    edit = (key, data) => {
        this.node.innerText = data;
        this.key = key;
    };
}

export default Row;
