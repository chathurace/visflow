import { HBlock } from "../blocks/HBlock";
import { HIfBlock } from "../blocks/HIfBlock";
import { HSequence } from "../blocks/HSequence";
import { HCanvas } from "../components/HCanvas";
import { HNode } from "./HNode";

export class HIfStart extends HNode {

    constructor(block: HBlock, canvas: HCanvas) {
        super(block, canvas);
        this.multiOutput = true;
        this.label = "IF";
    }

    addConditionalSeq() {
        console.log("Add new conditional path");
        if (this.block instanceof HIfBlock) {
            this.block.addPath("some condition");
        }
    }

    draw(): JSX.Element {
        return <>
        <rect x={this.x} y={this.y} rx="15" ry="15" width={this.width} height={this.height} fill="lightblue" stroke="white" strokeWidth="1" onClick={() => this.addConditionalSeq()}/>
        <text x={this.midX} y={this.midY} dominantBaseline="middle" textAnchor="middle" fill="black">{this.label}</text>
        </>;
    }
}