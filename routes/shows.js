const express = require("express");
const router = express.Router();
const { Show } = require("../models/index");


router.route("/").get(async (req, res) => {
  const shows = await Show.findAll();
  res.json(shows);
});

router
  .route("/:id")
  .get(async (req, res) => {
    const show = await Show.findByPk(req.params.id);

    if (show instanceof Show) {
      res.json(show);
    } else {
      res.send(`Show with the id: ${req.params.id} was not found!`);
    }
  })
  .delete(async (req, res) => {
    const show = await Show.findByPk(req.params.id);

    if (show instanceof Show) {
      await show.destroy();
      res.send(`Show with the id: ${req.params.id} was deleted`);
    } else {
      res.send(`Show with the id: ${req.params.id} was not found!`);
    }
  });

router.put("/:id/watched", async (req, res) => {
  const show = await Show.findByPk(req.params.id);

  if (show instanceof Show) {
    show.status = "watched";
    await show.save();
    res.send(`Show with the id: ${req.params.id} was successfully updated!`);
  } else {
    res.send(`Show with the id: ${req.params.id} was not found!`);
  }
});

router.put("/:id/updates", async (req, res) => {
  const show = await Show.findByPk(req.params.id);

  if (show instanceof Show) {
    if (show.status == "on-going") {
      show.status = "canceled";
    } else {
      show.status = "on-going";
    }
    await show.save();
    res.send({ updatedShow: show });
  } else {
    res.send(`Show with the id: ${req.params.id} was not found!`);
  }
});

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