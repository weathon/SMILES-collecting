import Webcam from "react-webcam";
import React, { useState } from "react";
import { IonCard, IonButton, IonIcon, IonFabButton, IonFab } from "@ionic/react";
import { images, addOutline, camera } from "ionicons/icons";


const Cam = () => {
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            images.push(imageSrc)
            setImages([...images])
        },
        [webcamRef]
    );
    const [images, setImages] = useState([])
    return (
        <>
            <Webcam ref={webcamRef} id="cam" videoConstraints={{ "facingMode": "environment" }}></Webcam>
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