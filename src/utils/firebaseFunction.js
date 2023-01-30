import { doc, setDoc, query, collection, orderBy, getDocs } from "firebase/firestore";
import { firestore } from "../firebase.config";

// Save New Item

export const saveItem = async(data) => {
    await setDoc(doc(firestore, "FoodItems", `${Date.now()}`), data, {
        merge: true,
    });
};

// get all items

export const getAllFoodItems = async() => {
    // const foodRef = ;
    const items = await getDocs(
        query(collection(firestore, "FoodItems"), orderBy("id", "desc"))
    );

    return items.docs.map((doc) => doc.data());
}