// import React, {useState } from "react";
// import './admin.css';
// import axios from 'axios';
// function Admin() {
//   const [topic, setTopic] = useState('');
//   const [maxque, setMaxque] = useState('');
//   const [uniqueCode, setUniqueCode] = useState('');

//   const handleClick = async () => {
//     const generatedCode = Math.random().toString(36).substring(2, 10).toLowerCase() + 's';
//     setUniqueCode(generatedCode);
//     try {
//       const response = await axios.post('http://localhost:5000/setroom', { topic, maxque, generatedCode });
//       console.log('Response from server:', response);
//     } catch (error) {
//       console.error('Error:', error.response);
//     }
//     console.log(topic);
//   };

//   return (
//     <div className="container">
//       {!uniqueCode ? (
//         <>
//           <h1>Test Organizer</h1>
//           <label>Enter Topic</label>
//           <input type="text" value={topic} className="textfield" onChange={(e) => setTopic(e.target.value)} />
//           <label>Enter Number of Questions</label>
//           <input type="text" value={maxque} className="textfield" onChange={(e) => setMaxque(e.target.value)} />
//           <center><button type="button" onClick={handleClick}>Start Test</button></center>
//         </>
//       ) : (
//         <div>
//           <center><h1><b>Unique Code </b></h1></center>
//          <center><h2> <span>{uniqueCode}</span></h2></center>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Admin;
import React, { useState } from "react";
import axios from 'axios';
import './admin.css';

function Admin() {
  const [topic, setTopic] = useState('');
  const [maxque, setMaxque] = useState('');
  const [uniqueCode, setUniqueCode] = useState('');

  const handleClick = async () => {
    const generatedCode = Math.random().toString(36).substring(2, 10).toLowerCase() + 's';
    setUniqueCode(generatedCode);
    try {
      const response = await axios.post('http://localhost:5000/setroom', { topic, maxque, generatedCode });
      console.log('Response from server:', response);
    } catch (error) {
      console.error('Error:', error.response);
    }
    console.log(topic);
  };

  return (
    <div className="container2">
      {!uniqueCode ? (
        <>
          <h1>Test Organizer</h1>
          <label>Enter Topic</label>
          <input type="text" value={topic} className="textfield1" onChange={(e) => setTopic(e.target.value)} />
          <label>Enter Number of Questions</label>
          <input type="text" value={maxque} className="textfield1" onChange={(e) => setMaxque(e.target.value)} />
          <center><button type="button" onClick={handleClick}>Start Test</button></center>
        </>
      ) : (
        <div>
          <center><h1><b>Unique Code </b></h1></center>
         <center><h2> <span>{uniqueCode}</span></h2></center>
        </div>
      )}
    </div>
  );
}

export default Admin;



