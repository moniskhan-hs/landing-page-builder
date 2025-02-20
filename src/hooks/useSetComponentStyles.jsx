import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeHero } from '../redux/reducers/universalStyles';

const useSetComponentStyles = ({ updates,setHandler }) => {
  console.log('updates in services:', updates)
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
      dispatch(setHandler(validUpdates));
    }
  }, [updates, dispatch,setHandler]);
};

export default useSetComponentStyles;
