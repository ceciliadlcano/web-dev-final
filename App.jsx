import { useState, useEffect } from "react";
import minjiPic from "/minji.jpeg";
import "./App.css";

import { db, auth, google } from "../firebase.ts";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { signInWithPopup, signOut } from "firebase/auth";

function App() {
  const [count, setCount] = useState(0);
  const [docRef, setDocRef] = useState(null);
  const [user, setUser] = useState(null);

  const testDocRef = doc(db, "test", "single-document");
  

  useEffect(() => {
    const loadDocument = async () => {
      try {
        const docSnap = await getDoc(testDocRef);
        if (docSnap.exists()) {
          setCount(docSnap.data().count || 0);
          setDocRef(testDocRef);
        } else {
          await setDoc(testDocRef, { uid: "test", createdAt: new Date(), count: 0 });
          setCount(0);
          setDocRef(testDocRef);
        }
      } catch (error) {
        console.error("Error loading document:", error);
      }
    };

    loadDocument();
  }, []);

  const handleAuthClick = () => {
    if (user) {
      signOut(auth).catch(console.error);
      setUser(null);
    } else {
      signInWithPopup(auth, google)
        .then((result) => setUser(result.user))
        .catch(console.error);
    }
  };

  useEffect(() => {
    if (!docRef) return;
    const updateCount = async () => {
      try {
        await updateDoc(docRef, { count });
      } catch (error) {
        console.error("Error updating count:", error);
      }
    };
    updateCount();
  }, [docRef, count]);

  return (
    <>
      <div className="MinjiImage">
        <a>
          <img src={minjiPic} className="logo" alt="Image of Idol Minji" />
        </a>
      </div>
      <div className="card">
        {user ? (
          <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
        ) : (
        <p>Sign in to update the counter!</p>
        )}
        {user ? (
          <button onClick={() => setCount((c) => 0)}>Reset counter</button>
        ) : (<p></p>)}
      <button onClick={handleAuthClick}>
        {user ? `Sign out (${user.displayName})` : "Sign in (with Google)"}
      </button>
      <p>
        Edit <code>src/App.jsx</code> and save to test HMR
      </p>
    </div>
    </>
  );
}

export default App;
