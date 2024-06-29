import { BIterator } from "../structure/BIterator";
import React, { ChangeEvent } from 'react';

interface BJoinProps {
    iteratorData: BIterator;
}

export const JoinInput: React.FC<BJoinProps> = ({iteratorData}) => {
    let joinableInputsUI = <div>
        <p><b>Inputs to join</b></p>
        {iteratorData.inputs.map((input, index) => {
            if (!input.array) {
                return <></>;
            }
            return (
                <div key={index}>
                    <input type="checkbox" onChange={(e) => {inputClick(e, index, iteratorData)}}/>{input.name}<br/>
                </div>
            );
        })}
    </div>; 

    let conditionsUI = <div>
        <p><b>Conditions</b></p>
        <input type="text" placeholder="Condition"/>
    </div>;

    let outputsUI = <div>
        <p><b>Outputs</b></p>
        {iteratorData.outputs.map((output, index) => {
            return (
                <div key={index}>
                    {output.name}<br/>
                </div>
            );
        })}
        <button>Add output</button>
    </div>;

    return (
        <div className="editForm">
            {joinableInputsUI}
            {conditionsUI}
            {outputsUI}   
            <br/><button onClick={() => {iteratorData.vmapping.setBIterator(null)}}>Ok</button>                     
        </div>
    );
}

const inputClick = (e: ChangeEvent<HTMLInputElement>, index: number, bIterator: BIterator) => {
    if (bIterator.vmapping === null) {
        return;
    }
    if (e.target.checked) {
        bIterator.joinInputs.set(bIterator.inputs[index].path, bIterator.inputs[index]);
    } else {
        bIterator.joinInputs.delete(bIterator.inputs[index].path);
    }
}