import { edgeHeight, nodeWidth } from "../Constants";
import { HCanvas } from "../components/HCanvas";
import { HEdge } from "../elements/HEdge";
import { HIfEnd } from "../elements/HIfEnd";
import { HIfStart } from "../elements/HIfStart";
import { HBlock } from "./HBlock";

export class HIfBlock extends HBlock {
    init(edge: HEdge): void {
        let canvas = edge.canvas;
        this.startNode = new HIfStart(canvas);
        this.startNode.midX = this.midX;
        this.startNode.y = this.y;

        this.endNode = new HIfEnd(canvas);
        this.endNode.midX = this.midX;
        this.endNode.y = this.startNode.bottom + edgeHeight;
        this.height = this.endNode.bottom - this.y;

        let truePath = new HEdge(canvas);
        truePath.connect(this.startNode, this.endNode);

        this.height = this.endNode.bottom - this.y;
        this.width = nodeWidth;
    }
}

export const addIfBlock = (edge: HEdge) => {
    let ifBlock = new HIfBlock();
    ifBlock.connectTo(edge);
    edge.canvas.setSelectedEdge(null);
    edge.canvas.render();
}