import { JSX, MouseEvent } from "react";
import { BTypeField } from "./BField";
import { BPrimitiveField } from "./BPrimitiveField";
import { VMapping } from "../context/VMapping";

export class BRecordField extends BTypeField {
    fields: BTypeField[] = [];
    expanded: boolean = false;

    constructor(vmapping: VMapping, name: string, typeName: string, parentPath: string = "", input: boolean = true, array: boolean = false) {
        super(vmapping, name, typeName, parentPath, input, array);
    }

    setLhsNode(lhsNode: boolean): void {
        this.input = lhsNode;
        this.fields.forEach(field => {
            field.setLhsNode(lhsNode);
        });
    }

    addField(name: string, typeName: string, array: boolean = false) {
        this.fields.push(new BPrimitiveField(this.vmapping, name, typeName, this.path, this.input, array));
    }

    addRecordField(field: BRecordField) {
        field.path = this.path + "." + field.name;
        field.setLhsNode(this.input);
        this.fields.push(field);
    }

    draw(startX: number, startY: number, ox1: number, ox2: number): [JSX.Element, number, number] {
        let arraySymbol = this.array ? "[]" : "";
        let fieldWidth = ox2 - ox1;
        let cx = this.input? ox2 - 20 : ox1 + 20;
        let textX = this.input? startX : startX + 30;

        if (!this.expanded) {
            let ui = <>
                <rect x={ox1} y={startY} width={fieldWidth} height="30" fill="lightgrey" stroke="grey" />
                {/* <rect x={ox1} y={startY} width={startX - ox1} height="30" fill="grey" stroke="grey" /> */}
                <text x={textX + 5} y={startY + 20} className="fieldName" onClick={(e) => {expanderClick(e, this)}}>+</text>
                <text x={textX + 20} y={startY + 20} className="fieldName">{this.name} : {this.typeName} {arraySymbol}</text>
                <circle cx={cx} cy={startY + 15} r="10" fill="none" stroke="grey" />
            </>;
            return [ui, 30, startX];
        }

        let currentY = startY + 30;
        let ui = <></>;
        let maxChildX = startX;
        this.fields.forEach(field => {
            field.divX = this.divX;
            field.divY = this.divY;
            field.scrollTop = this.scrollTop;
            let [fieldUI, fieldHeight, childX] = field.draw(startX + 20, currentY, ox1, ox2);
            if (childX > maxChildX)
                maxChildX = childX;
            ui = <>
                {ui}
                {fieldUI}
            </>;
            currentY += fieldHeight;
        });
        let headerUI = <>
            <rect x={ox1} y={startY} width={fieldWidth} height="30" fill="lightgrey" stroke="black" />
            {/* <rect x={ox1} y={startY} width={startX - ox1} height="30" fill="grey" stroke="grey" /> */}
            <text x={textX + 5} y={startY + 20} className="fieldName" onClick={(e) => {expanderClick(e, this)}}>-</text>
            <text x={textX + 20} y={startY + 20} className="fieldName">{this.name} : {this.typeName} {arraySymbol}</text>
            <circle cx={cx} cy={startY + 15} r="10" fill="none" stroke="grey" />
        </>;
        ui = <>
            {headerUI}
            {ui}
        </>;

        return [ui, currentY - startY, maxChildX];
    }

    getMaxLevels(parentLevel: number = 0): number {
        let maxLevels = 0;
        this.fields.forEach(field => {
            if (field instanceof BRecordField && field.expanded) {
                maxLevels++;
                let levels = field.getMaxLevels(parentLevel + 1);
                if (levels > maxLevels)
                    maxLevels = levels;
            }
        });
        return parentLevel + maxLevels;
    }
}

const expanderClick = (e: MouseEvent<SVGTextElement>, brecord: BRecordField) => {
    e.preventDefault();
    if (brecord.expanded) {
        brecord.expanded = false;
    } else {
        brecord.expanded = true;
    }
    brecord.vmapping.render();
}

