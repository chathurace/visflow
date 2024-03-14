import { blockPadding, edgeHeight, nodeHeight, nodeWidth, vGap } from "../Constants";
import { HRect } from "../HRect";
import { HCanvas } from "../components/HCanvas";
import { HEdge } from "../elements/HEdge";
import { HNode } from "../elements/HNode";
import { v4 as uuid } from 'uuid';

export abstract class HBlock extends HRect {
    id: string = uuid();
    startNode: HNode | null = null;
    endNode: HNode | null = null;
    nodes: HNode[] = [];
    childBlocks: HBlock[] = [];
    canvas: HCanvas | null = null;
    parentBlock: HBlock | null = null;
    border: HRect = new HRect();

    _padding: number = blockPadding;

    abstract init(canvas: HCanvas): void;

    abstract getType(): string;

    constructor(parentBlock: HBlock | null) {
        super();
        this.width = nodeWidth;
        this.height = nodeHeight;
        this.parentBlock = parentBlock;
        if (parentBlock != null) {
            parentBlock.childBlocks.push(this);
        }
    }

    connectTo(edge: HEdge): void {
        if (this.parentBlock == null) {
            throw new Error("Block not initialized. Parent block not set.");
        }

        this.canvas = edge.canvas;
        if (edge.source == null || edge.target == null) {
            throw new Error("Edge not initialized");
        }
        let oldTarget = edge.target;
        this.init(this.canvas);
        if (this.startNode == null || this.endNode == null) {
            throw new Error("Block not initialized");
        }
        this._height = this.endNode.bottom - this.startNode.y;
        this.midX = oldTarget.midX;
        this.y = edge.source.bottom + vGap;
        if (this.startNode == null || this.endNode == null) {
            throw new Error("Block not initialized");
        }
        edge.target = this.startNode;
        if (oldTarget.y < this.bottom + vGap) {
            let pushDownAmount = this.bottom + vGap - oldTarget.y;
            oldTarget.pushDown(pushDownAmount);
        }
        let newOutEdge = new HEdge(this.parentBlock, edge.canvas);
        newOutEdge.source = this.endNode;
        newOutEdge.target = oldTarget;
        this.adjustBorder();
    }

    set x(x: number) {
        let xdiff = x - this._x;
        this._x = x;
        this._midX = x + this._width / 2;
        this.nodes.forEach(node => {
            node.x = node._x + xdiff;
        });
        this.childBlocks.forEach(block => {
            block.x += xdiff;
        });
    }

    get x(): number {
        return super.x;
    }

    set midX(midX: number) {
        this.x = midX - this.width / 2;
    }

    get midX(): number {
        return super.midX;
    }

    set midY(midY: number) {
        this.y = midY - this.height / 2;
    }

    get midY(): number {
        return super.midY;
    }

    set y(y: number) {
        let ydiff = y - this._y;
        console.log("ydiff " + ydiff + " y " + y + " this._y " + this._y);
        this._y = y;
        console.log("this.nodes.length " + this.nodes.length);
        this.nodes.forEach(node => {
            console.log("node.y " + node.y + " ydiff " + ydiff);
            node.y = node._y + ydiff;
        });
        this.childBlocks.forEach(block => {
            block.y += ydiff;
        });
    }

    get y(): number {
        return super.y;
    }

    get padding(): number {
        return this._padding;
    }

    set padding(padding: number) {
        this._padding = padding;
        if (this.parentBlock != null) {
            this.parentBlock.padding += blockPadding;
        }
    }

    pushDown(distance: number): void {
        this.y += distance;
        if (this.endNode != null) {
            this.endNode.outEdges.forEach(edge => {
                edge.pushDown(distance);
            });
        }
    }

    pullup(distance: number): void {
        this.y -= distance;
        if (this.endNode != null) {
            this.endNode.outEdges.forEach(edge => {
                edge.pullup(distance);
            });
        }
    }

    adjustBorder(): void {
        this.border.x = this.x - this.padding;
        this.border.y = this.y - blockPadding;
        this.border.width = this.width + 2 * this.padding;
        this.border.height = this.height + 2 * blockPadding;
    }

    get height(): number {
        return super.height;
    }

    set height(height: number) {
        let hdiff = height - this._height;
        if (hdiff === 0) {
            return;
        }
        super.height = height;
        if (this.endNode != null) {
            // if (this.endNode.bottom < this.bottom) {
                this.endNode.y = this.bottom - this.endNode.height;
            // }
        }
    }

    get minHeight(): number {
        let lastEdge = this.endNode?.inEdges[0];
        if (lastEdge == null) {
            throw new Error("Block not initialized. Last edge not found.");
        }
        // Last edge height smaller than edgeHeight means the last edge is not valid 
        // (e.g. could be in a middle of an adjustement)
        let lastEdgeHeight = lastEdge.height > edgeHeight ? lastEdge.height : edgeHeight;
        return this.height - (lastEdge.height - edgeHeight);
    }

    vExpand(vdiff: number): void {
        this.height += vdiff;
        this.parentBlock?.onChildVExpand(this, vdiff);
    }

    vShrink(vdiff: number): void {
        this.height -= vdiff;
        this.parentBlock?.onChildVShrink(this, vdiff);
    }

    draw(selectedBlock: HBlock | null = null): JSX.Element {
        let selected = this === selectedBlock;
        this.adjustBorder();
        return (
            <g>
                {/* <rect x={this.x - blockPadding} y={this.y - blockPadding} width={this.width + 2 * blockPadding} height={this.height + 2 * blockPadding} fill={selected ? "lightblue" : "white"} stroke="grey" /> */}
                <rect x={this.border.x} y={this.border.y} width={this.border.width} height={this.border.height} fill={selected ? "lightblue" : "white"} stroke="grey" />
            </g>
        );
    }

    abstract onChildVExpand(child: HBlock, hdiff: number): void

    abstract onChildVShrink(child: HBlock, hdiff: number): void

    abstract onChildHExpand(child: HBlock, hdiff: number): void
}