import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../firebase";

export const deleteImageFromFirebaseStorage = async (websiteId, fileName) => {
    try {
      const storageRef = ref(storage, `website-builder/${websiteId}/images/${fileName}`);
      await deleteObject(storageRef);
      console.log("Image deleted successfully!");
      return true;
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  };