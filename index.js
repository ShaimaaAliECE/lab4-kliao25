const express = require('express');
const qList = require('./questions.json');

const server = express();

//Serve static contents
server.use(express.static('static'));

//Dynamic handling
server.get('/questions', (req,res) => {
    let qAns = JSON.parse(JSON.stringify(qList));
    for(i in qAns)
    {
        delete qAns[i].answerIndex;
    }
    res.json(qAns); 
})

server.get('/answers', (req,res) => {
    let qIndex = req.query.q;
    let aIndex = req.query.a;
    let results = "";
    let question = qList[qIndex];

    if(question.answerIndex == aIndex)
    {
        ////Display result if right and go on to next question
        results = "Correct! " + qIndex;
    }
    else
    {
        //Display result if wrong and go on to next question
        results = "Incorrect! " + qIndex;
    }
    res.send(results);
})

server.listen(80);