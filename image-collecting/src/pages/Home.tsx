import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Image Collecting</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Image Collecting</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Instruction</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <ul>
            <li> You will be given a series of molecules, you will be provided with their name and 3D sturture.
            </li>
            <li>You will need to build this molecule and take 4-6 images of it at different angle.</li>
          
            <li>
              If there is a chair flip for the molecule, do the chair flip and tkae another 4-6 images at different angle.
            </li>
            </ul>
            <IonButton expand="block">Start</IonButton>
            </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
