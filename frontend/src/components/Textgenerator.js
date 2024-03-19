import React, { useState} from 'react';
import {useNavigate } from 'react-router-dom';
import  './testgenerator.css';

const TextGenerator = () => {
  const [topic, setTopic] = useState('');
  const [maxque,setmaxque]=useState('');
  const navigate = useNavigate();

  const generateQuestions = () => {
    navigate('/test', { state: { topic, maxque } });
  };
  


//   return (
//     <div className="container">
//       <h1 className="question">TEST MYSELF</h1>
//       <label className="label">
//   <i>Topic Name:</i>
//   <input 
//     type="text" 
//     className="input-field"  
//     value={topic} 
//     onChange={(e) => setTopic(e.target.value)} 
//     placeholder="Enter your topic here" // Placeholder text
//   />
// </label>

// <label className="label">
//   <i>Number OF Questions:</i>
//   <input 
//     type='text' 
//     className="input-field"  
//     value={maxque} 
//     onChange={(e) => {
//       setmaxque(e.target.value);
//     }}
//     placeholder="Enter the number" // Placeholder text
//   />
// </label>
//       <button className="button" onClick={generateQuestions}>Generate Questions </button>
    
//     </div>
//   );
// };

// export default TextGenerator;




















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './testgenerator.css';

// const TextGenerator = () => {
//   const [topic, setTopic] = useState('');
//   const [maxque, setMaxque] = useState('');
//   const [quizData, setQuizData] = useState(null);
//   const [selectedOption, setSelectedOption] = useState('');
//   const [score, setScore] = useState(0);
//   const [showResult, setShowResult] = useState(false);
//   const [ch, setCh] = useState(null);
//   const [answered, setAnswered] = useState(-1);
//   const [array, setArray] = useState([]);

//   // Function to update the array with zeros of specified size
//   const updateArray = (size) => {
//     const newArray = Array.from({ length: size }, () => 0);
//     setArray(newArray);
//   };

//   // Function to update the value at a specific index in the array
//   const updateValueAtIndex = (index, value) => {
//     const newArray = [...array]; // Copying the array
//     newArray[index] = value; // Updating the value at the specified index
//     setArray(newArray); // Setting the updated array
//   };

//   const generateQuestions = async () => {
//     setAnswered((answered) => answered += 1);

//     try {
//       const response = await axios.post('http://localhost:5001/api/generateQuestions', {
//         topic,
//         answered,
//         maxque
//       });
//       setQuizData(response.data);
//       setShowResult(false);
//     } catch (error) {
//       console.error('Error fetching questions:', error);
//     }
//   };

//   const handleOptionSelect = (o) => {
//     setSelectedOption(o);
//     if (o === 0) setCh('A');
//     else if (o === 1) setCh('B');
//     else if (o === 2) setCh('C');
//     else if (o === 3) setCh('D');
//   };

//   const handleNextQuestion = () => {
//     setAnswered((answered) => answered -= 1);
//     generateQuestions();
//     setSelectedOption(null);
//   };

//   const check = () => {
//     if (selectedOption === null || selectedOption === '') {
//       alert("Select an option");
//     } else {
//       if (ch === quizData.correctAnswer && array[answered] === 0) {
//         setScore((prevScore) => prevScore + 1);
//       }
//       updateValueAtIndex(answered, 1);
//       if (maxque <= answered + 1) {
//         setShowResult(true);
//       } else {
//         generateQuestions();
//         setSelectedOption(null);
//       }
//     }
//   };

//   useEffect(() => {
//     if (showResult) {
//       alert(`Quiz completed! Your score: ${score}/${maxque}`);
//     }
//   }, [showResult, score, maxque]);

//   useEffect(() => {
//     updateArray(parseInt(maxque));
//   }, [maxque]);

  return (
    <div className="tg">
      <h1 className="question">Text Generator</h1>
      <label className="tg1">
        <i >Topic Name:</i><br /><br />
        <input
          type="text"
          className="input-field2"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter your topic here" // Placeholder text
        />
      </label>
      <br />
      <label className="tg1">
        <i>Number OF Questions:</i><br /><br />
        <input
          type='text'
          className="input-field2"
          value={maxque}
          onChange={(e) => setmaxque(e.target.value)}
          placeholder="Enter the number" // Placeholder text
        />
      </label>
      

      <button className="button1" onClick={generateQuestions}>Generate Questions</button>
    </div>
  );
};

export default TextGenerator;





