/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { setDisplayContagionMap } from 'routes/MainPage/components/ContagiosIFrame/modules/actions';
import { useDispatch } from 'react-redux';

/**
 * @name Map
 *
 * @returns {JSX}
 */

const Map = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDisplayContagionMap(true));
    return () => dispatch(setDisplayContagionMap(false));
  }, []);
  return null;
};

export default Map;
