import React from "react";
import { nodeHeight, nodeWidth } from "../Constants";
import { HEdge } from "../elements/HEdge";
import { addIfBlock } from "../blocks/HIfBlock";
import { addTask } from "../elements/HTask";
import { HNode } from "../elements/HNode";

interface HNodePropertiesProps {
    selectedNode: HNode;
}

export const HNodeProperties: React.FC<HNodePropertiesProps> = ({selectedNode}) => {
    return (
        <div id='hnodeprops_div' className="HNodeProps">
            <>
                {selectedNode.getPropertiesView()}
            </>
            <div>
                <button onClick={() => selectedNode.delete()}>Delete</button>
            </div>

        </div>);
};

export const getPallet = (edge: HEdge): JSX.Element => {
    return (
        <>
            
        </>);
};

