import { HRect } from "../HRect";
import { HCanvas } from "../components/HCanvas";

export abstract class HElement extends HRect {
    canvas: HCanvas;

    constructor(canvas: HCanvas) {
        super();
        this.canvas = canvas;
        canvas.elements.push(this);
    }

    abstract draw(): JSX.Element;

    abstract pushDown(distance: number): void;
}