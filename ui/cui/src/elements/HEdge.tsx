import { edgeHeight, nodeHeight } from "../Constants";
import { HCanvas } from "../components/HCanvas";
import { HElement } from "./HElement";
import { HExpander } from "./HExpander";
import { HNode } from "./HNode";

export class HEdge extends HElement {
    _source: HNode|null = null;
    _target: HNode|null = null;

    private _x1: number = -1;
    private _y1: number = -1;
    private _x2: number = -1;
    private _y2: number = -1;

    v: number = 100;
    _expander: HExpander;

    constructor(canvas: HCanvas) {
        super(canvas);
        this._expander = new HExpander();
        this._expander.edge = this;
    }

    get source(): HNode|null {
        return this._source;
    }

    set source(node: HNode|null) {
        this._source = node;
        if (node == null) {
            return;
        }
        this.x1 = node.midX;
        this.y1 = node.bottom;

        if (node.multiOutput) {
            node.outEdges.push(this);
        } else {
            node.outEdges[0] = this;
        }
    }

    get target(): HNode|null {
        return this._target;
    }

    set target(node: HNode|null) {
        this._target = node;
        if (node == null) {
            return;
        }
        this.x2 = node.midX;
        this.y2 = node.y;

        if (node.multiInput) {
            node.inEdges.push(this);
        } else {
            node.inEdges[0] = this;
        }
    }

    get x1(): number {
        return this._x1;
    }

    set x1(value: number) {
        this._x1 = value;
        this._expander.midX = (this.x1 + this.x2) / 2;
    }

    get y1(): number {
        return this._y1;
    }

    set y1(value: number) {
        this._y1 = value;
        this._expander.midY = (this.y1 + this.y2) / 2;
    }

    get x2(): number {
        return this._x2;
    }

    set x2(value: number) {
        this._x2 = value;
        this._expander.midX = (this.x1 + this.x2) / 2;
    }

    get y2(): number {
        return this._y2;
    }

    set y2(value: number) {
        this._y2 = value;
        this._expander.midY = (this.y1 + this.y2) / 2;
    }

    pushDown(distance: number): void {
        this.y1 += distance;
        this.y2 += distance;

        if (this.target != null) {
            this.target.pushDown(distance);
        }
    }

    draw(): JSX.Element {
        return <>
            <line x1={this.x1} y1={this.y1} x2={this.x2} y2={this.y2} stroke="black" strokeWidth="2" />
            {this._expander.draw()}
            </>;
    }

    connect(node1: HNode, node2: HNode) {
        this.source = node1;
        this.target = node2;

        if (!node1.outEdges.includes(this))
            node1.outEdges.push(this);

        if (!node2.inEdges.includes(this))
            node2.inEdges.push(this);
    }

    // Change the target of this edge to the given node.
    // If this edge already has a target, the new node is placed between the source and the old target.
    // Vertical position of the new node is adjusted according to the source position.
    connectTo(node: HNode) {
        if (this.source == null) {
            return;
        }
        node.y = this.source.bottom + edgeHeight;
        let oldTarget = this.target;
        this.connect(this.source, node);
        if (oldTarget != null) {
            oldTarget.inEdges.splice(oldTarget.inEdges.indexOf(this), 1);
            oldTarget.pushDown(nodeHeight + edgeHeight)
            let edge2 = new HEdge(this.canvas);
            edge2.source = node;
            edge2.connectTo(oldTarget);
        }
    }


}