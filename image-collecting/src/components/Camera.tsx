import Webcam from "react-webcam";
import React, { useState } from "react";
import { IonCard, IonButton, IonIcon, IonFabButton, IonFab } from "@ionic/react";
import { images, addOutline, camera } from "ionicons/icons";


const Cam = (prop: any) => {
    const webcamRef = React.useRef(null);
    var images = prop.images
    var setImages = prop.setImages
    const videoConstraints = {
        width: 450,
        height: 450,
        facingMode: "environment"
      };
    function capture(){
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(images)
        setImages([...images, imageSrc])
    }
    // const [images, setImages] = useState([])
    return (
        <>
            <Webcam style={{ height: "50%" }} ref={webcamRef} id="cam" screenshotQuality={1} minScreenshotWidth={400} minScreenshotHeight={400} videoConstraints={videoConstraints}></Webcam>

            <IonFab horizontal="center" vertical="bottom" onClick={capture}><IonFabButton><IonIcon icon={camera}></IonIcon></IonFabButton></IonFab>


            <div className='scrollmenu'>
                {
                    images.map((x, index) => (
                        <div key={index}>
                            <IonCard style={{ height: "100%", width: "150px" }}>
                                <IonButton color="danger" size="small" expand="full" onClick={() => {
                                    if (!confirm("Are you sure to delete?")) { return }
                                    images.splice(index, index + 1)
                                    console.log(images)
                                    setImages([...images])
                                }}>Delete</IonButton>
                                <img src={x} ></img>

                            </IonCard>
                        </div>
                    ))
                }

            </div>
            <input onChange={(e) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    var base64 = reader.result;
                    //@ts-ignore
                    setImages([...images, base64])
                };
                //@ts-ignore
                reader.readAsDataURL(document.getElementById("file").files[0]);
                //@ts-ignore
                e.target.value = null;
            }} id="file"
                type="file" hidden
            />

        </>
    )
}
export default Cam;