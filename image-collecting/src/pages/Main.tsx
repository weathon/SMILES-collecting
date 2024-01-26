import { IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonContent, IonHeader, IonIcon, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useEffect, useState } from 'react';
import { addOutline } from 'ionicons/icons';
import { useParams } from 'react-router';
import Cam from '../components/Camera';
// import * as $3Dmol from '3dmol/build/3Dmol.js'
import { supabase } from '../SupabaseClient';

let color = {
  "C": "#505050",
  "H": "#FEFEFE",
  "N": "#87CEEB",
  "O": "#FE0000",
  "Cl": "#00FE00",
  "Br": "darkred",
  "I": "darkpurple",
  "S": "yellow"
}

const Main: React.FC = () => {
  const upload = () => {
    //@ts-ignore
    document.getElementById("file").click();
  }
  const [pid, setPid] = useState(-1)
  // const [id, setId] = useState(1)
  // const id = 1;
  const [name, setName] = useState("")
  const [images, setImages] = useState([])
  const [count, setCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    const fun = async () => {
      const { data, error } = await supabase
        .from('molecules')
        .select()
        .eq('finished', false).limit(1)
      console.log(data[0]);
      setPid(data[0].cid); setName(data[0].name)
      setImages([])
    }
    fun()
  }, [])
  return (
    <IonPage>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonButtons>
              <IonButton onClick={() => { setIsOpen(false) }}>Close</IonButton>
            </IonButtons>

            <IonTitle>Camera</IonTitle>
            <IonButtons slot="end" onClick={async () => {
              if (confirm("Are you sure to submit")) {
                const { data: { user } } = await supabase.auth.getUser();
                console.log(user)
                // @ts-ignore
                var error1 = await supabase.from('images')
                  .insert(images.map(x => (
                    { cid: pid, image: x, user_id: user.email } //remember to set RLS on server duzikouke 
                  )))

                // setId(id + 1);
                // const { data, error } = await supabase
                //   .from('molecules')
                //   .update({ 'finished': 1 }) //RLS have to have using
                //   .eq('cid', pid)
                //   .select() //shoube place before fetch next one 

                // console.log(data)
                // console.log(pid)
                // @ts-ignore
                const r3 = await supabase
                  .from('molecules')
                  .select()
                  .eq('finished', false).limit(1)

                const { data, error } = await supabase
                  .from('molecules')
                  .update({ 'finished': 1 }) //RLS have to have using
                  .eq('cid', r3.data[0].cid)
                  .select()
                // if (error) {
                //   alert(error);
                //   console.log(error)
                //   return;
                // }
                if (r3.data.length == 0) {
                  alert("WOW! You finished all of them!")
                }
                setPid(r3.data[0].cid); setName(r3.data[0].name)
                setCount(count + 1);
                setImages([])
                setIsOpen(false);
                window.location.reload()
              }
            }}>
              <IonButton>Submit</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonButton onClick={async () => {
          alert("Submiting")
          const { data: { user } } = await supabase.auth.getUser();
          var error1 = await supabase.from('images')
            .insert(images.map(x => (
              { cid: pid, image: x, user_id: user.email } //remember to set RLS on server duzikouke 
            )))
          setImages([])
        }}>Submit parts</IonButton>
        <Cam images={images} setImages={setImages}></Cam>

      </IonModal>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Image Collecting</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonCard>

          {/* <div style={{ padding: "10px" }}><IonChip color="success">You Have Captured {count} Molecules!</IonChip></div> */}
          <IonCardHeader>
            <b>Your current molecule: {name} <a onClick={async () => {
              const ans = prompt("Enter PID")
              const { data, error } = await supabase
                .from('molecules')
                .select()
                .eq('cid', ans).limit(1)
                // @ts-ignore
              if(data.length==0)
              {
                alert("PID not in database") //in database still doable tho kouke
                return
                // setPid(data.cid)
              }
              if(data[0].finished==false)
              {
                setPid(Number(ans))
              }
            }}>Edit</a></b>
          </IonCardHeader>

          <IonCardContent>
            Color Key Card:<br />
            {
              Object.keys(color).map(x => (
                <><span style={{ backgroundColor: color[x], margin: "5px", border: "solid", padding: "3px", color: ((x == "C") ? "white" : "black") }}>{x}</span></>
              ))
            }
            {/* <iframe style={{width: "100%", border: 0}}
         src="https://pubchem.ncbi.nlm.nih.gov/compound/23112#section=3D-Conformer&fullscreen=true"></iframe> */}


            <iframe style={{ width: "100%", height: "400px", border: 0 }}
              src={"/render.html?" + pid} key={pid}></iframe>
            <br />

          </IonCardContent>


        </IonCard>
        {/* 
        <IonButton expand="block" onClick={() => {
          if (!confirm("Are you sure to submit?")) return;
          window.location.reload();
        }}>SUBMIT</IonButton> */}
        <IonButton onClick={() => { setIsOpen(true) }} expand="block">
          Begin Taking Images
        </IonButton>
      </IonContent>
    </IonPage >
  );
};

export default Main;
