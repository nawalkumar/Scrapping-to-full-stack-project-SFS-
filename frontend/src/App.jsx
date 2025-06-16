import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './components/Home'
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<ItemList />} />
          <Route path="/items/:id" element={<ItemDetail />} />
        </Routes>
      </Router>
    </Provider>
  );
};


export default App;