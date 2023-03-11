const router = require("express").Router();
// import models
const Watchlist = require("../models/Watchlists");
const Stock = require("../models/WatchlistStock");

// get all watchlists
router.get("/", (req, res) => {
    Watchlist.find()
        .then(watchlists => {
            res.status(200).json(watchlists);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// get a watchlist by id
router.get("/:id", (req, res) => {
    Watchlist.findById(req.params.id)
        .then(watchlist => {
            res.status(200).json(watchlist);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// add a watchlist to mongoose if same name does not exist
router.post("/", (req, res) => {
    Watchlist.find({ name: req.body.name })
        .then(watchlist => {
            if (watchlist.length === 0) {
                const watchlist = new Watchlist({
                    name: req.body.name
                });
                watchlist.save()
                    .then(watchlist => {
                        res.status(200).json(watchlist);
                    })
                    .catch(err => {
                        res.status(400).send(err);
                    });
            } else {
                res.status(400).send("Watchlist already exists");
            }
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// delete a watchlist from mongoose and all stocks associated with it
router.delete("/:id", (req, res) => {
    Watchlist.findByIdAndDelete(req.params.id)
        .then(watchlist => {
            if (watchlist !== null) {
                Stock.deleteMany({ listId: req.params.id })
                    .then(() => {
                        res.status(200).send("Watchlist deleted");
                    })
                    .catch(err => {
                        res.status(400).send(err);
                    });
            } else {
                res.status(400).send("Watchlist does not exist");
            }
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// update a watchlist name
router.put("/:id", (req, res) => {
    Watchlist.findByIdAndUpdate(req.params.id, { name: req.body.name })
        .then(r => {
            Watchlist.findById(req.params.id)
                .then(watchlist => {
                    res.status(200).json(watchlist);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        })
        .catch(err => {
            res.status(400).send(err);
        });
});



module.exports = router;