const express = require('express');
const mongoose = require('mongoose');
const cors =require('cors');
const app = express();
const OpenAI=require('openai');
const PORT = process.env.PORT || 5000;
app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb+srv://vardhanjay84:U4FD81ubMhrTmo5I@cluster0.ktrkfrk.mongodb.net/cluster0?')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));
const openai = new OpenAI({
  apiKey:"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"
})

// Define mongoose schema
const studentSchema = new mongoose.Schema({
  rollNumber: {
    type:String,
    unique:true
  },
  marks: Number,
  topic: String,
  maxque: Number
});

// Create mongoose model
// const Student = mongoose.model('Student', studentSchema);

// Middleware to parse JSON bodies
app.use(express.json());

// Define the POST route
app.post('/setroom', async (req, res) => {
  const { topic, maxque, generatedCode } = req.body;
  const rollNumber = "0";
  const marks = 0;
  try {
    // Create a collection
    const StudentCollection = mongoose.model(generatedCode,studentSchema);
    console.log(StudentCollection);
    await StudentCollection.createCollection();
    console.log(`Collection created successfully ${generatedCode}`);
    const newStudent = new StudentCollection({
      rollNumber,
      marks,
      topic,
      maxque: parseInt(maxque), // Convert maxque to a number
    });
    try {
      const savedStudent = await newStudent.save();
      console.log('Student saved successfully:', savedStudent);
      res.status(200).json(savedStudent); // Send success response
    } catch (error) {
      console.error('Error saving student:', error);
      res.status(500).json({ error: 'Error saving student' }); // Send error response
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' }); // Send internal server error response
  }
});

app.post('/auth', async (req, res) => {
    const { code,rollno } = req.body;
    console.log(code);
    try {
      // Check if the collection exists
      const collections = await mongoose.connection.db.listCollections().toArray();
      const collectionExists = collections.some(collection => collection.name === code);
      
      if (collectionExists) {
        console.log(`Collection '${code}' exists`);
        try
       {
         const StudentCollection = mongoose.model(code, studentSchema);
          console.log(StudentCollection);
          const student = await StudentCollection.findOne({});
          const studentt = await StudentCollection.findOne({ rollNumber: rollno});
          if(!studentt)
        {
            const newStudent = new StudentCollection({
            rollNumber:rollno, // Assuming rollno is the property name in the schema
            marks: student.marks,
            topic: student.topic,
            maxque: parseInt(student.maxque) // Convert maxque to a number
          });
          res.status(200).json({ message: 'Take Test', maxque: student.maxque,topic:student.topic});
      
        const savedStudent = await newStudent.save();
        console.log(savedStudent);
      }
      else res.status(201).json({ message: 'Student Exist' });
       } 
      catch (error) {
          console.error("Error finding student:", error);
          //res.status(500).json({ error: 'Error finding student' });
      }
    }
    else {
        console.log(`Collection '${code}' does not exist`);
        res.status(404).json({ message: 'Collection does not exist' });
      }
    } catch (error) {
      console.error('Error checking collection:', error);
      res.status(500).json({ message: 'Error checking collection' });
    }
  });
  

  app.post('/api/generateQuestions', async (req, res) => {
    try {
      const { topic,answered,maxque } = req.body;
      const prompt = `
      Generate a multiple-choice quiz on the topic of "${topic}" with the following requirements:
      
      1. Generate a question related to ${topic} with difficulty level  ${answered} of ${maxque}
      2. Provide four multiple-choice options for the question.
      3. Ensure one of the options is the correct answer.
      4.Do not repact the same question
      
      Question: ${topic}
      Options:
          A) [Option 1]
          B) [Option 2]
          C) [Option 3]
          D) [Option 4]
      
      Correct Answer: [Correct Option]
      `;
      const response = await openai.chat.completions.create({
          model:'gpt-3.5-turbo-0125',
          messages:[{"role":"user","content":prompt}],
          max_tokens:100,
        });
      const resultText =response.choices[0].message.content ;
      const lines = resultText.split('\n');
  
      const optionsStartIndex = lines.findIndex(line => line.startsWith('Options:'));
      
      if (optionsStartIndex !== -1) {
        const question = lines[0].replace('Question: ', '');
        
        // Extract options
        const options = [];
        for (let i = optionsStartIndex + 1; i < optionsStartIndex + 5; i++) {
          const optionMatch = lines[i].match(/^\s*([A-D])\)\s*(.+)$/);
          if (optionMatch) {
            const [,optionLetter, optionText] = optionMatch;
            options.push(`${optionText}`);
          } else {
            console.error(`Failed to parse option: ${lines[i]}`);
          }
        }
      
        // Extract correct answer
        const correctAnswerMatch = lines[lines.length - 1].match(/Correct Answer: ([A-D])\)/);
        const correctAnswer = correctAnswerMatch ? correctAnswerMatch[1] : null;
      
        console.log("Question:", question);
        console.log("Options:", options);
        console.log("Correct Answer:", correctAnswer);
        res.send({question,options,correctAnswer});
      } else {
        console.error("Options not found in the result text.");
      }
  } catch (error) {
      console.error('Error generating questions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.post('/result', async (req, res) => {
    const { code, rollno, score } = req.body;
    const Code = mongoose.model(code,studentSchema);
    try {
      // Find the document by rollno
      const existingCode = await Code.findOne({ rollNumber: rollno });
      console.log(existingCode);
      if (!existingCode) {
        return res.status(404).json({ message: 'Code not found' });
      }
  
      // Update the marks with the new score
      existingCode.marks = score;
  
      // Save the updated document
      await existingCode.save();
      console.log(existingCode);
      res.status(200).json({ message: 'Marks updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

//excel
app.post('/searchCollections', async (req, res) => {
  try {
    const searchText = req.body.searchText;
    console.log('Search text:', searchText);
    const ne =mongoose.model(searchText,studentSchema);
    // Pass the MongoDB model 'usermodel' to the fetchCollectionData function
    const collectionData = await fetchCollectionData(ne);
    console.log(collectionData);
    
    res.json(collectionData);
  } catch (error) {
    console.error('Error searching collections:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Function to fetch collection data from MongoDB
async function fetchCollectionData(collectionModel) {
  try {
    // Check if collectionModel is a valid model
    if (typeof collectionModel.find !== 'function') {
      throw new Error('Invalid MongoDB model');
    }

    const collectionData = await collectionModel.find({}).exec();
    return collectionData;
  } catch (error) {
    console.error('Error fetching collection data:', error);
    throw error;
  }
}












// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
