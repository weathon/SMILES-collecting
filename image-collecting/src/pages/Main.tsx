import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useState } from 'react';
import { addOutline } from 'ionicons/icons';
import { useParams } from 'react-router';
// import * as $3Dmol from '3dmol/build/3Dmol.js'

const Main: React.FC = () => {
  const upload = () => {
    //@ts-ignore
    document.getElementById("file").click();
  }
  const pid = 5635;
  const [images, setImages] = useState([])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Image Collecting</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <b>Your current molecule: CID{pid}</b>
          </IonCardHeader>

          <IonCardContent>
            {/* <iframe style={{width: "100%", border: 0}}
         src="https://pubchem.ncbi.nlm.nih.gov/compound/23112#section=3D-Conformer&fullscreen=true"></iframe> */}
            <iframe style={{ width: "100%", height: "400px", border: 0 }}
              src={"/render.html?" + pid}></iframe>
            <br />
            My Images:
            <div className='scrollmenu'>
              {
                images.map((x, index) => (
                  <div key={index}>
                    <img src={x}></img>
                  </div>
                ))
              }
              <div>
                <IonCard onClick={upload} style={{ height: "100%", width: "150px" }}>
                  <IonIcon style={{ paddingTop: "30%" }} size="large" icon={addOutline}></IonIcon>
                </IonCard>
              </div>
            </div>
            <input onChange={() => {
              const reader = new FileReader();
              reader.onloadend = () => {
                var base64 = reader.result;
                setImages([...images, base64])
              };
              //@ts-ignore
              reader.readAsDataURL(document.getElementById("file").files[0]);
            }} id="file"
              type="file" hidden
            />
          </IonCardContent>


        </IonCard>


      </IonContent>
    </IonPage>
  );
};

export default Main;
