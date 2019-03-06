const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const server = express();
const PORT = 4000;

const questions = [];

server.use(helmet());
server.use(express.json());
server.use(bodyParser.json());
server.use(cors());
server.use(morgan('combined'));

// retrieve all questions
server.get('/', (req, res) => {
  const qs = questions.map(q => ({
    id: q.id,
    title: q.title,
    description: q.description,
    answers: q.answers.length
  }));
  res.json(qs);
});

// get a specific question
server.get('/:id', (req, res) => {
  const { id } = req.params;
  const question = questions.filter(q => q.id === parseInt(id));
  if (question.length > 1) return res.status(500).send();
  if (question.length === 0) return res.status(404).send();
  res.send(question[0]);
});

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://berto-dev.auth0.com/.well-known/jwks.json`
  }),
  // Validate the audience and the issuer.
  audience: '60Syey3xQNH7oX1m1F8cE922yvVqcut1',
  issuer: `https://berto-dev.auth0.com/`,
  algorithms: ['RS256']
});

//insert a new question
server.post('/', checkJwt, (req, res) => {
  const { title, description } = req.body;
  const newQuestion = {
    id: questions.length + 1,
    title,
    description,
    answers: []
  };
  questions.push(newQuestion);
  res.status(200).send();
});

//inser a new answer to a question
server.post('/answer/:id', checkJwt, (req, res) => {
  const { answer } = req.body;
  const { id } = req.params;

  const question = questions.filter(q => q.id === parseInt(id));
  if (question.length > 1) return res.status(500).send();
  if (question.length === 0) return res.status(404).send();

  question[0].answers.push({
    answer
  });

  res.status(200).send();
});

//start server
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
