
export class SBlock {
    id: string = "";
    btype: string = "";
    x: number = 0;
}

export class SNode {
    label: string = "";
    x: number = 0;
    y: number = 0;
}

export class SSequence extends SBlock {
    condition: string|null = null;
    elements: (SNode|SBlock)[] = [];
}

export class SIfBlock extends SBlock {
    sequences: SSequence[] = [];
}

export class SLoop extends SBlock {
    sequence: SSequence|null = null;
}