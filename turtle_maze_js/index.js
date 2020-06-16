const fs = require('fs');
const turtleMazeRun = require('./run');

fs.readFile('./data/directions-2.txt', 'utf8', (err, direction) => {

  const travel = turtleMazeRun(direction)

  fs.writeFile('./fullPath.json', JSON.stringify(travel.fullPath), err => {
    console.log('travel :>> ', travel.endPoint);
    console.log('travel fullPath:>> ', travel.getGridProps());
  })

})