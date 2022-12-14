const express = require("express");
const router = express.Router();
const { Show } = require("../models/index");
const { check, validationResult } = require("express-validator");


router.route("/").get(async (req, res) => {
  const shows = await Show.findAll();
  res.json(shows);
});

router
  .route("/:id")
  .get(async (req, res) => {
    const show = await Show.findByPk(req.params.id);

    if (show) {
      res.json(show);
    } else {
      res.send(`Show with the id: ${req.params.id} was not found.`);
    }
  })
  .delete(async (req, res) => {
    const show = await Show.findByPk(req.params.id);

    if (show) {
      await show.destroy();
      res.send(`Show with the id: ${req.params.id} was deleted.`);
    } else {
      res.send(`Show with the id: ${req.params.id} was not found.`);
    }
  });

router.put("/:id/watched", async (req, res) => {
  const show = await Show.findByPk(req.params.id);

  if (show) {
    show.status = "watched";
    await show.save();
    res.send(`Show with the id: ${req.params.id} was successfully updated.`);
  } else {
    res.send(`Show with the id: ${req.params.id} was not found.`);
  }
});

router.put("/:id/watched", [
  check("rating").not().isEmpty().trim()]
, async (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
  res.json({error: errors.array()})
  } else {
  const showToUpdate = await Show.findByPk(req.params.id);
    if(showToUpdate.userId === null) {
      res.json("show not yet watched")
    } else {
    
    
    const updatedShow = await showToUpdate.update({
      rating: req.body.rating
    })
    res.json(updatedShow)
    }
  }
  
})

router.route("/genres/:genre").get(async (req, res) => {
  const showsInGenre = await Show.findAll({
    where: {
      Genre: req.params.genre,
    },
  });

  if (showsInGenre.length > 0) {
    res.json(showsInGenre);
  } else {
    res.send("There are no shows with this genre.");
  }
});

module.exports = router;