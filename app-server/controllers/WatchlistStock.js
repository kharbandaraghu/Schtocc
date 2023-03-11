const router = require("express").Router();
// import model
const Stock = require("../models/WatchlistStock");
const Watchlist = require("../models/Watchlists");

// get all stocks by watchlist
router.get("/:id", (req, res) => {
  Stock.find({
      listId: req.params.id
    })
    .then(stocks => {
      res.status(200).json(stocks);
    })
    .catch(err => {
      res.send(err);
    });
});

// add a stock to mongoose to multiple watchlists
// this will accept an array of watchlist ids and check for each watchlist whether the stock exists or not
router.post("/", (req, res) => {
  for (let i = 0; i < req.body.listIds.length; i++) {
    const stock = new Stock({
      name: req.body.name,
      ticker: req.body.ticker,
      listId: req.body.listIds[i],
      notes: req.body.notes
    });
    // add to database if stock does not exist in watchlist
    Watchlist.findById(req.body.listIds[i])
      .then(watchlist => {
        if (watchlist !== null) {
          // also check if stock exists in watchlist
          Stock.find({
              listId: req.body.listIds[i],
              ticker: req.body.ticker
            })
            .then(r => {
              if (r.length === 0) {
                stock.save()
                  .catch(err => {
                    res.status(400).send(err);
                    return;
                  });
              }
            });

        } else {
            res.status(400).send("Watchlist does not exist");
            return;
            }
      })
      .catch(err => {
        res.status(400).send(err);
        return;
      });
  }
  res.status(200).send("Stock added to watchlists");
});

// delete a stock from mongoose
router.delete("/:id", (req, res) => {
    Stock.findByIdAndDelete(req.params.id)
        .then(r => {
            res.status(200).send("Stock deleted");
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// update a stock in mongoose
router.put("/:id", (req, res) => {
    Stock.findByIdAndUpdate(req.params.id, req.body)
        .then(r => {
            res.status(200).send({"message": "Stock updated"});
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

module.exports = router;
