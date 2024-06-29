import { BMode } from "../components/MapView";
import { VMapping } from "../context/VMapping";
import { BLink } from "./BLink";

export enum SelectionStatus {
    NONE,
    LINKING,
    SELECTED,
    LINKED
}

export class BField {
    path: string = "";
    name: string;
    typeName: string;
    array: boolean = false;
    fill: string = "lightgrey";
    vmapping: VMapping;
    selectionStatus: SelectionStatus = SelectionStatus.NONE;
    protected input: boolean;
    connectionPoint: [number, number] = [0, 0];
    divX: number = 0;
    divY: number = 0;
    scrollTop: number = 0;

    constructor(vmapping: VMapping, name: string, typeName: string, parentPath: string, input: boolean, array: boolean = false) {
        this.path = parentPath + "." + name;
        this.vmapping = vmapping;
        this.name = name;
        this.typeName = typeName;
        this.array = array;
        this.input = input;
    }

    setLhsNode(lhsNode: boolean) {
        this.input = lhsNode;
    }

    getLhsNode(): boolean {
        return this.input;
    }

    getConnectionPoint(): [number, number] {
        return this.connectionPoint;
    }

    getFill(): string {
        switch (this.selectionStatus) {
            case SelectionStatus.NONE:
                return "white";
            case SelectionStatus.LINKING:
                return "black";
            case SelectionStatus.SELECTED:
                return "blue";
            case SelectionStatus.LINKED:
                return "grey";
        }
    }
}

export const onBFieldClick = (field: BField) => {
    console.log("Field clicked " + field.name);
    if (field.vmapping !== null) {
        if (field.getLhsNode()) {
            field.selectionStatus = SelectionStatus.LINKING;
            if (field.vmapping.currentLhsNode !== null) {
                field.vmapping.currentLhsNode.selectionStatus = SelectionStatus.NONE;
            }
            field.vmapping.currentLhsNode = field;
            field.vmapping.bMode = BMode.LINKING;
            field.vmapping.render();
        } else {
            if (field.vmapping.currentLhsNode === null) {
                console.log("No lhs node selected");
                return;
            }
            let blink = new BLink(field.vmapping.currentLhsNode, field);
            field.selectionStatus = SelectionStatus.LINKED;
            field.vmapping.currentLhsNode.selectionStatus = SelectionStatus.LINKED;
            field.vmapping.currentLhsNode = null;
            field.vmapping.bLinks.push(blink);
            field.vmapping.bMode = BMode.NONE;
            field.vmapping.render();
        }
    }
}

export class BTypeField extends BField {

    constructor(vmapping: VMapping, name: string, typeName: string, parentPath: string, lhsNode: boolean, array: boolean = false) {
        super(vmapping, name, typeName, parentPath, lhsNode, array);
    }

    draw(startX: number, startY: number, ox1: number, ox2: number): [JSX.Element, number, number] {
        return [<></>, 0, 0];
    }
}