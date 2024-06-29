import { VMapping } from "../context/VMapping";
import { BRecordField } from "./BRecord";
import { JSX, MouseEvent } from 'react';

export class BData {
    vmapping: VMapping;
    x: number = -1;
    y: number = -1;
    dragDiffX: number = 0;
    dragDiffY: number = 0;
    topLevelRecord: BRecordField | null = null;

    constructor(vmapping: VMapping, topLevelRecord: BRecordField | null = null) {
        this.vmapping = vmapping;
        this.topLevelRecord = topLevelRecord;
    }

    getMaxLevels(): number {
        if (this.topLevelRecord === null) {
            return 0;
        }
        return this.topLevelRecord.getMaxLevels();
    }

    draw(startX: number, startY: number): [JSX.Element, number] {
        if (this.topLevelRecord === null) {
            return [<></>, 0];
        }
        let maxLevels = this.topLevelRecord.getMaxLevels();
        let maxWidth = 300 + 10 * maxLevels;
        if (this.x === -1) {
            this.x = startX;
            this.y = startY;
        }
        let [dataUI, recordHeight, maxX] = this.topLevelRecord.draw(this.x, this.y + 20, this.x, this.x + maxWidth);
        // let [dataUI, recordHeight, maxX] = this.topLevelRecord.draw(0, 0, 0, maxWidth);
        dataUI = <>
        <rect x={this.x} y={this.y} width={maxWidth} height={recordHeight + 20} fill="grey" stroke="grey" onMouseDown={(e) => {dataMoustDown(e, this)}} />
        {/* <svg className="scrollView" x={this.x} y={this.y+20} width={maxWidth} height={recordHeight-50}>
            <svg className="scrollView" id="inner-svg" width="500" height="800" viewBox="0 0 500 800">{dataUI}</svg>
        </svg> */}
        {dataUI}
        </>
        return [dataUI, recordHeight];
    }
}

const dataMoustDown = (e: MouseEvent<SVGRectElement>, bdata: BData) => {
    e.preventDefault();
    console.log("mouse down " + e.clientX + " - " + e.clientY);
    bdata.dragDiffX = e.clientX - bdata.x;
    bdata.dragDiffY = e.clientY - bdata.y;
    bdata.vmapping.draggingRecord = bdata;
    bdata.vmapping.draggingFunction = null;
}