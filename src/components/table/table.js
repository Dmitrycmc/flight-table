import { buildGetRequest } from '../../utils/request-utils';
import Row from './row';
import Header from './header';
import { createNode } from '../../utils/dom-utils';
import { buildState } from '../../utils/state';

class Table {
    constructor({ columns, url, updateInterval }) {
        this.props = { columns };
        this.state = {
            order: buildState({
                column: { init: 10, callback: this.sort },
                type: { init: 'asc', callback: this.sort }
            }),
            selection: buildState({
                rowKey: { init: null, callback: this.updateSelection }
            })
        };

        this.dataState = buildState({
            rawData: { init: {}, callback: this.sort },
            sortedData: { init: [], callback: this.rerender }
        });

        this.node = createNode({
            className: 'table_wrapper'
        });

        this.header = new Header({ columns, order: this.state.order });
        this.node.appendChild(this.header.node);

        this.update(url);
        setInterval(() => {
            this.update(url);
        }, updateInterval);
    }

    updateSelection = () => {
        this.rows.forEach(r => r.node.classList.remove('highlighted'));
        this.state.selection.rowKey &&
            this.rows.find(r => r.key === this.state.selection.rowKey).node.classList.add('highlighted');
    };

    update = url => {
        const request = buildGetRequest(url);
        request
            .then(({ full_count, version, ...data }) => {
                this.dataState.rawData = data;
            })
            .catch(() => {});
    };

    removeBody = () => {
        while (this.node.childNodes.length > 1) {
            this.node.removeChild(this.node.lastChild);
        }
    };

    rerender = () => {
        this.removeBody();

        this.rows = this.dataState.sortedData.map(
            rowData =>
                new Row({
                    columns: this.props.columns,
                    order: this.state.order,
                    selection: this.state.selection,
                    key: rowData.key,
                    data: rowData.data
                })
        );

        this.rows.forEach(r => this.node.appendChild(r.node));
    };

    sort = () => {
        this.dataState.sortedData = Object.entries(this.dataState.rawData)
            .map(([key, data]) => ({ key, data }))
            .sort((a, b) => {
                const val1 = this.props.columns[this.state.order.column].valueExtractor(a.data);
                const val2 = this.props.columns[this.state.order.column].valueExtractor(b.data);

                const type = this.state.order.type === 'asc' ? 1 : -1;

                if (!isNaN(val1)) return type * (val1 - val2);
                return type * val1.localeCompare(val2);
            });
        this.updateSelection();
    };
}

export default Table;
