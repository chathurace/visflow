import { DATA_HEADER_HEIGHT, DATA_HEIGHT } from "../Constants";
import { VMapping } from "../context/VMapping";
import { BRecordField } from "./BRecord";
import { BSComp, compMouseDown, compMouseUp } from "./BSComp";
import { JSX, MouseEvent } from 'react';

export class BSData extends BSComp {

    topLevelRecord: BRecordField | null = null;
    scrollTop: number = 0;

    constructor(topLevelRecord: BRecordField|null, vmapping: VMapping, x: number, y: number) {
        super(vmapping, x, y);
        if (topLevelRecord !== null) {
            this.topLevelRecord = topLevelRecord;
        }
    }

    getMaxLevels(): number {
        if (this.topLevelRecord === null) {
            return 0;
        }
        return this.topLevelRecord.getMaxLevels();
    }

    draw(): [JSX.Element, number] {
        if (this.topLevelRecord === null) {
            return [<></>, 0];
        }
        let maxLevels = this.topLevelRecord.getMaxLevels();
        let maxWidth = 300 + 10 * maxLevels;

        this.topLevelRecord.scrollTop = this.scrollTop;
        this.topLevelRecord.divX = this.x;
        this.topLevelRecord.divY = this.y;
        let [dataUI, recordHeight, maxX] = this.topLevelRecord.draw(0, 20, 0, maxWidth);
        dataUI = <>
        <svg width={maxWidth} height={recordHeight + 20}>
        <rect x="0" y="0" width={maxWidth} height={recordHeight + 20} fill="grey" stroke="grey" onMouseDown={(e) => {compMouseDown(e, this)}} />
        {dataUI}
        </svg>
        </>

        this.width = maxWidth;
        this.height = recordHeight + DATA_HEADER_HEIGHT > DATA_HEIGHT ? DATA_HEIGHT : recordHeight + DATA_HEADER_HEIGHT;

        const divStyle: React.CSSProperties = {
            width: `${this.width}px`,
            height: `${this.height}px`,
            position: 'absolute',
            left: `${this.x}px`,
            top: `${this.y}px`,
            backgroundColor: 'lightblue',
            border: '1px solid black',
            cursor: 'pointer',
            overflow: 'auto'
        };
        let cui = <div style={divStyle} onMouseUp={(e) => {compMouseUp(e, this)}} onScroll={(e)=>{dataScroll(e, this)}}>
            {dataUI}
        </div>;

        return [cui, 0];
    }
}

const dataScroll = (e: React.UIEvent<HTMLDivElement>, bdata: BSData) => {
    console.log(e.currentTarget.scrollTop + " of " + e.currentTarget.scrollHeight + " - " + e.currentTarget.clientHeight);
    bdata.scrollTop = e.currentTarget.scrollTop;
    if (bdata.topLevelRecord) {
        bdata.vmapping.render();
    }
}

const dataMouseDown = (e: MouseEvent<SVGRectElement>, bdata: BSData) => {
    e.preventDefault();
    bdata.dragDiffX = e.clientX - bdata.x;
    bdata.dragDiffY = e.clientY - bdata.y;
    bdata.vmapping.draggingComponent = bdata;
}