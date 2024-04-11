import { useState } from 'react';

export default function useListSwap(list: string[], callback: (e: string[]) => void) {
    const [elements, setElements] = useState<string[]>([]);

    function toggleElement(el: string) {
        setElements((cur) => cur.includes(el) ? cur.filter(e => e !== el) : [...cur, el]);
        if (elements.length === 2) {
            const l = list;
            const el1Idx = l.indexOf(elements[0]);
            const el2Idx = l.indexOf(elements[1]);
            const el2 = l[el2Idx];

            l[el2Idx] = l[el1Idx];
            l[el1Idx] = el2;
        }
    }
}
