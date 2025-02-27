import imageCompression from "browser-image-compression";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";

export const uploadImageOnFirebaseStorage = async (base64Image, websiteId, uniqueFilename) => {
  try {
    // Generate a unique filename by appending Date.now() to the original name.
    const storageRef = ref(storage, `website-builder/${websiteId}/images/${uniqueFilename}`);

    // Extract the Base64 data (remove "data:image/png;base64," prefix)
    const base64Data = base64Image.split(",")[1];

    // Convert Base64 string to Blob
    const blob = base64ToBlob(base64Data, "image/png");

    // Convert Blob to File
    const file = new File([blob], uniqueFilename, { type: "image/png" });

    // Compress the image to reduce file size and speed up upload
    const compressedFile = await compressImage(file);

    // Upload the compressed file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, compressedFile);

    // Retrieve the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("Image uploaded successfully:", downloadURL);
    return downloadURL
  } catch (error) {
    console.error("Error uploading Base64 image:", error);
    throw error;
  }
};

// Compress the image using browser-image-compression
const compressImage = async (file) => {
  try {
    const options = {
      maxSizeMB: 1,          // Compress to a maximum of 1 MB (adjust as needed)
      maxWidthOrHeight: 1024,  // Limit maximum dimensions for faster upload
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Error compressing image:", error);
    throw error;
  }
};

// Convert a Base64 string to a Blob
const base64ToBlob = (base64, contentType = "") => {
  const byteCharacters = atob(base64);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length).fill(0).map((_, i) => slice.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: contentType });
};




export const uploadImageOnFirebaseStorageServices = async (file, websiteId, uniqueFilename) => {
  try {
    const storageRef = ref(storage, `website-builder/${websiteId}/images/${uniqueFilename}`);
    
    // Compress before upload
    const compressedFile = await compressImage1(file);
    
    // Upload compressed file directly
    const snapshot = await uploadBytes(storageRef, compressedFile);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

const compressImage1 = async (file) => {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };
  return imageCompression(file, options);
};