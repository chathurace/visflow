import { hGap, nodeWidth, vGap } from "../Constants";
import { HCanvas } from "../components/HCanvas";
import { HEdge } from "../elements/HEdge";
import { HIfEnd } from "../elements/HIfEnd";
import { HIfStart } from "../elements/HIfStart";
import { HBlock } from "./HBlock";
import { HSequence } from "./HSequence";

export class HIfBlock extends HBlock {

    paths: HSequence[] = [];

    init(canvas: HCanvas): void {
        this.x = 0;
        this.y = 0;
        this.width = nodeWidth;
        this.height = nodeWidth;

        this.startNode = new HIfStart(this, canvas);
        this.startNode.midX = this._midX;
        this.startNode.y = this._y;

        this.endNode = new HIfEnd(this, canvas);
        this.endNode.midX = this._midX;
        this.endNode.y = this.startNode.bottom + vGap;
        this.height = this.endNode.bottom - this._y;

        let defaultPath = new HSequence(this);
        defaultPath.init(canvas);
        this.connect(defaultPath, true);

        // let truePath = new HEdge(this, canvas);
        // truePath.connect(this.startNode, this.endNode);

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
        this.canvas.render();
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
        path.x = defaultPath? this.x : this.x + this.width + hGap;
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
            if (path !== child) {
                path.height += hdiff;
            }
        });
        if (maxPathHeight > this.height) {
            this.height = maxPathHeight;
            if (this.endNode != null) {
                this.endNode.outEdges.forEach(edge => {
                    edge.pushDown(hdiff);
                });
            }
            this.parentBlock?.onChildVExpand(this, hdiff);
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

export const addIfBlock = (edge: HEdge) => {
    let ifBlock = new HIfBlock(edge.block);
    ifBlock.connectTo(edge);
    edge.canvas.setSelectedEdge(null);
    edge.canvas.render();
}