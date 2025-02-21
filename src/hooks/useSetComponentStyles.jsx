import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useSetComponentStyles = ({ updates,setHandler,id }) => {
  console.log('updates in set component styles:', updates)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!updates) {
      console.warn(`Please enter values for hero section`);
      return;
    }

    // Filter out undefined updates
    const validUpdates = Object.keys(updates).reduce((acc, key) => {
      if (updates[key] !== undefined) {
        acc[key] = updates[key];
      }
      return acc;
    }, {});

    if (Object.keys(validUpdates).length > 0) {
      dispatch(setHandler({id:id, content:validUpdates}));
    }
  }, [updates, dispatch,setHandler,id]);
};

export default useSetComponentStyles;
