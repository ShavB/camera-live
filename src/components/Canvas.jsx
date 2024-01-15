import { useEffect, useRef, forwardRef, useState } from "react";

// create multiple canvas 

const Canvas = ((props)=>{
    const [picture, setPicture] = useState([]);
    const canvasRef = useRef();

    useEffect(() => {
        console.log(props.current);
    })
    // create canvas




    // useEffect (() => {
    //     console.log(ref.current)
    //     setPicture(ref.current);
    // })
    return (
        <div>
            {/* <canvas
                id="imageCaptured"
                crossOrigin="anonymous"
                ref={ref}
            ></canvas> */}
            {/* <div>
                {props.map((pic) => {
                    console.log(pic);
                })}
            </div> */}
        </div>
    );
})

export default Canvas;
