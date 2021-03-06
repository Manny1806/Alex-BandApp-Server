'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Band = require('../models/bands');
const User = require('../models/users')

const router = express.Router();

/* ========== Get Bands ========== */
router.get('/', (req, res, next) => {
  
  Band.find()
    .sort({ createdAt: 'desc' })
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

router.post('/checkNameExist', (req, res) =>{
  return Band.find({name: req.body.name}).count()
    .then((count) => res.json(count))
})

router.post('/checkUrlExist', (req, res) =>{
  return Band.find({bandUrl: req.body.bandUrl}).count()
    .then((count) => res.json(count))
})

/* ========== Get Single Band ========== */
router.get('/:name', (req, res, next) => {
  
  const { name } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     const err = new Error('The `id` is not valid');
//     err.status = 400;
//     return next(err);
//   }

  Band.find({bandUrl: name})
    .then(results => {
      console.log(results)
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});


/* ========== Create Band ========== */
router.post('/', (req, res, next) => {
  
  const {username, bandName: name, bandUrl, bannerUrl} = req.body;
  console.log(req.body)
  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }
  const newBand = { name, bandUrl, bannerUrl };

  Band.create(newBand)
    .then(result => {
      res
        .location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(err => {
      next(err);
  });


});

// /* ========== PUT/UPDATE A SINGLE ITEM ========== */
// router.put('/:id', (req, res, next) => {
//   const { id } = req.params;
//   const { message, mediaUrl } = req.body;

//   /***** Never trust users - validate input *****/
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     const err = new Error('The `id` is not valid');
//     err.status = 400;
//     return next(err);
//   }

//   const updatePost = { message, mediaUrl };

//   Post.findByIdAndUpdate(id, updatePost, { new: true })
//     .then(result => {
//       if (result) {
//         res.json(result);
//       } else {
//         next();
//       }
//     })
//     .catch(err => {
//       next(err);
//     });
// });

// /* ========== Delete Post ========== */
// router.delete('/:id', (req, res, next) => {
//   const { id } = req.params;

//   /***** Never trust users - validate input *****/
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     const err = new Error('The `id` is not valid');
//     err.status = 400;
//     return next(err);
//   }

//   Post.findByIdAndRemove(id)
//     .then(() => {
//       res.sendStatus(204);
//     })
//     .catch(err => {
//       next(err);
//     });
// });


module.exports = router;