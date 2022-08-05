import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RootRouter from './router';
import { Provider } from 'react-redux';
import { store } from './redux';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <RootRouter />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
