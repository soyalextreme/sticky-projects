import { CategoriesType } from "../../types";
import connection from "./connection";


export const getCategories = async (uid: string) => {
    const snapshot = await connection.db.collection(`categories${uid}`).get();
    return snapshot.docs.map(doc => doc.data())
}


export const addCategories = async (uid: string, category: CategoriesType, uidCategory: string) => {
    try {
        await connection.db.collection(`categories${uid}`).doc(uidCategory).set({
            ...category
        })
    } catch (error) {
        console.log(error)
    }
}


export const updateCategory = async (uid: string, category: CategoriesType, idCategory: string) => {
    const dbRef = connection.db.collection(`categories${uid}`).doc(idCategory);
    await dbRef.set({
        ...category
    });
}


export const deleteCategory = async (uid: string, idCategory: string) => {
    const dbRef = connection.db.collection(`categories${uid}`).doc(idCategory);
    await dbRef.delete();
}