import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Blank from './pages/Blank';
import Analysis from './pages/Analysis';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout/>}>
          <Route index element={<Blank />} />
          <Route path='/analysis' element={<Analysis/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
