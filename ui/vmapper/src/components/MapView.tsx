import React, { MouseEvent } from "react";
import { BIterator } from "../structure/BIterator";
import { JoinInput } from "./joinInput";
import { VMPallet } from "./vmPallet";
import { VMapping } from "../context/VMapping";

interface MapViewProps {
    fields: string[]
}


export enum BMode {
    NONE = "none",
    FUNCTION = "function",
    DATA = "data",
    ITERATOR = "iterator",
    LINKING = "linking",
    DRAGGING = "DRAGGING"
}

export const MapView: React.FC<MapViewProps> = ({ fields }) => {

    const [bMode, setBMode] = React.useState<BMode>(BMode.NONE);
    const [vmapping, setVmapping] = React.useState<VMapping | null>(null);
    const [diagram, setDiagram] = React.useState<JSX.Element | null>(null);
    const [sComponents, setSComponents] = React.useState<JSX.Element | null>(null);
    const [bIterator, setBIterator] = React.useState<BIterator | null>(null);
    const [newBIterator, setNewBIterator] = React.useState<BIterator | null>(null);

    if (vmapping === null) {
        let vmapping = new VMapping(setBMode, setSComponents, setDiagram, setBIterator);
        vmapping.init();
        setVmapping(vmapping);
    }
    
    if (vmapping === null) {
        return <></>
    }
    // vmapping.bMode = bMode;

    if (newBIterator !== null) {
        vmapping.biterators.push(newBIterator);    
    }
    
    return (
        <div className="MapView">
            <VMPallet setBMode={setBMode} />
            {bIterator && <JoinInput iteratorData={bIterator} />}
            <svg className="diagram" width="2000" height="5000" onClick={(e) => {canvasClick(e, bMode, vmapping)}} onMouseUp={(e) => {canvasMouseUp(e, bMode, vmapping)}}>
                {diagram}
            </svg>
            {sComponents && sComponents}
            <button onClick={() => { console.log("Adding function") }}>Add function</button>
        </div>
    );
}

const canvasClick = (e: MouseEvent<SVGSVGElement>, bMode: BMode, vmapping: VMapping) => {
    if (bMode === BMode.ITERATOR) {
        let bit = new BIterator(vmapping, "buildingAppMapping");
        bit.x = e.clientX;
        bit.y = e.clientY;
        bit.addOutput("costs", "Cost", true);
        vmapping.biterators.push(bit);
        vmapping.render();
    }
}

export const canvasMouseUp = (e: MouseEvent<SVGSVGElement>, bMode: BMode, vmapping: VMapping) => {
    e.preventDefault();
    if (vmapping.bMode !== BMode.DRAGGING) {
        return;
    }
    if (vmapping.draggingComponent !== null) {
        let bcomp = vmapping.draggingComponent;
        bcomp.x = e.clientX - bcomp.dragDiffX;
        bcomp.y = e.clientY - bcomp.dragDiffY;
        vmapping.draggingComponent = null;
        vmapping.bMode = BMode.NONE;
        bcomp.vmapping.render();
    }

    if (vmapping.draggingFunction !== null) {
        let bfunc = vmapping.draggingFunction;
        bfunc.x = e.clientX - bfunc.dragDiffX;
        bfunc.y = e.clientY - bfunc.dragDiffY;
        bfunc.vmapping.render();
    }
    if (vmapping.draggingRecord !== null) {
        let brecord = vmapping.draggingRecord;
        brecord.x = e.clientX - brecord.dragDiffX;
        brecord.y = e.clientY - brecord.dragDiffY;
        brecord.vmapping.render();
    }
    vmapping.draggingFunction = null;
    vmapping.draggingRecord = null;
}

