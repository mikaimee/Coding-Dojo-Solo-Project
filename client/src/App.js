import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import DisplayAll from './components/DisplayAl';
import CreateRecipe from './components/CreateRecipe';
import OneRecipe from './components/OneRecpe';
import EditRecipe from './components/EditRecipe';
import Register from './components/Register';
import Login from './components/Login';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path='/recipes' element={<DisplayAll/>} />
          <Route path='/recipes/create' element={<CreateRecipe />} />
          <Route path="/recipes/:id" element={<OneRecipe/>} />
          <Route path="/recipes/:id/edit" element={< EditRecipe/>} />
          <Route path="/recipes/register" element={< Register/>} />
          <Route path="/recipes/login" element={< Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
