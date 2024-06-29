import { conditionHeight } from "../Constants";
import { HBlock } from "../blocks/HBlock";
import { HCanvas } from "../components/HCanvas";
import { HNode } from "./HNode";

//  {"seq":
//      {"start":  
//          {"condition": ""}
export class HSeqStart extends HNode {

    condition: string | null = null;
    visible: boolean = true;

    constructor(block: HBlock, canvas: HCanvas, condition: string | null = null, label: string | null = null) {
        super(block, canvas);
        if (condition) {
            this.label = condition;
            this.height = conditionHeight;
        } else if (label) {
            this.label = label;
        } else {
            this.visible = false;
        }
        this.condition = condition;
    }

    draw(): JSX.Element {
        if (!this.visible) {
            return <></>
        }

        if (this.condition != null) {
            return <>
                <rect x={this.x} y={this.y} rx="0" ry="0" width={this.width} height={this.height} fill="white" stroke="grey" strokeWidth="1" onClick={() => {}} />
                <text x={this.midX} y={this.midY} dominantBaseline="middle" textAnchor="middle" fill="black">{this.label}</text>
            </>;    
        }

        return <>
            <rect x={this.x} y={this.y} rx="10" ry="10" width={this.width} height={this.height} fill="darkseagreen" stroke="green" strokeWidth="1" onClick={() => {}} />
            <text x={this.midX} y={this.midY} dominantBaseline="middle" textAnchor="middle" fill="black">{this.label}</text>
        </>;
    }

    serialize(): string {
        let scode = "";
        return "";
    }

}