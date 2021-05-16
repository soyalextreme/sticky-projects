import { ProjectType } from "../../types";
import connection from "./connection";


export const getProjects = async (uid: string) => {
    const snapshot = await connection.db.collection(`projects${uid}`).get();
    return snapshot.docs.map(doc => doc.data())
}


export const addProject = async (uid: string, project: ProjectType, idProject: string) => {
    try {
        await connection.db.collection(`projects${uid}`).doc(idProject).set({
            ...project
        })
    } catch (error) {
        console.log(error)
    }
}


export const updateProject = async (uid: string, project: ProjectType, idProject: string) => {
    const dbRef = connection.db.collection(`projects${uid}`).doc(idProject);
    await dbRef.set({
        ...project
    });
}


export const deleteProject = async (uid: string, idProject: string) => {
    const dbRef = connection.db.collection(`projects${uid}`).doc(idProject);
    await dbRef.delete();
}