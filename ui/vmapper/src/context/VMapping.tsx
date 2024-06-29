import { BMode } from "../components/MapView";
import { BData } from "../structure/BData";
import { BField } from "../structure/BField";
import { BFunction } from "../structure/BFunction";
import { BIterator } from "../structure/BIterator";
import { BLink } from "../structure/BLink";
import { BRecordField } from "../structure/BRecord";
import { BSComp } from "../structure/BSComp";
import { BSData } from "../structure/BSData";
import { BSFunction } from "../structure/BSFunction";
import { BSubmap } from "../structure/BSubmap";

export class VMapping {
    draggingComponent: BSComp | null = null;
    draggingFunction: BFunction | null = null;
    draggingRecord: BData | null = null;
    draggingIterator: BIterator | null = null;
    binputs: BData[] = [];
    bsinputs: BSData[] = [];
    bsoutputs: BSData[] = [];
    boutputs: BData[] = [];
    bfunctions: BFunction[] = [];
    bsfunctions: BSFunction[] = [];
    bsubmaps: BSubmap[] = [];
    biterators: BIterator[] = [];
    bLinks: BLink[] = [];
    bMode: BMode = BMode.NONE;
    setBMode: React.Dispatch<React.SetStateAction<BMode>>;
    setSComponents: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
    setDiagram: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
    setBIterator: React.Dispatch<React.SetStateAction<BIterator | null>>;
    currentLhsNode: BField | null = null;

    constructor(
        setBMode: React.Dispatch<React.SetStateAction<BMode>>,
        setSComponents: React.Dispatch<React.SetStateAction<JSX.Element | null>>,
        setDiagram: React.Dispatch<React.SetStateAction<JSX.Element | null>>,
        setBJoin: React.Dispatch<React.SetStateAction<BIterator | null>>) {
            this.setSComponents = setSComponents;
            this.setDiagram = setDiagram;
            this.setBIterator = setBJoin;
            this.setBMode = setBMode;
    }

    init() {
        let bAddress = new BRecordField(this, "address", "Address", "", true);
        bAddress.expanded = true;
        bAddress.addField("street", "string");
        bAddress.addField("city", "string");
        bAddress.addField("zip", "string");

        let bPerson = new BRecordField(this, "person", "Person");
        bPerson.expanded = false;
        bPerson.addField("name", "string");
        bPerson.addField("age", "int");
        bPerson.addRecordField(bAddress);
        bPerson.addField("email", "string", true);
        let inputRecord = new BData(this, bPerson);
        // this.binputs.push(inputRecord);

        let bsData1 = new BSData(bPerson, this, 50, 30);
        this.bsinputs.push(bsData1);

        let bAddress2 = new BRecordField(this, "address", "Address", "", true);
        bAddress2.expanded = true;
        bAddress2.addField("street", "string");
        bAddress2.addField("city", "string");
        bAddress2.addField("zip", "string");
        bAddress2.setLhsNode(false);
        let outputRecord = new BSData(bAddress2, this, 400, 100);
        this.bsoutputs.push(outputRecord);

        let func1 = new BSFunction(this, 100, 600, "calculateArea");
        func1.addInput("length", "float");
        func1.addInput("width", "float");
        func1.setOutput("area", "float");
        this.bsfunctions.push(func1);

        let it1 = new BIterator(this, "buildingAppMapping");
        it1.addInput("floors", "Floor", true);
        it1.addInput("tilingCost", "int", true);
        it1.addInput("paintingCost", "int");
        it1.addOutput("costs", "Cost", true);
        this.biterators.push(it1);
        this.render();
    }

    render() {

        let cY = 10;
        let sui = <></>;
        this.bsinputs.forEach(bsinput => {
            let [bsinputUI, bsinputHeight] = bsinput.draw();
            sui = <>
                {sui}
                {bsinputUI}
            </>;
            cY += bsinputHeight + 50;
        });

        this.bsoutputs.forEach(bsoutput => {
            let [bsoutputUI, bsoutputHeight] = bsoutput.draw();
            sui = <>
                {sui}
                {bsoutputUI}
            </>;
            cY += bsoutputHeight + 50;
        });

        this.bsfunctions.forEach(bfunction => {
            let bfunctionUI = bfunction.draw();
            sui = <>
                {sui}
                {bfunctionUI}
            </>;
        });
        this.setSComponents(sui);

        // let currentY = 10;
        let ui = <></>;
        // this.binputs.forEach(brecord => {
        //     let [brecordUI, brecordHeight] = brecord.draw(10, currentY);
        //     ui = <>
        //         {ui}
        //         {brecordUI}
        //     </>;
        //     currentY += brecordHeight + 50;
        // });

        // currentY = 10;
        // this.boutputs.forEach(brecord => {
        //     let [brecordUI, brecordHeight] = brecord.draw(900, currentY);
        //     ui = <>
        //         {ui}
        //         {brecordUI}
        //     </>;
        //     currentY += brecordHeight + 50;
        // });

        this.bfunctions.forEach(bfunction => {
            let bfunctionUI = bfunction.draw(400, 100);
            ui = <>
                {ui}
                {bfunctionUI}
            </>;
        });

        this.bsubmaps.forEach(bsubmap => {
            let bsubmapUI = bsubmap.draw(400, 800);
            ui = <>
                {ui}
                {bsubmapUI}
            </>;
        });

        this.biterators.forEach(biterator => {
            let biteratorUI = biterator.draw(400, 800);
            ui = <>
                {ui}
                {biteratorUI}
            </>;
        });

        this.bLinks.forEach(bLink => {
            ui = <>
                {ui}
                {bLink.draw()}
            </>;
        });

        this.setDiagram(ui);
    }

    addFunction() {
        console.log("Adding function");
    }
}