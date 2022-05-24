const { Router } = require("express");
const { findById } = require("../models/subscriber");

const subscriberRouter = Router();
const Subscriber = require("../models/subscriber");

// MIDDLEWARE: get subscriber by id
// eslint-disable-next-line consistent-return
async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: "Subscriber not found." });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
  res.subscriber = subscriber;
  next();
}

// ROUTES
// Getting all subscribers
subscriberRouter.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    return res.json(subscribers);
  } catch (error) {
    return res.status(500).json(error);
  }
});
// Getting a subscriber
subscriberRouter.get("/:id", getSubscriber, (req, res) => {
  res.json(res.subscriber);
});
// Creating a subscriber
subscriberRouter.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (error) {
    return res.status(400).json(error);
  }
});
// Updating a subscriber
subscriberRouter.patch("/:id", getSubscriber, async (req, res) => {
  if (req.body.name != null) res.subscriber.name = req.body.name;
  if (req.body.subscribedToChannel != null)
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (error) {
    res.status(400).json(error);
  }
});
// Deleting a subscriber
subscriberRouter.delete("/:id", getSubscriber, async (req, res) => {
  try {
    res.subscriber.remove();
    res.status(200).json("Subscriber Deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = subscriberRouter;
