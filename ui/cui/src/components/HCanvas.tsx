import React from "react";
import { HElement } from "../elements/HElement";
import { HEdge } from "../elements/HEdge";
import { edgeHeight, vGap } from "../Constants";
import { HTask } from "../elements/HTask";
import { HSequence } from "../blocks/HSequence";
import { HNode } from "../elements/HNode";

interface HCanvasViewProps {
    selectedNode: HNode | null;
    setSelectedEdge: React.Dispatch<React.SetStateAction<HEdge | null>>;
    setSelectedNode: React.Dispatch<React.SetStateAction<HNode | null>>;
}

export const HCanvasView: React.FC<HCanvasViewProps> = ({ selectedNode, setSelectedEdge, setSelectedNode }) => {

    const [hCanvas, setHCanvas] = React.useState<HCanvas | null>(null);
    const [diagram, setDiagram] = React.useState<JSX.Element | null>(null);

    if (hCanvas === null) {
        let hCanvas = new HCanvas(setDiagram, setSelectedEdge, setSelectedNode);
        hCanvas.init();
        setHCanvas(hCanvas);
        setDiagram(hCanvas.drawDiagram(selectedNode));
    }

    return (
        <div className="HCanvas" onKeyUp={() => {console.log("key upp")}}>
            {diagram}
        </div>
    );
};

export class HCanvas {
    setDiagram: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
    setSelectedEdge: React.Dispatch<React.SetStateAction<HEdge | null>>;
    setSelectedNode: React.Dispatch<React.SetStateAction<HNode | null>>;
    private elements: HElement[] = [];
    private nodes: HNode[] = [];
    private edges: HEdge[] = [];

    constructor(setDiagram: React.Dispatch<React.SetStateAction<JSX.Element | null>>, 
        setSelectedEdge: React.Dispatch<React.SetStateAction<HEdge | null>>,
        setSelectedNode: React.Dispatch<React.SetStateAction<HNode | null>>) {
        this.setDiagram = setDiagram;
        this.setSelectedEdge = setSelectedEdge;
        this.setSelectedNode = setSelectedNode;
    }

    addElement(element: HElement) {
        this.elements.push(element);
        if (element instanceof HNode) {
            this.nodes.push(element);
        } else if (element instanceof HEdge) {
            this.edges.push(element);
        }
    }

    deleteElement(element: HElement) {
        this.elements.splice(this.elements.indexOf(element), 1);
        if (element instanceof HNode) {
            this.nodes.splice(this.nodes.indexOf(element), 1);
        } else if (element instanceof HEdge) {
            this.edges.splice(this.edges.indexOf(element), 1);
        }
    }

    init() {
        let mainSequence = new HSequence(null);
        mainSequence.x = 0;
        mainSequence.y = 0;
        
        let startTask = new HTask(mainSequence, this);
        startTask.label = "Start";
        startTask.x = 100;
        startTask.y = 50;

        let endTask = new HTask(mainSequence, this);
        endTask.label = "End";
        endTask.x = 100;
        endTask.y = startTask.bottom + vGap;

        let startEdge = new HEdge(mainSequence, this);
        startEdge.connect(startTask, endTask);
    }

    render(selectedNode: HNode|null) {
        this.setDiagram(this.drawDiagram(selectedNode));
    }

    drawDiagram(selectedNode: HNode|null): JSX.Element {
        return <>
            {/* <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}> */}
            <svg width="100%" height="100%" style={{ top: 0, left: 0 }} onKeyUp={() => {console.log("key upp")}}>
                {/* {this.elements.map((element, i) => (
                    <>
                        {element.draw()}
                    </>
                ))} */}
                {this.edges.map((edge, i) => (
                    <>
                        {edge.draw()}
                    </>
                ))}
                {this.nodes.map((node, i) => (
                    <>
                        {node.draw(selectedNode)}
                    </>
                ))}
            </svg>
        </>;
    }
}