import React from "react";
import { HElement } from "../elements/HElement";
import { HEdge } from "../elements/HEdge";
import { edgeHeight } from "../Constants";
import { HTask } from "../elements/HTask";

export const HCanvasView: React.FC = () => {

    const [hCanvas, setHCanvas] = React.useState<HCanvas|null>(null);
    const [diagram, setDiagram] = React.useState<JSX.Element|null>(null);

    if (hCanvas === null) {
        let hCanvas = new HCanvas(setDiagram);
        hCanvas.init();
        setHCanvas(hCanvas);
        setDiagram(hCanvas.drawDiagram());
    }

    return (
        <div>
            {diagram}
            {/* <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
            {hCanvas?.elements.map((element, i) => (
                <>
                    {element.draw()}
                </>
            ))}
            </svg> */}
        </div>
    );
};

export class HCanvas {
    setDiagram: React.Dispatch<React.SetStateAction<JSX.Element|null>>;
    elements: HElement[] = [];

    constructor(setDiagram: React.Dispatch<React.SetStateAction<JSX.Element|null>>) {
        this.setDiagram = setDiagram;
    }

    init() {
        let startTask = new HTask(this);
        startTask.label = "Start";
        startTask.x = 100;
        startTask.y = 50;

        let endTask = new HTask(this);
        endTask.label = "End";
        endTask.x = 100;
        endTask.y = startTask.bottom + edgeHeight;

        let startEdge = new HEdge(this);
        startEdge.connect(startTask, endTask);
    }

    render() {
        this.setDiagram(this.drawDiagram());
    }

    drawDiagram(): JSX.Element {
        return <>
            <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
            {this.elements.map((element, i) => (
                <>
                    {element.draw()}
                </>
            ))}
            </svg>
        </>;
    }
}