import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from './componentes/paginas/Registro.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;
