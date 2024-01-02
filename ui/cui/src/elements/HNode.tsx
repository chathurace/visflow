import { edgeHeight, nodeHeight, nodeWidth } from "../Constants";
import { HCanvas } from "../components/HCanvas";
import { HEdge } from "./HEdge";
import { HElement } from "./HElement";

export abstract class HNode extends HElement {
    _label: string = "";

    multiInput: boolean = false;
    multiOutput: boolean = false;
    inEdges: HEdge[] = [];
    outEdges: HEdge[] = [];

    constructor(canvas: HCanvas) {
        super(canvas);
        this.width = nodeWidth;
        this.height = nodeHeight;
    }

    get label(): string {
        return this._label;
    }

    set label(label: string) {
        this._label = label;
    }

    pushDown(distance: number): void {
        this.y += distance;
        for (const edge of this.outEdges) {
            edge.pushDown(distance);
        }
    }

    connectTo(edge: HEdge): void {
        if (edge.source == null || edge.target == null) {
            throw new Error("Edge not initialized");
        }

        let oldTarget = edge.target;
        this.x = oldTarget.x;
        this.y = oldTarget.y;
        edge.target = this;
        oldTarget.pushDown(this.height + nodeHeight);

        let newOutEdge = new HEdge(edge.canvas);
        newOutEdge.source = this;
        newOutEdge.target = oldTarget;
    }

    connectTo2(edge: HEdge): void {
        if (edge.source == null || edge.target == null) {
            throw new Error("Edge not initialized");
        }

        let oldTarget = edge.target;
        edge.target = this;

        let newOutEdge = new HEdge(this.canvas);
        edge.target = oldTarget;
        newOutEdge.source = this;
        newOutEdge.target = oldTarget;

        newOutEdge.y2 = newOutEdge.y1 + edgeHeight;
        oldTarget.pushDown(edgeHeight + nodeHeight);
    }
}