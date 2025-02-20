/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

// Create the context
const FileManagerContext = createContext();

// Provider component
export const FileUploadProvider = ({ children }) => {
  const [uploadedImages, setUploadedImages] = useState({
    hero: {},
    services: {},
  });

  // Add a file to a category
  const addFile = (file, category) => {
    setUploadedImages((prev) => {
      const categoryFiles = prev[category] || {};
      const newIndex = Object.keys(categoryFiles).length;
      return {
        ...prev,
        [category]: {
          ...categoryFiles,
          [newIndex]: file,
        },
      };
    });
  };

  // Remove a file from a category
  const removeFile = (category, index) => {
    setUploadedImages((prev) => {
      const updatedCategory = { ...prev[category] };
      delete updatedCategory[index];
      return {
        ...prev,
        [category]: updatedCategory,
      };
    });
  };

  // Upload all images to Firebase Storage and save download URLs to Firestore
//   const uploadImagesAndSaveToFirestore = async () => {
//     const uploadPromises = [];

//     for (const category in uploadedImages) {
//       const categoryFiles = uploadedImages[category];
//       for (const index in categoryFiles) {
//         const file = categoryFiles[index];
//         const storageRef = ref(
//           storage,
//           `uploads/${category}/${Date.now()}_${file.name}`
//         );
//         const uploadPromise = uploadBytes(storageRef, file)
//           .then((snapshot) => getDownloadURL(snapshot.ref))
//           .then((downloadURL) => {
//             const docRef = doc(db, "uploads", category);
//             // Save URL under a dynamic field name
//             return setDoc(
//               docRef,
//               { [`file_${index}`]: downloadURL },
//               { merge: true }
//             );
//           })
//           .catch((error) => {
//             console.error("Error uploading file:", error);
//           });
//         uploadPromises.push(uploadPromise);
//       }
//     }

//     await Promise.all(uploadPromises);
//     console.log("All images uploaded and URLs saved to Firestore.");
//   };

  return (
    <FileManagerContext.Provider
      value={{ uploadedImages, addFile, removeFile }}
    >
      {children}
    </FileManagerContext.Provider>
  );
};

// Custom hook for using the context
export const useFileUpload = () => useContext(FileManagerContext);
