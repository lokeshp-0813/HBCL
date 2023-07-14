const express = require('express')
const teamRoutes = express.Router();
const {flattenObject} = require('../utils/util.js')
const fs = require('fs')
let dataPath = '/../data/teams.json'
dataPath = __dirname + dataPath


const saveTeam = (data) => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync( dataPath, stringifyData)
}


const getAllTeams = () => {
  const data = fs.readFileSync( dataPath)
  return JSON.parse(data)
}

//get teams
teamRoutes.get('/team/list', (req, res) => {
  console.log('list')
  const team = getAllTeams()
  res.send(team)
})


teamRoutes.get('/team', (req, res) => {
  console.log('teams')
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    res.send(JSON.parse(data));
  });
});

//get team by id
teamRoutes.get('/team/:id', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    let existingTeams = getAllTeams()
 
    const teamId = req.params['id'];

 
    res.send(existingTeams[teamId])
  }, true);
});


// save team
teamRoutes.post('/team/addteam', (req, res) => {
   
  let existingTeams = getAllTeams()
  const newTeamId = Math.floor(100000 + Math.random() * 900000)
 
  existingTeams[newTeamId] = req.body
   
  console.log(existingTeams);

  saveTeam(existingTeams);
  res.send({success: true, msg: 'team data added successfully'})
})

// update a team
teamRoutes.put('/team/update/:id', (req, res) => {
  let existingTeams = getAllTeams()
  fs.readFile(dataPath, 'utf8', (err, data) => {
   const teamId = req.params['id'];
   existingTeams[teamId] = req.body;

   saveTeam(existingTeams);
   res.send(`team with id ${teamId} has been updated`)
 }, true);
});

//delete a team
teamRoutes.delete('/team/delete/:id', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
   let existingTeams = getAllTeams()

   const teamId = req.params['id'];

   delete existingTeams[teamId];  
   saveTeam(existingTeams);
   res.send(`team with id ${teamId} has been deleted`)
 }, true);
})

module.exports = teamRoutes;