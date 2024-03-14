import { blockPadding, hGap, nodeWidth, vGap } from "../Constants";
import { HCanvas } from "../components/HCanvas";
import { HEdge } from "../elements/HEdge";
import { HLoopEnd } from "../elements/HLoopEnd";
import { HLoopStart } from "../elements/HLoopStart";
import { HBlock } from "./HBlock";
import { HSequence } from "./HSequence";

export class HLoopBlock extends HBlock {

    paths: HSequence[] = [];

    constructor(parentBlock: HBlock | null) {
        super(parentBlock);
        if (parentBlock != null) {
            parentBlock.padding += blockPadding;
        }
    }

    getType(): string {
        return "loop";
    }

    init(canvas: HCanvas): void {
        this.x = 0;
        this.y = 0;
        this.width = nodeWidth;
        this.height = nodeWidth;

        this.startNode = new HLoopStart(this, canvas);
        this.startNode.midX = this._midX;
        this.startNode.y = this._y;

        this.endNode = new HLoopEnd(this, canvas);
        this.endNode.midX = this._midX;
        this.endNode.y = this.startNode.bottom + vGap;
        this.height = this.endNode.bottom - this._y;

        let defaultPath = new HSequence(this);
        defaultPath.init(canvas);
        this.connect(defaultPath, true);

        this.height = this.endNode.bottom - this.startNode.y;
        this.width = nodeWidth;
    }

    addPath(condition: string) {
        if (this.canvas == null) {
            throw new Error("If block not initialized");
        }
        let path = new HSequence(this, condition);
        path.init(this.canvas)
        this.connect(path);
        this.canvas.render(null);
    }

    connect(path: HSequence, defaultPath: boolean = false) {
        if (this.canvas == null || this.startNode == null || this.endNode == null) {
            throw new Error("If block not initialized");
        }
        if (path.startNode == null || path.endNode == null) {
            throw new Error("Path not initialized");
        }
        path.y = this.y;
        path.height = this.height;
        this.paths.push(path);
        path.x = defaultPath ? this.x : this.x + this.width + hGap;
        let oldWidth = this.width;
        this.width = path.x + path.width - this.x;
        let inEdge = new HEdge(this, this.canvas);
        inEdge.connect(this.startNode, path.startNode);
        let outEdge = new HEdge(this, this.canvas);
        outEdge.connect(path.endNode, this.endNode);
        if (!defaultPath) {
            this.parentBlock?.onChildHExpand(this, this.width - oldWidth);
        }
    }

    onChildVExpand(child: HBlock, hdiff: number): void {
        // TODO: child has vexpanded means it's the path with max height.
        let maxPathHeight = 0;
        this.paths.forEach(path => {
            maxPathHeight = Math.max(maxPathHeight, path.height);
        });

        this.paths.forEach(path => {
            path.height = maxPathHeight;
        });

        if (maxPathHeight > this.height) {
            this.height = maxPathHeight;
            if (this.endNode != null) {
                this.endNode.outEdges.forEach(edge => {
                    edge.pushDown(hdiff);
                });
            }
        }
    }

    onChildVShrink(child: HBlock, hdiff: number): void {
        let maxChildHeight = 0;
        this.paths.forEach(path => {
            maxChildHeight = Math.max(maxChildHeight, path.minHeight);
        });

        if (maxChildHeight < this.height) {
            this.paths.forEach(path => {
                path.height = maxChildHeight;
            });
            let effectiveHDiff = this.height - maxChildHeight;
            this.height = maxChildHeight;
            if (this.endNode != null) {
                this.endNode.outEdges.forEach(edge => {
                    edge.pullup(effectiveHDiff);
                });
            }
            this.parentBlock?.onChildVShrink(this, hdiff);
        } else {
            child.height = this.height;
        }
    }

    onChildHExpand(child: HBlock, hdiff: number): void {
        this.childBlocks.forEach(block => {
            if (block.x > child.x) {
                block.x += hdiff;
            }
        });
        this.width += hdiff;
        this.parentBlock?.onChildHExpand(this, hdiff);
    }
}

export const addLoopBlock = (edge: HEdge) => {
    let loopBlock = new HLoopBlock(edge.block);
    loopBlock.connectTo(edge);
    edge.canvas.blocks.push(loopBlock);
    edge.canvas.setSelectedEdge(null);
    edge.canvas.render(null);
}