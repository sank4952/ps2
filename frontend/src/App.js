import Admin from "./components/admin";
import Student from "./components/student";
import FacultyTest from "./components/FacultyTest";
import Results from "./components/results";
import TextGenerator from "./components/Textgenerator";
import ResultDownload from "./components/ResultDownload";
import Test from "./components/test";
import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
function App(){
  return(
  <Router>
    <Routes>
      <Route path='/' element={<Admin/>} />
      <Route path='/student' element={<Student/>} />
      <Route path='/Faculttest' element={<FacultyTest/>}/>
      <Route path='/Results' element={<Results/>}/>
      <Route path='/selftest' element={<TextGenerator/>}/>
      <Route path='/test' element={<Test/>}/>
      <Route path='Results-Download' element={<ResultDownload/>}/>
    </Routes>
  </Router>
  );
}
export default App;