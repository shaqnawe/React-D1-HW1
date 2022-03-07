import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { firebaseApp } from '../firebase/config';
import { useAuth } from "../contexts/AuthProvider";
import { collection,
  collectionGroup,
  addDoc,
  getDoc,
  getDocs,
  query,
  getFirestore
} from "firebase/firestore";

export const DataContext = createContext()

// To make your own React hook
export function useData() {
    return useContext( DataContext )
}

const DataProvider = (props) => {
    
    const [posts, setPosts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [sent, setSent] = useState([]);
    const { currentUser } = useAuth();
    let userEmail;

    const db = getFirestore()

    const getMessages = useCallback(
        async () => {

            const q = query( collectionGroup(db, "messages") );

            let newMessages = [];

            const querySnapshot = await getDocs( q )

            querySnapshot.forEach( async doc => {
                const userRef = await getDoc(doc.ref.parent.parent);

                newMessages.push({
                  id: doc.id,
                  ...doc.data(),
                  user: { ...userRef.data() },
                });
                setMessages( newMessages )
            })
            return querySnapshot;
        },
        [db]
    )
    const getSent = useCallback(
        async () => {
            const q = query( collectionGroup(db, 'sent') )

            let updatedSent = [];
            const querySnapshot = await getDocs( q );

            querySnapshot.forEach( async doc => {
                const userRef = await getDoc(doc.ref.parent.parent);
                userEmail = userRef.data().email;

                updatedSent.push({
                    id: doc.id,
                    ...doc.data(),
                    user: userEmail
                });
                setSent( updatedSent )
                console.log(updatedSent);
            })
            return querySnapshot;
        },
        [db]
    );

    const sendEmail = async (emailData) => {
      let collectionRef = await collection(db, `users/${currentUser.id}/sent`);
      const docRef = await addDoc(collectionRef, emailData);
      const newDoc = await getDoc(docRef);
      const userRef = await getDoc(docRef.parent.parent);
    //   console.log(userRef)
      setSent([
        { id: newDoc.id, ...newDoc.data() }
      ]);
    };
    
    useEffect(() => {
      axios
        .get(`https://fakebook-january-derek.herokuapp.com/api/v1/blog`)
        .then((res) => setPosts(res.data));
        getMessages();
        getSent();
    }, [ getMessages, getSent ]);

    
    const values = {
      posts: posts,
      messages: messages,
      sent: sent,
      setSent: setSent,
      userEmail: userEmail,
      sendEmail: sendEmail
    };

    return (
        <DataContext.Provider value = { values }>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider;