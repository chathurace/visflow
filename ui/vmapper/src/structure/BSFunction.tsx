import { CODE_SECTION_HEIGHT, FIELD_HEIGHT, FUNCTION_HEIGHT, HEADER_HEIGHT, SECTION_VGAP } from "../Constants";
import { BField } from "./BField";
import { BPrimitiveField } from "./BPrimitiveField";
import { BRecordField } from "./BRecord";
import { BSComp, compMouseDown } from "./BSComp";

export class BSFunction extends BSComp {
    inputs: BField[] = [];
    output: BField|null = null;

    addInputRecord(name: string, record: BRecordField) {
        record.fill = "lightyellow";
        this.inputs.push(record);
    }

    addInput(name: string, typeName: string, array: boolean = false) {
        let field = new BPrimitiveField(this.vmapping, name, typeName, this.name, false, array);
        field.fill = "lightyellow";
        this.inputs.push(field);
    }

    setOutput(name: string, typeName: string, array: boolean = false) {
        this.output = new BPrimitiveField(this.vmapping, name, typeName, this.name, true, array);
        this.output.fill = "lightyellow";
    }

    draw(): [JSX.Element, number] {

        this.width = 300;
        let actualHeight = HEADER_HEIGHT + SECTION_VGAP + this.inputs.length * FIELD_HEIGHT + SECTION_VGAP + FIELD_HEIGHT;
        this.height = actualHeight < FUNCTION_HEIGHT ? actualHeight : FUNCTION_HEIGHT;

        let inputUI = <></>;

        let currentY = HEADER_HEIGHT + SECTION_VGAP;
        let headerSeparatorY = currentY - SECTION_VGAP / 2;
        // let codeUI = <>
        // <rect x="0" y={currentY} width={this.width} height={CODE_SECTION_HEIGHT} fill="lightgrey" stroke="black" />
        // <text x="10" y={currentY + 10} className="fieldName">Code...</text>
        // </>;
        // currentY += CODE_SECTION_HEIGHT + SECTION_VGAP;
        // let codeSeparatorY = currentY - SECTION_VGAP / 2;

        let inputNumber = 0;
        this.inputs.forEach(input => {
            if (input instanceof BRecordField || input instanceof BPrimitiveField) {
                if (input instanceof BRecordField) {
                    input.expanded = false;
                }
                input.divX = this.x;
                input.divY = this.y;
                let [fieldUI, h] = input.draw(0, currentY + inputNumber * FIELD_HEIGHT, 0, this.width);
                inputUI = <>
                    {inputUI}
                    {fieldUI}
                </>;
                inputNumber += 1;
            }
        });

        currentY = currentY + this.inputs.length * FIELD_HEIGHT + SECTION_VGAP;
        let inputSeparatorY = currentY - SECTION_VGAP / 2;
        let outputUI = <text x = "10" y = {currentY + 20} className="fieldName">Output not defined</text>;
        if (this.output) {
            if (this.output instanceof BRecordField || this.output instanceof BPrimitiveField) {
                this.output.divX = this.x;
                this.output.divY = this.y;
                let [fieldUI, h] = this.output.draw(0, currentY, 0, this.width);
                outputUI = fieldUI;
            }
        }
        currentY += FIELD_HEIGHT;

        const divStyle: React.CSSProperties = {
            width: `${this.width}px`,
            height: `${this.height}px`,
            position: 'absolute',
            left: `${this.x}px`,
            top: `${this.y}px`,
            backgroundColor: 'none',
            border: 'none',
            overflow: 'auto'
        };
        let funcUI = <div style={divStyle}>
            <svg width={this.width} height={this.height}>
                <rect x="0" y="0" rx="0" ry="0" width={this.width} height={this.height} fill="yellow" stroke="black" onMouseDown={(e) => {compMouseDown(e, this)}}/>
                <text x="10" y="20" className="funcName">{this.name}</text>
                <line x1="0" y1={headerSeparatorY} x2={this.width} y2={headerSeparatorY} strokeWidth={SECTION_VGAP} stroke="grey" />
                {/* {codeUI}
                <line x1="0" y1={codeSeparatorY} x2={this.width} y2={codeSeparatorY} strokeWidth={SECTION_VGAP} stroke="grey" /> */}
                {/* <line x1="0" y1={HEADER_HEIGHT + SECTION_VGAP / 2} x2={this.width} y2={HEADER_HEIGHT + SECTION_VGAP / 2} strokeWidth={SECTION_VGAP} stroke="grey" /> */}
                {inputUI}
                <line x1="0" y1={inputSeparatorY} x2={this.width} y2={inputSeparatorY} strokeWidth={SECTION_VGAP} stroke="grey" />
                {/* <line x1="0" y1={inoutSeperatorY} x2={this.width} y2={inoutSeperatorY} strokeWidth={SECTION_VGAP} stroke="grey" /> */}
                {outputUI}
            </svg>
        </div>;
        return [funcUI, 0];
    }
}