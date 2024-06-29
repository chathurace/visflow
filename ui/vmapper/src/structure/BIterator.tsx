import { BMode } from "../components/MapView";
import React, { MouseEvent } from 'react';
import { BField, SelectionStatus, onBFieldClick } from "./BField";
import { BLink } from "./BLink";
import { VMapping } from "../context/VMapping";

// export class BJoin {
//     inputs: BField[] = [];
//     condition: string = "";
//     outpts: AliasedField[] = [];

//     addInput(name: string, typeName: string, array: boolean = false) {
//         this.inputs.push(new BIteratorField(this.vmapping, name, typeName, this.name, false, array));
//     }
// }

class AliasedField extends BField {
    alias: string = "";
}

export class BIterator {

    x: number = -1;
    y: number = -1;

    dragDiffX: number = 0;
    dragDiffY: number = 0;

    vmapping: VMapping;
    name: string = "";
    inputs: BField[] = [];
    outputs: AliasedField[] = [];
    condition: string = "";
    joinInputs: Map<string, BField> = new Map();

    constructor(vmapping: VMapping, name: string) {
        this.name = name;
        this.vmapping = vmapping;
    }

    addInput(name: string, typeName: string, array: boolean = false) : BField {
        let bField = new BField(this.vmapping, name, typeName, this.name, false, array);
        this.inputs.push(bField);
        return bField;
    }

    addOutput(name: string, typeName: string, array: boolean = false) {
        this.outputs.push(new AliasedField(this.vmapping, name, typeName, this.name, true, array));
    }

    draw(assignedX: number, assignedY: number): JSX.Element {
        if (this.x === -1 && this.y === -1) {
            this.x = assignedX;
            this.y = assignedY;
        }
        let startX = this.x;
        let startY = this.y;

        if (this.outputs == null) {
            return <></>;
        }
        
        let fwidth = 600;   
        let fhieght = 80 + this.inputs.length * 30;
        let inputsUi = <></>;
        let inputY = startY + 60;
        this.inputs.forEach(input => {
            inputsUi = <>
                {inputsUi}
                <text x={startX + 40} y={inputY} className="fieldName">{input.name} : {input.typeName}{input.array? " []" : ""}</text>
                <circle cx={startX + 20} cy={inputY - 5} r="10" fill={input.getFill()} stroke="black" onClick={() => {onBFieldClick(input)}}/>
            </>;
            input.connectionPoint = [startX + 20, inputY - 5];
            inputY += 30;
        });
        let inputEndY = inputY - 30;

        let outputY = inputEndY + 30;
        let outputUi = <></>;
        this.outputs.forEach(output => {
            let outputFill = output.getFill();        
            outputUi = <>
            {outputUi}
            <text x={startX + fwidth - 300} y={outputY} className="fieldName">{output.name} : {output.typeName}{output.array? " []" : ""}</text>
            <circle cx={startX + fwidth - 20} cy={outputY - 5} r="10" fill={outputFill} stroke="grey"onClick={() => {onBFieldClick(output)}} />
            </>;
            output.connectionPoint = [startX + fwidth - 20, startY + 65 + this.inputs.length * 30];
            outputY += 30;
        });
        let outputEndY = outputY - 30;

        return <>
        <rect x={startX} y={startY} rx="10" ry="10" width={fwidth} height={outputEndY + 10 - startY} fill="lightblue" stroke="black" onClick={(e) => {bitClick(e, this)}} onMouseDown={(e) => {bitMoustDown(e, this)}} />
        <text x={startX + 20} y={startY + 20} className="funcName" onClick={e => {iteratorEditConfig(e, this)}}>{this.name}</text>
        <rect x={startX + fwidth - 25} y={startY + 5} width="20" height="30" fill="white" stroke="grey" onClick={()=>{console.log("Join inputs: " + this.joinInputs.size)}} />
        <line x1={startX} y1={startY + 40} x2={startX + fwidth} y2={startY + 40} stroke="black" />
        {inputsUi}
        <line x1={startX} y1={inputEndY + 10} x2={startX + fwidth} y2={inputEndY + 10} stroke="black" />
        {outputUi}
        </>;
    }
}

const bitClick = (e: MouseEvent<SVGRectElement>, bit: BIterator) => {  
    console.log("Bit clicked " + bit.name);
    if (bit.vmapping.bMode === BMode.LINKING) {
        if (bit.vmapping.currentLhsNode !== null) {
            console.log("Linking " + bit.vmapping.currentLhsNode.name + " to " + bit.name);
            let newInputField = bit.addInput(bit.vmapping.currentLhsNode.name, bit.vmapping.currentLhsNode.typeName, bit.vmapping.currentLhsNode.array);
            newInputField.selectionStatus = SelectionStatus.LINKED;
            let blink = new BLink(bit.vmapping.currentLhsNode, newInputField);
            bit.vmapping.bLinks.push(blink);
            bit.vmapping.currentLhsNode.selectionStatus = SelectionStatus.LINKED;
            bit.vmapping.currentLhsNode = null;
            bit.vmapping.bMode = BMode.NONE;
            bit.vmapping.render();
        }
    }
}

const bitMoustDown = (e: MouseEvent<SVGRectElement>, bfunc: BIterator) => {  
    if (bfunc.vmapping.bMode !== BMode.NONE) {
        return;
    } 
    e.preventDefault();
    console.log("mouse down " + e.clientX + " - " + e.clientY);
    bfunc.dragDiffX = e.clientX - bfunc.x;
    bfunc.dragDiffY = e.clientY - bfunc.y;
    bfunc.vmapping.draggingIterator = bfunc;
    bfunc.vmapping.draggingFunction = null;
    bfunc.vmapping.draggingRecord = null;
}

const iteratorEditConfig = (e: MouseEvent<SVGTextElement>, bIterator: BIterator) => {
    e.preventDefault();
    bIterator.vmapping.setBIterator(bIterator);
    // console.log("Edit config");
}

// export class BIteratorField extends BField {

// }
