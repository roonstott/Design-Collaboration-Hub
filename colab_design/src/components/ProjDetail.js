import React from 'react'
import { collection, doc, getDoc, onSnapshot, getDocs } from "firebase/firestore";
import { db } from './../firebase';

function ProjDetail({ proj }) {
  const p = proj[0];
  const title = p.title;

  const openPopUp = () => {
    document.getElementById("participantPopUp").showModal();
  }

  const closePopUp = () => {
    document.getElementById("participantPopUp").close()
  }

  const handleQueryMatches = async (event) => {
    const input = event.target.value.toLowerCase();
    const userRef = collection(db, "users");
    const userData = await getDocs(userRef);
    let matches = [];
    userData.forEach(doc => {
      if (
        doc.data().firstName.toLowerCase().includes(input) ||
        doc.data().lastName.toLowerCase().includes(input) ||
        doc.data().email.toLowerCase().includes(input) &&
        ! matches.includes(doc.data())
      ) {
        matches.push(doc.data())
      }
    })
    console.log(matches)
    
  }

  return (
    <React.Fragment>
      <div className="min-h-full mx-20 max-w-screen-md my-12">
        <div className="max-w-screen-md min-w-full place-self-center">
          <div className="bg-slate-100 h-16 drop-shadow-md flex justify-around">
            <h3 className="basis-1/2 text-align-center p-4 text-2xl">{title}</h3>
            <div className="basis-1/2 flex justify-end">
            <button onClick={openPopUp} className=" bg-slate-200 m-2 h-12 w-auto text-align-center p-2 hover:text-lg hover:drop-shadow-xl">participants</button>
              <button className=" bg-emerald-400 m-2 h-12 w-20 text-align-center p-2 hover:text-lg hover:drop-shadow-xl">Save</button>
            </div>
          </div>   

          <p className="min-h-screen bg-white p-12 " contentEditable="true">Start your project</p>

        </div>
      </div>
      <dialog id="participantPopUp" className=" mx-20 w-1/2 border-slate-400 border-2">
        <label for="searchParticipants">Add Members</label>
        <input onChange={(e) => handleQueryMatches(e)}id="searchParticipants" name="searchParticipants" className="m-4 p-2"/>
        <table>
          <thead>
            <tr>
              <td>Participants</td>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
        <button onClick={closePopUp}className="bg-red-300 border-slate-400 rounded px-4 py-1">Close</button>
      </dialog>
      
    </React.Fragment>
  )
}

export default ProjDetail; 