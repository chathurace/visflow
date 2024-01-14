import { HBlock } from "../blocks/HBlock";
import { HCanvas } from "../components/HCanvas";
import { HElement } from "./HElement";

export class HLine extends HElement {
    private _x1: number = -1;
    private _y1: number = -1;
    private _x2: number = -1;
    private _y2: number = -1;

    constructor(block: HBlock, canvas: HCanvas) {
        super(block, canvas);
    }

    get x1(): number {
        return this._x1;
    }

    set x1(x: number) {
        this._x1 = x;
    }

    get y1(): number {
        return this._y1;
    }

    set y1(y: number) {
        this._y1 = y;
    }

    get x2(): number {
        return this._x2;
    }

    set x2(x: number) {
        this._x2 = x;
    }

    get y2(): number {
        return this._y2;
    }

    set y2(y: number) {
        this._y2 = y;
    }

    draw(): JSX.Element {
        return <>
            <line x1={this.x1} y1={this.y1} x2={this.x2} y2={this.y2} stroke="black" strokeWidth="2" />
            </>;
    }
    
    pushDown(distance: number): void {
        throw new Error("Method not implemented.");
    }
}