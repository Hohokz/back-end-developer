import './App.css';
import Header from "./component/header"
import Body from "./component/body"
import Total from './total';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
      </style>
      <BrowserRouter>
        <Routes>
          <Route path='/total' element={<Total />} />
        </Routes>
      </BrowserRouter>
      <Header />
      <Body />
    </div>
  );
}

export default App;
