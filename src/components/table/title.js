import { createNode } from '../../utils/dom-utils';

export default class Title {
    constructor({ text }) {
        this.node = createNode({ className: 'title', text });
    }
}
