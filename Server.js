
/*
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json()); // Use JSON middleware

// Connect to MongoDB using Mongoose
const atlasConnectionString = process.env.MONGODB_URI;
mongoose.connect(atlasConnectionString)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const User = mongoose.model('User', {
  name: String,
  email: String,
  phoneNumber: String,
  company: String,
  website: String,
  responses: {
    questions: [
      {
        id: Number,
        key: String,
        question: String,
        options: [
          {
            name: String,
            value: Number,
          },
        ],
      },
    ],
  },
});

// Endpoint to save user data
app.post('/api/saveUserData', async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, phoneNumber, company, website, responses } = req.body;

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      phoneNumber,
      company,
      website,
      responses: {
        questions: responses.questions.map((response) => ({
          id: response.id,
          key: response.key,
          question: response.question,
          options: response.options.map((option) => ({
            name: option.name,
            value: option.value,
          })),
        })),
      },
    });

    // Save the user data to MongoDB
    await newUser.save();

    // Respond with a success message
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve static files from the "public" directory (if needed)
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, this is your server!');
});
*/


const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const BASE_URL=process.env.BASE_URL

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json()); // Use JSON middleware

// Connect to MongoDB using Mongoose
const atlasConnectionString = process.env.MONGODB_URI;
mongoose.connect(atlasConnectionString)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const User = mongoose.model('User', {
  name: String,
  email: String,
  phoneNumber: String,
  company: String,
  website: String,
  responses: {
    questions: [
      {
        id: Number,
        key: String,
        question: String,
        options: [
          {
            name: String,
            value: Number,
          },
        ],
      },
    ],
  },
});


// ... (previous code)

const QuestionList = mongoose.model('QuestionList', {
  question: String,
  id: Number,
  key: String,
  type: String,
  options: [
    {
      name: String,
      value: Number,
      selected: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

app.get('/api/questions', async (req, res) => {
  try {
    const questions = await QuestionList.find();
    res.json({ questions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Endpoint to save user data
app.post('/api/saveUserData', async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, phoneNumber, company, website, responses } = req.body;

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      phoneNumber,
      company,
      website,
      responses: {
        questions: responses.questions.map((response) => ({
          id: response.id,
          key: response.key,
          question: response.question,
          options: response.options.map((option) => ({
            name: option.name,
            value: option.value,
          })),
        })),
      },
    });

    // Save the user data to MongoDB
    await newUser.save();

    // Respond with a success message
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve static files from the "public" directory (if needed)
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, this is your server!');
});
