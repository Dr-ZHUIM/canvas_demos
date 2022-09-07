import { useEffect, useRef,useState } from "react"
import Matter from "matter-js"
const { Engine, Render, World, Bodies, Runner } = Matter

export default function Mass() {

    const el = useRef<HTMLDivElement>(null);
    const [f,setF] = useState<any>();

    useEffect(() => {
        async function fetchData() {
            const engine = Engine.create();
            const render = Render.create({
                element: el.current!,
                engine,
                options: {
                    width: 400,
                    height: 400,
                    background: '#ffffff',
                    wireframes: false,
                    // @ts-expect-error untyped
                    pixelRatio: 'auto',
                }
            })
            const wireframe = {
                fillStyle: 'transparent',
                strokeStyle: 'black',
                lineWidth: 1
            };
    
            const ground = Bodies.rectangle(400, 200, 410, 50, {
                isStatic: true,
                render: wireframe
            });
    
            World.add(engine.world, [ground]);
    
            let add = () => {                
                const boxA = Bodies.rectangle(180, -40, 80, 80, { render: wireframe });
                World.add(engine.world, [boxA]);
            }
            add();
            setF(()=>add);
            Render.run(render);
            const runner = Runner.create();
            Runner.run(runner,engine);
        }
        fetchData()
    },[]);

    return (
        <>
            <div onClick={f?f:null} className="canvas" ref={el}></div>
        </>
    )
}