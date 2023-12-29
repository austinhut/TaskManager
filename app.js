const TestApplication = require('./middleware/logger');
const fs = require('fs');
const testapplication = new TestApplication();
let data = 'application loaded!\n';

testapplication.on('loadApplication', ()=>{
  fs.appendFile('logger.txt', data, (err)=>{
    if (err){
      throw error;
    }
    else {
      console.log('finished!');
    }
  })
});

testapplication.loadApplication('application is loading...');