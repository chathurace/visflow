import { HSeqStart } from "../elements/HSeqStart";
import { HEdge } from "../elements/HEdge";
import { HBlock } from "./HBlock";
import { HCanvas } from "../components/HCanvas";
import { HSeqEnd } from "../elements/HSeqEnd";
import { edgeHeight, vGap } from "../Constants";

export class HSequence extends HBlock {

    condition: string|null = null;

    constructor(parent: HBlock|null, condition: string|null = null) {
        super(parent);
        this.condition = condition;
    }

    getType(): string {
        return "sequence";
    }

    init(canvas: HCanvas): void {
        this.x = 0;
        this.y = 0;
        this.startNode = new HSeqStart(this, canvas, this.condition);
        this.startNode.x = this.x;
        this.startNode.y = this.y;

        this.endNode = new HSeqEnd(this, canvas, this.condition);
        this.endNode.x = this.x;
        this.endNode.y = this.startNode.bottom + vGap;

        let edge = new HEdge(this, canvas);
        edge.connect(this.startNode, this.endNode);
        this._height = this.endNode.bottom - this.startNode.y;
    }

    onChildVExpand(child: HBlock, hdiff: number): void {
        this.height += hdiff;      
    }

    onChildVShrink(child: HBlock, hdiff: number): void {
        this.height -= hdiff;
    }

    onChildHExpand(child: HBlock, hdiff: number): void {
        let maxChildWidth = 0;
        this.childBlocks.forEach(child => {
            if (child.width > maxChildWidth) {
                maxChildWidth = child.width;
            }
        });
        let diff = maxChildWidth - this.width;    
        this.width = maxChildWidth;
        this.parentBlock?.onChildHExpand(this, diff);
    }

    serialize(): string {
        return "a";
    }
}
