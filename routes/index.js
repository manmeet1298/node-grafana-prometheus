var express = require('express');
var router = express.Router();

router.get('/ping', function (req, res, next) {
  res.status(200).json({
    message: "Server is healthy"
  })
});

let getRandomNumber = () => {
  return Math.floor(Math.random() * 6) + 2;
}

let slowTask = (time) => {
  console.log(time);
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(time), time * 1000)
  });
}

let failTask = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(time), time * 1000)
  });
}

router.get('/slow-task', async function (req, res) {
  slowTask(0).then((val) => {
    res.status(200).json({
      data: val
    });
  }).catch((reject) => {
    res.status(400).json({
      status: 'failed',
      err: reject
    });
  });
  
});


router.get('/fail-task', async function (req, res) {
  failTask(0).then((val) => {
    res.status(200).json({
      data: val
    });
  }).catch((reject) => {
    res.status(500).json({
      status: 'failed',
      err: reject
    });
  });;
});

module.exports = router;
