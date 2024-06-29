import { BIterator } from "../structure/BIterator";
import { BMode } from "./MapView";

interface VMPalletProps {
    // setNewBIterator: React.Dispatch<React.SetStateAction<BIterator | null>>;
    setBMode: React.Dispatch<React.SetStateAction<BMode>>;
}

export const VMPallet: React.FC<VMPalletProps> = ({setBMode}) => {
    return (
        <div className="vmPallet">
            <button onClick={() => {setBMode(BMode.NONE)}}>Data</button>
            <button>Function</button>
            <button onClick={() => {setBMode(BMode.ITERATOR)}}>Iterator</button>
        </div>
    );
}

