export const createNode = ({ tagName = 'div', onClick, width, text, href, ...restProps }) => {
    const node = document.createElement(tagName);
    onClick && (node.onclick = onClick);
    width && (node.style.width = isNaN(width) ? width : `${width}px`);
    text && (node.innerText = text);
    if (href) {
        node.href = href;
        node.target = '_blank';
    }
    Object.entries(restProps).forEach(([name, value]) => {
        node[name] = value;
    });
    return node;
};
