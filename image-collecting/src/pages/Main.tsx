import { IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonContent, IonHeader, IonIcon, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useState } from 'react';
import { addOutline } from 'ionicons/icons';
import { useParams } from 'react-router';
import Cam from '../components/Camera';
// import * as $3Dmol from '3dmol/build/3Dmol.js'

const Main: React.FC = () => {
  const upload = () => {
    //@ts-ignore
    document.getElementById("file").click();
  }
  const pid = 297;
  const [images, setImages] = useState([])
  const [count, setCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  return (
    <IonPage>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonButtons>
              <IonButton onClick={()=>{setIsOpen(false)}}>Close</IonButton>
            </IonButtons>
            <IonTitle>Camera</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Cam></Cam>
      </IonModal>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Image Collecting</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        
        <IonCard>
        <div style={{ padding: "10px" }}><IonChip color="success">You Have Captured {count} Molecules!</IonChip></div>
          <IonCardHeader>
            <b>Your current molecule: CID{pid}</b>
          </IonCardHeader>

          <IonCardContent>
            {/* <iframe style={{width: "100%", border: 0}}
         src="https://pubchem.ncbi.nlm.nih.gov/compound/23112#section=3D-Conformer&fullscreen=true"></iframe> */}
            <iframe style={{ width: "100%", height: "400px", border: 0 }}
              src={"/render.html?" + pid}></iframe>
            <br />
            
          </IonCardContent>


        </IonCard>
{/* 
        <IonButton expand="block" onClick={() => {
          if (!confirm("Are you sure to submit?")) return;
          window.location.reload();
        }}>SUBMIT</IonButton> */}
        <IonButton onClick={()=>{setIsOpen(true)}} expand="block">
          Begin Taking Images
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Main;
