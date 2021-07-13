const express = require('express')
const cors = require('cors')
const createRoom = require('../controllers/create-room')
const joinRoom = require('../controllers/join-room')


const router = express.Router();
router.use(cors());
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get(
  '/join',
  joinRoom
);
router.post(
  '/home',
  createRoom
);

module.exports = router;
