import { blockFooterHieght } from "../Constants";
import { HBlock } from "../blocks/HBlock";
import { HCanvas } from "../components/HCanvas";
import { HNode } from "./HNode";

export class HIfEnd extends HNode {

    constructor(block: HBlock, canvas: HCanvas) {
        super(block, canvas);
        this.multiInput = true;
        this.label = "";
        this.height = blockFooterHieght;
    }

    draw(): JSX.Element {
        return <>
            <polygon points={this.x + "," + (this.y + this.height / 2) + " " + 
                (this.x + this.width / 4) + "," + this.y + " " + 
                (this.x + this.width * 3 / 4) + "," + this.y + " " + 
                (this.x + this.width) + "," + (this.y + this.height / 2) + " " + 
                (this.x + this.width * 3 / 4) + "," + (this.y + this.height) + " " + 
                (this.x + this.width / 4) + "," + (this.y + this.height) + " " + 
                this.x + "," + (this.y + this.height / 2)} fill="lightpink" stroke="white" strokeWidth="1" onClick={() => this.viewProperties()}/>
            <text x={this.midX} y={this.midY} dominantBaseline="middle" textAnchor="middle" fill="black">{this.label}</text>
        </>;
        // return <>
        // <rect x={this.x} y={this.y} rx="0" ry="0" width={this.width} height={this.height} fill="lightblue" stroke="white" strokeWidth="1"/>
        // <text x={this.midX} y={this.midY} dominantBaseline="middle" textAnchor="middle" fill="black">{this.label}</text>
        // </>;
    }
}