

import firebase from "firebase"
import { API_KEY } from "../../conf"

firebase.initializeApp(API_KEY);


const db = firebase.firestore();

export default {
    db,
    firebase
}

