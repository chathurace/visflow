import { edgeHeight, nodeHeight, nodeWidth, vGap } from "../Constants";
import { HBlock } from "../blocks/HBlock";
import { HCanvas } from "../components/HCanvas";
import { HEdge } from "./HEdge";
import { HElement } from "./HElement";

export abstract class HNode extends HElement {
    _label: string = "";

    multiInput: boolean = false;
    multiOutput: boolean = false;
    inEdges: HEdge[] = [];
    outEdges: HEdge[] = [];

    constructor(block: HBlock, canvas: HCanvas) {
        super(block, canvas);
        this.block.nodes.push(this);
        this.width = nodeWidth;
        this.height = nodeHeight;
    }

    get label(): string {
        return this._label;
    }

    set label(label: string) {
        this._label = label;
    }

    set x(x: number) {
        super.x = x;
        this.inEdges.forEach(edge => {
            edge.x2 = this.midX;
        });
        this.outEdges.forEach(edge => {
            edge.x1 = this.midX;
        });
    }

    get x(): number {
        return super.x;
    }

    set y(y: number) {
        console.log("setting y " + y + " " + this.label);
        super.y = y;
        this.inEdges.forEach(edge => {
            edge.y2 = this.midY;
        });
        this.outEdges.forEach(edge => {
            edge.y1 = this.midY;
        });
    }

    get y(): number {
        return super.y;
    }

    pushDown(distance: number): void {
        console.log("pushing down " + distance + " " + this.label);
        if (this.block.startNode === this) {
            // we are entering a new block. just push the block down.
            this.block.pushDown(distance);
        } else {
            this.y += distance;
            if (this.block.endNode === this) {
                if (this.bottom > this.block.bottom) {
                    this.block.vExpand(distance);
                }
            } else {
                for (const edge of this.outEdges) {
                    edge.pushDown(distance);
                }
            }
        }
    }

    connectTo(edge: HEdge): void {
        if (edge.source == null || edge.target == null) {
            throw new Error("Edge not initialized");
        }

        let oldTarget = edge.target;
        this.x = oldTarget.x;
        this.y = edge.source.bottom + vGap;
        edge.target = this;
        if (oldTarget.y < this.bottom + vGap) {
            let pushDownAmount = this.bottom + vGap - oldTarget.y;
            oldTarget.pushDown(pushDownAmount);
        }

        let newOutEdge = new HEdge(this.block, edge.canvas);
        newOutEdge.connect(this, oldTarget);
    }
}