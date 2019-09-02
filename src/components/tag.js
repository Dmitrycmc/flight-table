import { createNode } from '../utils/dom-utils';

export default class Tag {
    constructor() {
        const link = createNode({
            tagName: 'a',
            href: 'https://github.com/Dmitrycmc',
            className: 'link',
            text: 'Lytov Dmitry',
            title: 'Github'
        });

        const label = createNode({
            text: 'By '
        });

        this.node = createNode({ className: 'tag' });

        this.node.appendChild(label);
        this.node.appendChild(link);
    }
}
