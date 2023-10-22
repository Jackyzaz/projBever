import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [userDB, setUserDB] = useState([])
    const [user, setUser] = useState({})
    const [admin_uid, setAdmin_UID] = useState(['srShevVGRvYJSqPOQExe8n5k9tC3','sAtt46NgXHVkxM5b0vNS0xRnzqp2'])
    const [academic_uid, setAcademic_UID] = useState(['KNuI2F4ahoSRqpwsa1XSV10Oq2I2'])
    const [building_uid, setBuilding_UID] = useState(['DABMFpqL5YMLNWfGHFTYvvhXbCn2'])
    const [welfare_uid, setWelfare_UID] = useState(['0BEYsFEPf2gVxZHaT3arIlMOBIa2'])
    const [finace_uid, setFinace_UID] = useState(['bKhvXiJ2W9PKeRdB1PEhPtKcvgC2'])
    const [sc_uid, setSC_UID] = useState(['EtLSstz4JVN5a9jE4uI33Eha8402'])
    const [director_uid, setDirector_UID] = useState(['cujCMbdKNldqRC4yaPLH38i8dvC2'])
    // const admin_uidx = []
    
    const userCollectionRef = collection(db, "/user_db")
    const getUserInfo = useCallback(() => {
        const adminCollectionRef = query(userCollectionRef, where('role', '==', 'admin'))
        getDocs(userCollectionRef)
        // getDocs(userCollectionRef).then(res => console.log(res.docs[0])) Log version
        const getData = async () => {
            const res = await getDocs(userCollectionRef)
            setUserDB(res.docs.reverse());
        }
        getData();
    }, [])

    useEffect(() => {
        getUserInfo();
    }, [])

    // const reloadAdmin = useCallback(() => {
    //     userDB.map((item) => {
    //         if (!admin_uid.includes(item.data().uid)) {
    //             setAdmin_UID(admin_uidx => [...admin_uid, item.data().uid])
    //         }
    //         console.log(admin_uid)
    //     })
    // }, [userDB])

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                currentUser.isAdmin = admin_uid.includes(currentUser.uid)
                currentUser.isAcademic = academic_uid.includes(currentUser.uid)
                currentUser.isBuilding = building_uid.includes(currentUser.uid)
                currentUser.isWelfare = welfare_uid.includes(currentUser.uid)
                currentUser.isFinace = finace_uid.includes(currentUser.uid)
                currentUser.isSC = sc_uid.includes(currentUser.uid)
                currentUser.isDirector = director_uid.includes(currentUser.uid)
                // console.log(currentUser) log ver
            }
            setUser(currentUser)
        })
        return () => {
            unsubscribe();
        }
    }, [user])

    return (
        <UserContext.Provider value={{ createUser, user, logout, signIn, admin_uid, userDB }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}