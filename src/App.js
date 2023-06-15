import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Blank from './pages/Blank';
import Analysis from './pages/Analysis';
import Home from './pages/Home';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout/>}>
          <Route index element={<Home />} />
          <Route path='/analysis' element={<Analysis/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
