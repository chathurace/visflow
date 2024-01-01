import { HCanvas } from "../components/HCanvas";
import { HNode } from "./HNode";

export class HIfStart extends HNode {

    constructor(canvas: HCanvas) {
        super(canvas);
        this.multiOutput = true;
        this.label = "IF";
    }

    addConditionalSeq() {
        console.log("Add new conditional path");
    }

    draw(): JSX.Element {
        return <>
        <rect x={this.x} y={this.y} rx="15" ry="15" width={this.width} height={this.height} fill="lightblue" stroke="white" strokeWidth="1" onClick={() => this.addConditionalSeq()}/>
        <text x={this.midX} y={this.midY} dominantBaseline="middle" textAnchor="middle" fill="black">{this.label}</text>
        </>;
    }
}