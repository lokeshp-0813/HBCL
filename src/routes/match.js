const express = require('express')
const matchRoutes = express.Router();
const moment = require('moment')
const fs = require('fs')
let dataPath = '/../data/match.json'
dataPath = __dirname + dataPath


const saveMatch = (data) => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync(dataPath, stringifyData)
}


const getAllMatches = () => {
  const data = fs.readFileSync(dataPath)
  return JSON.parse(data)
}

//get matches
matchRoutes.get('/match/list', (req, res) => {
  const match = getAllMatches()

  res.send(match)
})

matchRoutes.get('/match', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    let givenDate = '15/07/2023'
    let SpecialTo = moment(givenDate, "DD/MM/YYYY");
    console.log(moment().diff(SpecialTo) > 0)
    res.send(JSON.parse(data));
  });
});

//get todays match
matchRoutes.get('/match/today', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    let matches = JSON.parse(data)
    let matchArray = []
    for(let i in matches){
      matchArray.push(matches[i])
    }
    let todaysMatch = []
    matchArray.forEach(match => {
      let currDate = moment().format('DD/MM/YYYY')
      if(currDate === match.date){
        console.log('todays match', match)
        todaysMatch.push(match)
      }
    })
    res.send({...todaysMatch});
  });
})

//get match by id
matchRoutes.get('/match/:id', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    let existingMatches = getAllMatches()

    const matchId = req.params['id'];

    res.send(existingMatches[matchId])
  }, true);
});


// save match
matchRoutes.post('/match/addmatch', (req, res) => {

  let existingMatches = getAllMatches()
  const newMatchId = Math.floor(100000 + Math.random() * 900000)

  existingMatches[newMatchId] = req.body

  console.log(existingMatches);

  saveMatch(existingMatches);
  res.send({ success: true, msg: 'match data added successfully' })
})

// update a match
matchRoutes.put('/match/update/:id', (req, res) => {
  let existingMatches = getAllMatches()
  fs.readFile(dataPath, 'utf8', (err, data) => {
    const matchId = req.params['id'];
    existingMatches[matchId] = req.body;

    saveMatch(existingMatches);
    res.send(`match with id ${matchId} has been updated`)
  }, true);
});

//delete a match
matchRoutes.delete('/match/delete/:id', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    let existingMatches = getAllMatches()

    const matchId = req.params['id'];

    delete existingMatches[matchId];
    saveMatch(existingMatches);
    res.send(`match with id ${matchId} has been deleted`)
  }, true);
})

module.exports = matchRoutes;