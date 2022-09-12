import { useState,useEffect } from "react";

export function useMouse(){
    const [x,setX] = useState(0);
    const [y,setY] = useState(0);
    const mouseMove = (e:MouseEvent) => {
        setX(e.clientX);
        setY(e.clientY);
    };
    useEffect(()=>{
            document.documentElement.addEventListener('mousemove',mouseMove);
        return (()=>{
            document.documentElement.removeEventListener('mousemove',mouseMove)
        })
    },[])
    return {x,y}
}