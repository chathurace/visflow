import React, { ChangeEvent } from "react";
import { HBlock } from "../blocks/HBlock";
import { HSequence } from "../blocks/HSequence";
import { HCanvas } from "../components/HCanvas";
import { HNode } from "./HNode";
import { HLoopBlock } from "../blocks/HLoopBlock";

export class HLoopStart extends HNode {

    constructor(block: HBlock, canvas: HCanvas) {
        super(block, canvas);
        this.multiInput = true;
        this.label = "Loop";
    }

    addConditionalSeq(condition: string = "") {
        console.log("Add new conditional path");
        if (this.block instanceof HLoopBlock) {
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
            <HLoopPropertiesView loopStartNode={this}/>
        </div>
    }
}

interface HLoopStartPropertiesViewP {
    loopStartNode: HLoopStart;
}

export const HLoopPropertiesView: React.FC<HLoopStartPropertiesViewP> = ({loopStartNode}) => {

    const [branchMode, setBranchMode] = React.useState<boolean>(false);
    const [hcondition, setHCondition] = React.useState<string>("");

    return <div>
            <p>Loop props</p>
        </div>
};
