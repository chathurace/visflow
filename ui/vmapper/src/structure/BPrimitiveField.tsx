import { CON_WIDTH, FIELD_HEIGHT } from "../Constants";
import { VMapping } from "../context/VMapping";
import { BTypeField, onBFieldClick } from "./BField";
import { compMouseUp } from "./BSComp";

export class BPrimitiveField extends BTypeField {

    constructor(vmapping: VMapping, name: string, type: string, parentPath: string, input: boolean, array: boolean = false) {
        super(vmapping, name, type, parentPath, input, array);
    }

    draw(startX: number, startY: number, ox1: number, ox2: number): [JSX.Element, number, number] {
        let fill = this.getFill();
        let fieldWidth = ox2 - ox1;
        let conX = this.input? ox2 : ox1;
        let cx = this.input? ox2 - 10 : ox1;
        let textLength = this.name.length + this.typeName.length + 3 + (this.array ? 2 : 0);
        let textX = this.input? (ox2 - (CON_WIDTH + textLength * 10)) : startX + 20;

        let arraySymbol = this.array ? "[]" : "";
        let ui = <>
            <rect x={ox1} y={startY} width={fieldWidth} height={FIELD_HEIGHT} fill={this.fill} stroke="grey" />
            <text x={textX} y={startY + 20} className="fieldName">{this.name} : {this.typeName} {arraySymbol}</text>
            <rect x={cx} y={startY + 8} width={CON_WIDTH} height="14" fill={fill} stroke="grey" onClick={() => { onBFieldClick(this) }} />
        </>;
        let conY = startY + 15 + this.divY - this.scrollTop;
        this.connectionPoint = [this.divX + conX, conY > this.divY ? conY : this.divY];
        return [ui, 30, startX];
    }
}