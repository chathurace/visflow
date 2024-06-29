import { HBlock } from "../blocks/HBlock";
import { HCanvas } from "../components/HCanvas";
import { HNode } from "./HNode";

export class HSeqEnd extends HNode {

    condition: string | null = null;
    visible: boolean = true;

    constructor(block: HBlock, canvas: HCanvas, condition: string | null = null, label: string | null = null) {
        super(block, canvas);
        if (condition) {
            this.label = condition;
        } else if (label) {
            this.label = label;
        } else {
            this.visible = false;
        }
        this.condition = condition;
    }

    draw(): JSX.Element {
        if (!this.visible) {
            return <></>;
        }

        return <>
            <rect x={this.x} y={this.y} rx="10" ry="10" width={this.width} height={this.height} fill="darkseagreen" stroke="green" strokeWidth="1" onClick={() => {}} />
            <text x={this.midX} y={this.midY} dominantBaseline="middle" textAnchor="middle" fill="black">{this.label}</text>
        </>;
    }
}