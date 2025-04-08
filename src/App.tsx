
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks/hooks';



function App() {
  const dispatch = useAppDispatch();
  const prices = useAppSelector(state => state.ticker);
  useEffect(() => {
    dispatch({ type: 'app/startWebSocket' });
  }, [dispatch]);

  return (
    <>

    </>
  )
}

export default App
