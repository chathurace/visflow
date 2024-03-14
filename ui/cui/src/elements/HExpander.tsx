import { HIfBlock } from "../blocks/HIfBlock";
import { getPallet } from "../components/HPallet";
import { HEdge } from "./HEdge";
import { HTask } from "./HTask";

export class HExpander {
    edge: HEdge|null = null;

    _label: string = "+";
    _x: number = -1;
    _midX: number = -1;
    _y: number = -1;
    _midY: number = -1;
    _width: number = 15;
    _height: number = 15;
    visible: boolean = true;

    constructor(visible: boolean = true) {
        this.visible = visible;
    }

    get label(): string {
        return this._label;
    }

    set label(label: string) {
        this._label = label;
    }

    get x(): number {
        return this._x;
    }

    set x(x: number) {
        this._x = x;
        this._midX = x + this._width / 2;
    }

    get midX(): number {
        return this._midX;
    }

    set midX(midX: number) {
        this._midX = midX;
        this._x = midX - this._width / 2;
    }

    get y(): number {
        return this._y;
    }

    get bottom(): number {
        return this._y + this._height;
    }

    set y(y: number) {
        this._y = y;
        this._midY = y + this._height / 2;
    }

    get midY(): number {
        return this._midY;
    }

    set midY(midY: number) {
        this._midY = midY;
        this._y = midY - this._height / 2;
    }

    get width(): number {
        return this._width;
    }

    set width(width: number) {
        this._width = width;
        this._midX = this._x + width / 2;
    }

    get height(): number {
        return this._height;
    }

    set height(height: number) {
        this._height = height;
    }

    testAdd2() {
        if (this.edge == null) {
            return;
        }
        this.edge.canvas.setSelectedNode(null);
        this.edge.canvas.setSelectedEdge(this.edge);

        // console.log("testAdd2");
        // let pallet_div = document.getElementById("pallet_div");
        // if (pallet_div == null || this.edge == null) {
        //     return;
        // }
        // pallet_div.style.visibility = "visible";
        // pallet_div.innerHTML = getPallet(this.edge).toString();

        // if (this.edge == null) {
        //     return;
        // }
        // let ifBlock = new HIfBlock(this.edge.x2, this.edge.y2);
        // ifBlock.init(this.edge.canvas);
        // ifBlock.connectTo(this.edge);
        // this.edge.canvas.render();
    }

    draw(): JSX.Element {
        if (!this.visible) {
            return <></>;
        }
        
        return <>
            <rect x={this.x} y={this.y} rx="3" ry="3" width={this.width} height={this.height} fill="lightgrey" stroke="grey" strokeWidth="1" onClick={() => this.testAdd2()}/>
            {/* <text x={this.midX} y={this.midY} dominantBaseline="middle" textAnchor="middle" fill="black" onClick={() => this.testAdd()}>{this.label}</text> */}
            </>;
    }
}