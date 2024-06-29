import React, { MouseEvent } from 'react';
import { BField, onBFieldClick } from "./BField";
import { VMapping } from '../context/VMapping';

export class BFunction {

    x: number = -1;
    y: number = -1;

    dragDiffX: number = 0;
    dragDiffY: number = 0;

    vmapping: VMapping;
    name: string = "";
    inputs: BFunctionField[] = [];
    output: BFunctionField|null = null;

    constructor(vmapping: VMapping, name: string) {
        this.name = name;
        this.vmapping = vmapping;
    }

    addInput(name: string, typeName: string, array: boolean = false) {
        this.inputs.push(new BFunctionField(this.vmapping, name, typeName, this.name, false, array));
    }

    setOutput(name: string, typeName: string, array: boolean = false) {
        this.output = new BFunctionField(this.vmapping, name, typeName, this.name, true, array);
    }

    draw(assignedX: number, assignedY: number): JSX.Element {
        if (this.x === -1 && this.y === -1) {
            this.x = assignedX;
            this.y = assignedY;
        }
        let startX = this.x;
        let startY = this.y;

        if (this.output == null) {
            return <></>;
        }
        
        let fwidth = 400;   
        let fhieght = 80 + this.inputs.length * 30;
        let inputsUi = <></>;
        let inputY = startY + 60;
        this.inputs.forEach(input => {
            inputsUi = <>
                {inputsUi}
                <text x={startX + 40} y={inputY} className="fieldName">{input.name} : {input.typeName}</text>
                <circle cx={startX + 20} cy={inputY - 5} r="10" fill={input.getFill()} stroke="black" onClick={() => {onBFieldClick(input)}}/>
            </>;
            input.connectionPoint = [startX + 20, inputY - 5];
            inputY += 30;
        });

        let outputField = this.output;
        let outputFill = outputField.getFill();
        let outputUi = <>
        <line x1={startX} y1={startY + 50 + this.inputs.length * 30} x2={startX + fwidth} y2={startY + 50 + this.inputs.length * 30} stroke="grey" />
        <text x={startX + 200} y={startY + 70 + this.inputs.length * 30} className="fieldName">{this.output.name} : {this.output.typeName}</text>
        <circle cx={startX + fwidth - 20} cy={startY + 65 + this.inputs.length * 30} r="10" fill={outputFill} stroke="grey"onClick={() => {onBFieldClick(outputField)}} />
        </>;
        outputField.connectionPoint = [startX + fwidth - 20, startY + 65 + this.inputs.length * 30];

        return <>
        <rect x={startX} y={startY} rx="10" ry="10" width={fwidth} height={fhieght} fill="lightyellow" stroke="black" onMouseDown={(e) => {funcMoustDown(e, this)}} />
        <text x={startX + 20} y={startY + 20} className="funcName">{this.name}</text>
        <line x1={startX} y1={startY + 40} x2={startX + fwidth} y2={startY + 40} stroke="black" />
        {inputsUi}
        {outputUi}
        </>;
    }
}

const funcMoustDown = (e: MouseEvent<SVGRectElement>, bfunc: BFunction) => {
    e.preventDefault();
    console.log("mouse down " + e.clientX + " - " + e.clientY);
    bfunc.dragDiffX = e.clientX - bfunc.x;
    bfunc.dragDiffY = e.clientY - bfunc.y;
    bfunc.vmapping.draggingFunction = bfunc;
    bfunc.vmapping.draggingRecord = null;
}

export class BFunctionField extends BField {

}
