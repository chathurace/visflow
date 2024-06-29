import { BField } from "./BField";

export class BLink {
    lhs: BField;
    rhs: BField;

    constructor(lhs: BField, rhs: BField) {
        this.lhs = lhs;
        this.rhs = rhs;
    }

    draw(): JSX.Element {
        let lhsPoint = this.lhs.getConnectionPoint();
        let rhsPoint = this.rhs.getConnectionPoint();
        return <line x1={lhsPoint[0]} y1={lhsPoint[1]} x2={rhsPoint[0]} y2={rhsPoint[1]} stroke="grey" strokeWidth="3" />;
    }
}