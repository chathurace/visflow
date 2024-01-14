import { HRect } from "../HRect";
import { HBlock } from "../blocks/HBlock";
import { HCanvas } from "../components/HCanvas";

export abstract class HElement extends HRect {
    canvas: HCanvas;
    block: HBlock;

    constructor(block: HBlock, canvas: HCanvas) {
        super();
        this.block = block;
        this.canvas = canvas;
        canvas.addElement(this);
    }

    abstract draw(): JSX.Element;

    abstract pushDown(distance: number): void;
}