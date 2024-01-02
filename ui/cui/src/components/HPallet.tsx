import React from "react";
import { nodeHeight, nodeWidth } from "../Constants";
import { HEdge } from "../elements/HEdge";
import { addIfBlock } from "../blocks/HIfBlock";
import { addTask } from "../elements/HTask";

interface HPalletProps {
    selectedEdge: HEdge;
}

export const HPalletView: React.FC<HPalletProps> = ({selectedEdge}) => {
    return (
        <div id='pallet_div' className="HPallet">
            <div className="pallet_item">
                <svg width={nodeWidth} height={nodeHeight} style={{ position: 'relative', top: 0, left: 0 }}>
                <rect x="0" y="0" rx="15" ry="15" width={nodeWidth} height={nodeHeight} fill="lightblue" stroke="white" strokeWidth="1" onClick={() => {addTask(selectedEdge)}} />
                <text x={nodeWidth/2} y={nodeHeight/2} dominantBaseline="middle" textAnchor="middle" fill="black">Log</text>
                </svg>
            </div>
            <div className="pallet_item">
                <svg width={nodeWidth} height={nodeHeight} style={{ position: 'relative', top: 0, left: 0 }}>
                <rect x="0" y="0" rx="15" ry="15" width={nodeWidth} height={nodeHeight} fill="lightblue" stroke="white" strokeWidth="1" onClick={() => {console.log("Log task")}} />
                <text x={nodeWidth/2} y={nodeHeight/2} dominantBaseline="middle" textAnchor="middle" fill="black">Call</text>
                </svg>
            </div>
            <div className="pallet_item">
                <svg width={nodeWidth} height={nodeHeight} style={{ position: 'relative', top: 0, left: 0 }}>
                <rect x="0" y="0" rx="15" ry="15" width={nodeWidth} height={nodeHeight} fill="lightblue" stroke="white" strokeWidth="1" onClick={() => {addIfBlock(selectedEdge)}} />
                <text x={nodeWidth/2} y={nodeHeight/2} dominantBaseline="middle" textAnchor="middle" fill="black">IF</text>
                </svg>
            </div>
        </div>);
};

export const getPallet = (edge: HEdge): JSX.Element => {
    return (
        <>
            
        </>);
};

