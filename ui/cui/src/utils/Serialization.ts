import { HBlock } from "../blocks/HBlock";
import { HIfBlock } from "../blocks/HIfBlock";
import { HLoopBlock } from "../blocks/HLoopBlock";
import { HSequence } from "../blocks/HSequence";
import { HCanvas } from "../components/HCanvas";
import { HNode } from "../elements/HNode";
import { SBlock, SIfBlock, SLoop, SNode, SSequence } from "./STypes";

export const serializeBlock = (block: HBlock): SBlock => {
    if (block instanceof HSequence) {
        return serializeSequence(block);
    } else if (block instanceof HIfBlock) {
        return serializeIfBlock(block);
    } else if (block instanceof HLoopBlock) {
        return serializeLoop(block);
    }
    throw new Error("Unknown block type");
}

export const serializeSequence = (seq: HSequence): SSequence => {
    let sseq = new SSequence();
    sseq.id = seq.id;
    sseq.btype = seq.getType();
    sseq.condition = seq.condition;
    let currentNode = seq.startNode;
    if (currentNode == null) {
        throw new Error("Start node defined for sequence");
    }
    while (true) {
        if (currentNode.block !== seq) {
            let childSBlock = serializeBlock(currentNode.block);
            sseq.elements.push(childSBlock);
            if (!(currentNode.block.endNode?.outEdges[0].target instanceof HNode)) {
                throw new Error("Invalid end node");
            }
            currentNode = currentNode.block.endNode?.outEdges[0].target;
            continue;
        }
        let snode = new SNode();
        snode.label = currentNode.label;
        sseq.elements.push(snode);
        if (currentNode === seq.endNode) {
            break;
        }
        let nextNode:HNode|null = currentNode?.outEdges[0].target;
        if (nextNode instanceof HNode) {
            currentNode = nextNode;
        } else {
            throw new Error("Invalid node");
        }
    }
    return sseq;
}

export const serializeIfBlock = (block: HIfBlock): SIfBlock => {
    let sif = new SIfBlock();
    sif.id = block.id;
    sif.btype = block.getType();
    sif.sequences = block.paths.map((seq: HSequence) => {
        return serializeSequence(seq);
    });
    return sif;
}

export const serializeLoop = (block: HLoopBlock): SLoop => {
    let sloop = new SLoop();
    sloop.id = block.id;
    sloop.btype = block.getType();
    sloop.sequence = serializeSequence(block.paths[0]);
    return sloop;
}

// export const serializeBlock = (block: HBlock): SBlock => {
//     let sblock = new SBlock();
//     sblock.id = block.id;
//     sblock.btype = block.getType();
//     // sblock.x = block.x;
//     sblock.nodes = block.nodes.map((node: HNode) => {
//         let snode = new SNode();
//         snode.label = node.label;
//         // snode.x = node.x;
//         // snode.y = node.y;
//         return snode;
//     });
    
//     sblock.childBlocks = block.childBlocks.map((childBlock: HBlock) => {
//         return serializeBlock(childBlock);
//     });
//     return sblock;
// }

export const writeJson = (canvas: HCanvas) => {
    if (canvas.rootBlock == null) {
        console.log("No root block");
        return;
    }
    let rootSBlock = serializeBlock(canvas.rootBlock);
    console.log(JSON.stringify(rootSBlock));
    
    // let sModel = {};
    // let b =  canvas.blocks.map((block: HBlock) => {
    //     let blockModel = {
    //         id: block.id,
    //         x: block._x,
    //         nodes: block.nodes.map((node: HNode) => {
    //             return {
    //                 label: node.label,
    //                 x: node.x,
    //                 y: node.y
    //             }
    //         })
    //     };
    //     return blockModel;
    // });
    // sModel.set("blocks", b);
    
}