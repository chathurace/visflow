import { HBlock } from "../blocks/HBlock";
import { HCanvas } from "../components/HCanvas";
import { HNode } from "./HNode";

export class HSeqStart extends HNode {

    condition: string | null = null;

    constructor(block: HBlock, canvas: HCanvas, condition: string | null = null) {
        super(block, canvas);
        if (condition) this.label = "C";
        this.condition = condition;
    }

    draw(): JSX.Element {
        return <>
            <rect x={this.x} y={this.y} rx="15" ry="15" width={this.condition == null? 0 : this.width} height={this.height} fill="lightgreen" stroke="white" strokeWidth="1" onClick={() => {}} />
            <text x={this.midX} y={this.midY} dominantBaseline="middle" textAnchor="middle" fill="black">{this.label}</text>
        </>;
    }

}