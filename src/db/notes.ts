import { StickyDefaulNoteType } from "../../types";
import connection from "./connection";


export const getNotes = async (projectId: string) => {
    const snapshot = await connection.db.collection(`note${projectId}`).get();
    return snapshot.docs.map(doc => doc.data())
}


export const addNote = async (note: StickyDefaulNoteType, idNote: string, idProject: string) => {
    try {
        await connection.db.collection(`note${idProject}`).doc(idNote).set({
            ...note
        })
    } catch (error) {
        console.log(error)
    }
}


export const updateNote = async (idProject: string, note: StickyDefaulNoteType, idNote: string) => {
    const dbRef = connection.db.collection(`note${idProject}`).doc(idNote);
    await dbRef.set({
        ...note
    });
}


export const deleteNote = async (idProject: string, idNote: string) => {
    const dbRef = connection.db.collection(`note${idProject}`).doc(idNote);
    await dbRef.delete();
}