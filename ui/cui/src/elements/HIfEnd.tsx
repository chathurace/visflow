import { HBlock } from "../blocks/HBlock";
import { HCanvas } from "../components/HCanvas";
import { HNode } from "./HNode";

export class HIfEnd extends HNode {

    constructor(block: HBlock, canvas: HCanvas) {
        super(block, canvas);
        this.multiInput = true;
        this.label = "END IF";
    }

    draw(): JSX.Element {
        return <>
        <rect x={this.x} y={this.y} rx="15" ry="15" width={this.width} height={this.height} fill="lightblue" stroke="white" strokeWidth="1"/>
        <text x={this.midX} y={this.midY} dominantBaseline="middle" textAnchor="middle" fill="black">{this.label}</text>
        </>;
    }
}