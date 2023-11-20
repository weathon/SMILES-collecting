import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { logoGoogle } from 'ionicons/icons';
// import { createClient } from "@supabase/supabase-js";
// const supabase = createClient('https://vcjgznqnyqmvkrommoyb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjamd6bnFueXFtdmtyb21tb3liIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc4MzY5NzEsImV4cCI6MjAxMzQxMjk3MX0.brt6zUmcuPJxpgyj42j8Mhd80KfXtmwtz0j52QjeC4o')
import { supabase } from '../SupabaseClient';

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
              <li>The image should be taken on a pure dark backgroun.</li>
              <li>
                If there is a chair flip for the molecule, do the chair flip and tkae another 4-6 images at different angle.
              </li>
              <li>
                For best experence, we recommond using a tablet or large screen phone
              </li>
              <li> <b>Make sure all atoms are visible in the photo, if this is not possible because occlusion exsits, make as much visable as possible. If a molecule contains atoms you do not have in the molecular kit, skip the molecule by submiting without taking any images. If it is an ionic compound, skip it as well. </b></li>
            </ul>
            {/* <IonInput id="id">Volunteer ID:</IonInput> */}
            <IonButton expand="block" onClick={() => {
              //@ts-ignore
              //  const id=document.getElementById("id").value;
              //  if(id)
              //  {
              //   window.location.href = "/main"
              //  }
              //  else{
              //   alert("Please enter volunteer ID")
              //  }
              supabase.auth.getUser().then(user => {
                if (!user.data.user) {
                  supabase.auth.signInWithOAuth({
                    provider: 'google',
                  })
                }
                else {
                  window.location.href = "/main"
                }
              })

            }}>

              <IonIcon icon={logoGoogle} style={{ padding: "10px" }}></IonIcon>
              Login With Google</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
