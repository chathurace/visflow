import { nodeHeight, nodeWidth } from "../Constants";
import { HCanvas } from "../components/HCanvas";
import { HNode } from "./HNode";

export class HTask extends HNode {

    testAdd() {
        let task = new HTask(this.canvas);
        task.label = "Test";
        task.x = 100;
        task.y = 400;
        this.canvas.render();
    }

    draw(): JSX.Element {
        return <>
        <rect x={this.x} y={this.y} rx="15" ry="15" width={this.width} height={this.height} fill="lightblue" stroke="white" strokeWidth="1" onClick={() => this.testAdd()}/>
        <text x={this.midX} y={this.midY} dominantBaseline="middle" textAnchor="middle" fill="black">{this.label}</text>
        </>;
    }
}