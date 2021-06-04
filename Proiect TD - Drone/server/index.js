var api = require('./src/api.js').app;
const fs = require('fs');
const dronesFilepath = './src/drones.json';

api.get('/', function (request, response) {
  response.json('NodeJS REST API');
});

api.get('/drones', function (request, response) {
  response.json(getDrones());
});

api.get('/drones/:id', function (request, response) {
  let drone = getDroneById(request.params.id);
  if (drone) response.json(drone);
  response.json('not found');
});

api.put('/drones', function (request, response) {
  saveDrone(request.body);
  response.json('User was saved succesfully');
});

api.post('/drones', function (request, response) {

  let drone = request.body;
  let drones = getDrones();

  for(let i=0; i < drones.length; i++) {
    if (drones[i].id === drone.id) {
      drones[i] = drone;
    }
  }

  try {
    fs.writeFileSync(dronesFilepath, JSON.stringify(drones));
  } catch (err) {
    console.error(err)
  }

  response.json('Drones were updated succesfully');
});

api.delete('/drones/:index', function (request, response) {

  response.json('User with index ' + request.params.index + ' was deleted');
});

api.listen(3000, function () {
  console.log('Server running @ localhost:3000');
});

function getDrones() {
  let drones = [];
  try {
    drones = JSON.parse(fs.readFileSync(dronesFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return drones;
}

function saveDrone(drone) {
  let drones = getDrones();
  let maxId = getMaxId(drones);
  drone.id = maxId+1;
  drones.push(drone);
  try {
    fs.writeFileSync(dronesFilepath, JSON.stringify(drones));
  } catch (err) {
    console.error(err)
  }
}

function getMaxId(drones) {
  let max = 0;
  for (var i=0; i<drones.length;i++) {
    if(max < drones[i].id) {
      max = drones[i].id;
    }
  }
  return max;
}

function getDroneById(id){
  let drones = getDrones();//
  let selectedDrone = null;
  for(var i=0; i<drones.length; i++) {
    if(id == drones[i].id) selectedDrone = drones[i];
  }
  return selectedDrone;
}
