const express = require('express');
const router = express.Router();

/**Methods users */
router.get('/', (req, res)=>{
    res.send('users');
})

module.exports = router;