const router = require("express").Router();
// import models
const Portfolio = require("../models/Portfolio");
const PortfolioStock = require("../models/PortfolioStock");

// get all portfolios
router.get("/", (req, res) => {
    Portfolio.find().populate('stocks')
        .then(portfolios => {
            res.status(200).json(portfolios);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// add a portfolio
router.post("/", (req, res) => {
    const newPortfolio = new Portfolio({
        name: req.body.name,
        stocks: req.body.stocks,
        inceptionDate: req.body.inceptionDate,
        revisitDate: req.body.revisitDate,
        rebalancePeriod: req.body.rebalancePeriod,
        modelPortfolio: req.body.modelPortfolio
    });
    newPortfolio.save()
        .then(portfolio => {
            Portfolio.find().populate('stocks')
                .then(portfolio => {
                    res.status(200).json(portfolio);
                })
                .catch(err => {
                    res.send(err);
                });
        })
        .catch(err => {
            res.send(err);
        });
});

// update a portfolio by id
router.put("/:id", (req, res) => {
    Portfolio.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(portfolio => {
            portfolio.populate('stocks').then(portfolio => {
                res.status(200).json(portfolio);
            })
            .catch(err => {
                res.send(err);
            });
        })
        .catch(err => {
            res.send(err);
        });
});

// delete a portfolio by id
router.delete("/:id", (req, res) => {
    Portfolio.findByIdAndDelete(req.params.id)
        .then(portfolio => {
            PortfolioStock.deleteMany({ _id: { $in: portfolio.stocks } })
                .then(() => {
                    Portfolio.find()
                        .then(portfolios => {
                            res.status(200).json(portfolios);
                        })
                        .catch(err => {
                            res.status(400).send(err);
                        });
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        })
        .catch(err => {
            res.send(err);  
        });
});

// --------------------- STOCKS ---------------------

// get a portfolio by id
router.get("/:id/stocks", (req, res) => {
    Portfolio.findById(req.params.id).populate('stocks')
        .then(portfolio => {
            res.status(200).json(portfolio);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// add a stock to portfolio by id
router.post("/:id/stocks", (req, res) => {
    const newStock = new PortfolioStock({
      name: req.body.name,
      ticker: req.body.ticker,
      purchasePrice: req.body.purchasePrice,
      exchange: req.body.exchange,
      unitsHeld: req.body.unitsHeld,
      targetAllocation: req.body.targetAllocation
    });
    
    newStock.save()
      .then(stock => {
        Portfolio.findByIdAndUpdate(req.params.id, {$push: {stocks: stock._id}}, {new: true})
          .populate('stocks')
          .then(portfolio => {
            res.status(200).json(portfolio);
          })
          .catch(err => {
            res.send(err);
          });
      })
      .catch(err => {
        res.send(err);
      });
  });

// update a stock in a portfolio by id
router.put("/:id/stocks/:stockId", (req, res) => {
    PortfolioStock.findOneAndUpdate({_id: req.params.stockId}, req.body, {new: true})
        .then(stock => {
            Portfolio.findById(req.params.id).populate('stocks')
                .then(portfolio => {
                    res.status(200).json(portfolio);
                })
                .catch(err => {
                    res.send(err);
                });
        })
        .catch(err => {
            res.send(err);
        });
});

// delete a stock from a portfolio by id
router.delete("/:id/stocks/:stockId", (req, res) => {
    Portfolio.findByIdAndUpdate(req.params.id, {$pull: {stocks: req.params.stockId}}, {new: true})
        .then(portfolio => {
            PortfolioStock.findByIdAndDelete(req.params.stockId)
                .then(() => {
                    Portfolio.findById(req.params.id).populate('stocks')
                        .then(portfolio => {
                            res.status(200).json(portfolio);
                        })
                        .catch(err => {
                            res.send(err);
                        });
                })
                .catch(err => {
                    res.send(err);
                });
        })
        .catch(err => {
            res.send(err);
        });
});



module.exports = router;