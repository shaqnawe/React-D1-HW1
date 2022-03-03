import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { firebaseApp } from '../firebase/config';
import { collectionGroup, getDoc, getDocs, query, getFirestore } from 'firebase/firestore';

export const DataContext = createContext()

// To make your own React hook
export function useData() {
    return useContext( DataContext )
}

const DataProvider = (props) => {
    
    const [posts, setPosts] = useState([]);
    const [messages, setMessages] = useState([]);

    const db = getFirestore()

    const getMessages = useCallback(
        async () => {
            // const q = query( collection ( db, 'messages') ), orderBy( 'dateCreated', 'desc' ) );
            console.log(db)

            const q = query( collectionGroup (db, 'messages') )

            let newMessages = [];

            const querySnapshot = await getDocs( q )

            querySnapshot.forEach( async doc => {
                const userRef = await getDoc(doc.ref.parent.parent);
                // console.log(userRef.data());

                newMessages.push({
                  id: doc.id,
                  ...doc.data(),
                  user: { ...userRef.data() },
                });
                setMessages( newMessages )
                // console.log(doc.data())
            })
            return querySnapshot;
        },
        [db]
    )
    
    useEffect(() => {
      axios
        .get(`https://fakebook-january-derek.herokuapp.com/api/v1/blog`)
        .then((res) => setPosts(res.data));
        getMessages()
    }, [ getMessages ]);

    
    const values = {
      posts: posts,
      messages: messages
    };

    return (
        <DataContext.Provider value = { values }>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider;