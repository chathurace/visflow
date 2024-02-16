import React, { ChangeEvent } from "react";
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

    addConditionalSeq(condition: string = "") {
        console.log("Add new conditional path");
        if (this.block instanceof HIfBlock) {
            this.block.addPath(condition);
        }
    }

    draw(): JSX.Element {
        return <>
        <rect x={this.x} y={this.y} rx="15" ry="15" width={this.width} height={this.height} fill="lightblue" stroke="white" strokeWidth="1" onClick={() => this.viewProperties()}/>
        <text x={this.midX} y={this.midY} dominantBaseline="middle" textAnchor="middle" fill="black">{this.label}</text>
        </>;
    }

    getPropertiesView(): JSX.Element {
        return <div>
            <HIfPropertiesView ifNode={this}/>
        </div>
    }
}

interface HIfStartPropertiesViewP {
    ifNode: HIfStart;
}

export const HIfPropertiesView: React.FC<HIfStartPropertiesViewP> = ({ifNode}) => {

    const [branchMode, setBranchMode] = React.useState<boolean>(false);
    const [hcondition, setHCondition] = React.useState<string>("");

    // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     console.log("Typed something. Current value: " + logNode.logMessage);
    //     setLogMessage(e.target.value);
    //     logNode.logMessage = e.target.value;
    // };

    return <div>
            {!branchMode && <button onClick={() => {setHCondition(""); setBranchMode(true);}}>Add branch</button>}
            {branchMode && 
                <div>
                    <label>Condition</label>
                    <input type="text" value={hcondition} onChange={(e: ChangeEvent<HTMLInputElement>) => {setHCondition(e.target.value)}}/>
                    <button onClick={() => {ifNode.addConditionalSeq(hcondition); setBranchMode(false);}}>Add</button>
                </div>
            }
            {/* <input type="text" value={logMessage} onChange={(e: ChangeEvent<HTMLInputElement>) => {setLogMessage(e.target.value)}}/> */}
            {/* <input type="text" value={logNode.logMessage} onChange={handleChange}/> */}
            {/* onBlur={(e) => logNode.logMessage = e.target.value} */}
        </div>
};

export const HAddBranchView: React.FC<HIfStartPropertiesViewP> = ({ifNode}) => {

    const [hcondition, setHCondition] = React.useState<string>("");

    return <div>
            <label>Condition</label>
            <input type="text" value={hcondition} onChange={(e: ChangeEvent<HTMLInputElement>) => {setHCondition(e.target.value)}}/>
            <button onClick={() => {}}>Add branch</button>
        </div>
}