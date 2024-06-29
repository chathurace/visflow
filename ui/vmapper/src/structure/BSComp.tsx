import { BMode } from "../components/MapView";
import { VMapping } from "../context/VMapping";

export class BSComp {
    vmapping: VMapping;
    x: number;
    y: number;
    height: number = 0;
    width: number = 0;
    dragDiffX: number = 0;
    dragDiffY: number = 0;
    name: string;

    constructor(vmapping: VMapping, x: number, y: number, name: string = "") {
        this.vmapping = vmapping;
        this.x = x;
        this.y = y;
        this.name = name;
    }

    draw(): [JSX.Element, number] {
        return [<></>, 0];
    }
}

export const compMouseDown = (e: any, bcomp: BSComp) => {
    if (bcomp.vmapping.bMode !== BMode.NONE) {
        return;
    }
    e.preventDefault();
    bcomp.vmapping.bMode = BMode.DRAGGING;
    bcomp.dragDiffX = e.clientX - bcomp.x;
    bcomp.dragDiffY = e.clientY - bcomp.y;
    bcomp.vmapping.draggingComponent = bcomp;
}

export const compMouseUp = (e: any, bcomp: BSComp) => {
    if (bcomp.vmapping.bMode !== BMode.DRAGGING) {
        return;
    }
    if (bcomp.vmapping.draggingComponent !== null) {
        let bdcomp = bcomp.vmapping.draggingComponent;
        bdcomp.x = e.clientX - bdcomp.dragDiffX;
        bdcomp.y = e.clientY - bdcomp.dragDiffY;
        bcomp.vmapping.draggingComponent = null;
        bcomp.vmapping.bMode = BMode.NONE;
        bdcomp.vmapping.render();
    }
}