import React, { ChangeEvent, KeyboardEvent } from "react";
import { nodeHeight, nodeWidth } from "../Constants";
import { HCanvas } from "../components/HCanvas";
import { HEdge } from "./HEdge";
import { HNode } from "./HNode";
import { log } from "console";

export class HTask extends HNode {

    logMessage: string = "";

    testAdd() {
        
    }

    draw(selectedNode: HNode | null): JSX.Element {
        let strokeColor = "white";
        if (selectedNode === this) {
            strokeColor = "black";
        }
        console.log(strokeColor);

        return <>
        <rect x={this.x} y={this.y} rx="15" ry="15" width={this.width} height={this.height} fill="lightblue" stroke={strokeColor} strokeWidth="1" onKeyUp={(e: KeyboardEvent<SVGRectElement>) => console.log("key up")} onClick={() => this.viewProperties()} onMouseOver={() => console.log("mouse2")}/>
        {/* <rect x={this.x + this.width} y={this.y} rx="1" ry="1" width="40" height={this.height} fill="lightgreen" stroke="white" strokeWidth="1" /> */}
        <text x={this.midX} y={this.midY} dominantBaseline="middle" textAnchor="middle" fill="black">{this.label}</text>
        </>;
    }

    getPropertiesView(): JSX.Element {
        return <div>
            <HLogPropertiesView logNode={this}/>
        </div>
    }
}

export const addTask = (edge: HEdge) => {
    let hTask = new HTask(edge.block, edge.canvas);
    hTask.label = "Log";
    hTask.connectTo(edge);
    edge.canvas.setSelectedEdge(null);
    edge.canvas.render(null);
}

interface HLogPropertiesViewP {
    logNode: HTask;
}

export const HLogPropertiesView: React.FC<HLogPropertiesViewP> = ({logNode}) => {

    const [logMessage, setLogMessage] = React.useState<string>(logNode.logMessage);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("Typed something. Current value: " + logNode.logMessage);
        setLogMessage(e.target.value);
        logNode.logMessage = e.target.value;
    };

    return <div>
            <label>Label</label>
            {/* <input type="text" value={logMessage} onChange={(e: ChangeEvent<HTMLInputElement>) => {setLogMessage(e.target.value)}}/> */}
            <input type="text" value={logNode.logMessage} onChange={handleChange}/>
            {/* onBlur={(e) => logNode.logMessage = e.target.value} */}
        </div>
};

