import React, { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";

function Camera() {
    const videoRef = useRef();
    const canvasRef = useRef();

    const [localVideo, setLocalVideo] = useState(null);
    const [dimensions, setDimensions] = useState({});
    const [picture, setPicture] = useState([{}]);

    const getCam = async () => {
        try {
            const mediaStream =
                await window.navigator.mediaDevices.getUserMedia({
                    video: true,
                });

            const videoTrack = mediaStream.getVideoTracks()[0];
            setLocalVideo(videoTrack);
            if (!videoRef.current) {
                return;
            }
            videoRef.current.srcObject = new MediaStream([videoTrack]);
            // videoRef.current.play();

            if (videoRef.current) {
                videoRef.current.addEventListener(
                    "loadedmetadata",
                    function () {
                        const { vWidth, vHeight } = getVideoSizeData(videoRef);

                        canvasRef.current.width = vWidth;
                        canvasRef.current.height = vHeight;
                        setDimensions({
                            w: vWidth,
                            h: vHeight,
                        });
                    }
                );
            }
        } catch (err) {
            console.error("error -- ", err);
        }
    };

    useEffect(() => {
        if (videoRef && videoRef.current) {
            getCam();
        }
    }, [videoRef]);

    let context;
    if (canvasRef.current) {
        context = canvasRef.current.getContext("2d");
    }

    function captureImage() {
        if (context && videoRef.current) {
            context.fillRect(0, 0, dimensions.w, dimensions.h);
            context.drawImage(
                videoRef.current,
                0,
                0,
                dimensions.w,
                dimensions.h
            );
        }
        setPicture(canvasRef.current);
    }

    function getVideoSizeData(videoRef) {
        const ratio =
            videoRef.current.videoWidth / videoRef.current.videoHeight;
        const vWidth = videoRef.current.videoWidth / 5;
        const vHeight = parseInt(vWidth / ratio, 10);
        return {
            // ratio,
            vWidth,
            vHeight,
        };
    }

    return (
        <div className="grid grid-cols-2 gap-2">
            <div>
                <video autoPlay ref={videoRef}></video>
                <div
                    className="h-9 w-9 bg-red-600 rounded-full cursor-pointer"
                    onClick={() => captureImage()}
                >
                    <div className=""></div>
                </div>
            </div>
            <div>
                {/* <Canvas pictures={picture} />
                 */}
                 <canvas ref={canvasRef}></canvas>
            </div>
        </div>
    );
}

export default Camera;
