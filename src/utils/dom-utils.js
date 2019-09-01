export const createNode = ({ className, onClick, width, text }) => {
    const node = document.createElement('div');
    className && (node.className = className);
    onClick && (node.onclick = onClick);
    width && (node.style.width = isNaN(width) ? width : `${width}px`);
    text && (node.innerText = text);
    return node;
};
