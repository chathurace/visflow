import { nodeHeight } from "../Constants";
import { HRect } from "../HRect";
import { HEdge } from "../elements/HEdge";
import { HNode } from "../elements/HNode";

export abstract class HBlock extends HRect {
    startNode: HNode|null = null;
    endNode: HNode|null = null;
    nodes: HNode[] = [];
    childBlocks: HBlock[] = [];

    constructor(midX: number, y: number) {
        super();
        this.midX = midX;
        this.y = y;
    }

    connectTo(edge: HEdge): void {
        if (this.startNode == null || this.endNode == null) {
            throw new Error("Block not initialized");
        }

        if (edge.source == null || edge.target == null) {
            throw new Error("Edge not initialized");
        }

        let oldTarget = edge.target;
        edge.target = this.startNode;
        oldTarget.pushDown(this.height + nodeHeight);

        let newOutEdge = new HEdge(edge.canvas);
        newOutEdge.source = this.endNode;
        newOutEdge.target = oldTarget;
    }
}