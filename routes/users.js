const express = require("express");
const router = express.Router();
const { User, Show } = require("../models/index");

router.route("/").get(async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.route("/:id").get(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.send(`User with the id: ${req.params.id} was not found.`);
  }
});

router.get("/:id/shows", async (req, res) => {
  const user = await User.findByPk(req.params.id, { include: Show });

  if (user) {
    res.json(user);
  } else {
    res.send(`User with the id: ${req.params.id} was not found.`);
  }
});

// Adds show to user
router.put("/:id/shows/:showId", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const show = await Show.findByPk(req.params.showId);

  if (user) {
    if (show) {
      await user.addShow(show);

      res.send(
        `Show with the id of: ${req.params.showId} has been set to 'watched' for user with id: ${req.params.id}.`
      );
    } else {
      res.send(
        `Show with the id: ${req.params.showId} does not exist in database.`
      );
    }
  } else {
    res.send(`User with the id: ${req.params.id} was not found.`);
  }
});

module.exports = router;