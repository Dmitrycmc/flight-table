class ReusableScalableVector {
    constructor(entityConstructor) {
        this.entityConstructor = entityConstructor;
        this.unused = [];
        this.used = [];
    }

    get data() {
        return this.used;
    }

    deleteByKey = key => {
        const node = this.used.find(n => n.key === key);
        if (!node) {
            console.error('Deleting key not found');
            return;
        }
        this.used = this.used.filter(n => n.key !== key);
        this.unused = [...this.unused, node];
    };

    insert = (key, data) => {
        let node;
        if (!this.unused.length) {
            node = new this.entityConstructor(key, data);
        } else {
            node = this.unused[0];
            this.unused = this.unused.slice(1);
            node.edit(key, data);
        }
        this.used = [...this.used, node];
    };

    updateByKey = (key, data) => {
        const node = this.used.find(n => n.key === key);
        if (node) {
            node.edit(key, data);
        } else {
            console.error('Editing key not found');
        }
    };
}

export default ReusableScalableVector;
