// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../App.css';
// const Test= () => {
//   const [topic, setTopic] = useState('');
//   const [maxque,setmaxque]=useState('');
//   const [quizData, setQuizData] = useState(null);
//   const [selectedOption, setSelectedOption] = useState('');
//   const [score, setScore] = useState(0);
//   const [showResult, setShowResult] = useState(false);
//   const[ch,setch]=useState(null);
//   const [answered,Setanswered] = useState(-1);
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
//     Setanswered((answered)=> answered+=1);

//     try {
//       const response = await axios.post('http://localhost:5001/api/generateQuestions', {
//         topic,answered,maxque
//       });
//        setQuizData(response.data);
//       console.log(quizData);
//       setShowResult(false);
//     } catch (error) {
//       console.error('Error fetching questions:', error);
//     }
//   };

//   const handleOptionSelect = (o) => {
//     setSelectedOption(o);
//     if(o===0) setch('A');
//     else if(o===1) setch('B');
//     else if(o===2) setch('C');
//     else if(o===3) setch('D');
//     //setSelectedOption(null);
//   };

//   const handleNextQuestion = () => {
//     // Check if the selected option is correct and update the score
//     Setanswered((answered)=> answered-=1);
//     generateQuestions();
//     setSelectedOption(null);
//   };


//   const Check =()=>{
//     if(selectedOption===null || selectedOption==='') alert("select option");
//     else{
//     if (ch === quizData.correctAnswer && array[answered]===0) {
//       setScore((prevScore) => prevScore + 1);
//       console.log(score);
//     }
//      updateValueAtIndex(answered,1);
//     console.log(array+" "+answered);

//     if(maxque<=answered+1){
//        setShowResult(true);
//     }
//     else{
//       generateQuestions();
//       setSelectedOption(null);
//     }
//   }

//   }

//   useEffect(() => {
//     if (showResult) {
//       alert(`Quiz completed! Your score: ${score}/${maxque}`);
//     }
//   }, [showResult, score,maxque]);

//   return (
//     <div className="container">
//       <h1 className="question">Text Generator</h1>
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
//       updateArray(parseInt(e.target.value));
//     }}
//     placeholder="Enter the number" // Placeholder text
//   />
// </label>

//       <button className="button" onClick={generateQuestions}>Generate Questions </button>

//       {quizData && !showResult && (
//         <div>
//           <h2>Question</h2>
//           <p>{quizData.question}</p>
//           <ul>
//             {quizData.options.map((option, optionIndex) => (
//               <li key={optionIndex}>
//                 <label>
//                   <input
//                   id='ch'
//                     type="radio"
//                     value={option}
//                     onChange={() => handleOptionSelect(optionIndex)}
//                     checked={selectedOption===optionIndex}
//                   />
//                   {option}
//                 </label>
//               </li>
//             ))}
//           </ul>
//           <button className="button" onClick={handleNextQuestion}>Invalid Question</button> 
//           <button className="button" onClick={Check}>CHECK</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Test;
import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './facult.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const FacultyTest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { topic, maxque,rollno,code } = location.state || {};
  console.log(rollno);
  const [quizData, setQuizData] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [ch, setch] = useState(null);
  const [answered, setanswered] = useState(0);
  const [array, setArray] = useState([]);
  const [flag, setFlag] = useState(0);
 
const updateArray = (size) => {
    const newArray = Array.from({ length: size }, () => 0);
    setArray(newArray);
  };

  // Function to update the value at a specific index in the array
  const updateValueAtIndex = (index, value) => {
    const newArray = [...array]; // Copying the array
    newArray[index] = value; // Updating the value at the specified index
    setArray(newArray); // Setting the updated array
  };

  const generateQuestions = async () => {
    setanswered((answered)=> answered+=1);

    try {
      const response = await axios.post('http://localhost:5000/api/generateQuestions', {
        topic,answered,maxque
      });
       setQuizData(response.data);
      console.log(quizData);
      setShowResult(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };
  const starttest=()=>{
       updateArray(maxque);
         generateQuestions();
         setFlag(1);
       }

  const handleOptionSelect = (o) => {
    setSelectedOption(o);
    if(o===0) setch('A');
    else if(o===1) setch('B');
    else if(o===2) setch('C');
    else if(o===3) setch('D');
    //setSelectedOption(null);
  };

  const handleNextQuestion = () => {
    // Check if the selected option is correct and update the score
    setanswered((answered)=> answered-=1);
    generateQuestions();
    setSelectedOption(null);
    setQuizData(null);
  };


  const check =()=>{
    if(selectedOption===null || selectedOption==='') alert("select option");
    else{
    setQuizData(null);
    if (ch === quizData.correctAnswer && array[answered]===0) {
      setScore((prevScore) => prevScore + 1);
      console.log(score);
    }
     updateValueAtIndex(answered,1);
    console.log(array+" "+answered);

    if(maxque==answered){
       setShowResult(true);
    }
    else{
      generateQuestions();
      setSelectedOption(null);
    }
  }

  }
  useEffect(() => {
    const reslult=async()=>{
    if (showResult) {
      alert(`Quiz completed! Your score: ${score}/${maxque} ${rollno}`);
      try{
        const response = await axios.post('http://localhost:5000/result',{code,score,rollno});
        console.log(topic);
        navigate('/Results', { state: {rollno,topic,maxque,score} });
        console.log(response);
      }
      catch(error){
        console.log(error.response);
      }
    }
  }
  reslult();
  }, [showResult, score, maxque,code,rollno]);

  return ( 
    <div className="container">
    {(flag === 0) ? (
      <button onClick={starttest}>Start Test</button>
    ) : (
      <>
        {!quizData ? (
          <div className="loading-spinner">
            <FontAwesomeIcon icon={faSpinner} spin />
          </div>
        ) : (
          <div className='a2'>  
            <h4 className='a4'>{quizData.question}</h4>
            <ul className="options-list">
            {quizData.options.map((option, optionIndex) => (
            <li key={optionIndex}>
              <label className='a1'>
              <input
              type="radio"
              className='radiobtn'
              value={option}  

              onChange={() => handleOptionSelect(optionIndex)}
              checked={selectedOption === optionIndex}
              style={{ marginRight: '12px' }}
              />
              {option}
          </label>
        </li>
))}
</ul>
            <div className="button-container">
              <button className="button" onClick={handleNextQuestion}>Invalid Question</button>
              <button className="button" onClick={check}>CHECK</button>
            </div>
          </div>
        )}
      </>
    )}
  </div>
);
};

export default FacultyTest;

