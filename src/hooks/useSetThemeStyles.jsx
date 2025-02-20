import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeTheme } from "../redux/reducers/universalStyles";
import { websiteThemeStyles } from "../styles/component/websiteTheme";

const useSetThemeStyles = ({ updates, targetedElement }) => {
  const dispatch = useDispatch();
    
    
    
    useEffect(() => {
      // Guard: Only update if the targeted element exists in websiteThemeStyles
      if (!websiteThemeStyles[targetedElement]) {
        console.warn(`Targeted element "${targetedElement}" does not exist in websiteThemeStyles.`);
        return;
      }
  
      // Create an object with only the truthy updates
      const validUpdates = Object.keys(updates).reduce((acc, key) => {
        if (updates[key]) {
          acc[key] = updates[key];
        }
        return acc;
      }, {});
  
      if (Object.keys(validUpdates).length > 0) {
        Object.assign(websiteThemeStyles[targetedElement], validUpdates);
              dispatch(changeTheme({ componentName :targetedElement,data:validUpdates}));
            //   console.log('validUpdates: in theme style', validUpdates)
         
    
    }
    }, [updates, targetedElement,dispatch]);
  };
  
  export default useSetThemeStyles