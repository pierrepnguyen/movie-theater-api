const express = require("express");
const router = express.Router();
const { User, Show } = require("../models/index");
const { check, validationResult } = require("express-validator");

router.route("/").get(async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.route("/:id").get(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user instanceof User) {
    res.json(user);
  } else {
    res.send(`User with the id: ${req.params.id} was not found!`);
  }
});

router.get("/:id/shows", async (req, res) => {
  const user = await User.findByPk(req.params.id, { include: Show });

  if (user instanceof User) {
    res.json(user);
  } else {
    res.send(`User with the id: ${req.params.id} was not found.`);
  }
});

// Adds show to user and sets it to watched
router.put("/:id/shows/:showId", async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (user instanceof User) {
    const show = await Show.findByPk(req.params.showId);

    if (show instanceof Show) {
      await user.addShow(show);

      res.send(
        `Show with the id of: ${req.params.showId} has been set to 'watched' for user with id: ${req.params.id}`
      );
    } else {
      //TODO Maybe change this to be able to add shows to the db
      res.send(
        `Show with the id: ${req.params.showId} does not exist in database.`
      );
    }
  } else {
    res.send(`User with the id: ${req.params.id} was not found!`);
  }
});

module.exports = router;