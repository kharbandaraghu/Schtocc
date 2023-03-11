const router = require("express").Router();
// imports
const watchlistStocks = require("./controllers/WatchlistStock");
const watchlists = require("./controllers/Watchlists");
const portfolios = require("./controllers/Portfolio");

router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
});

// Routes
// route for watchlists
router.use("/watchlist-stocks", watchlistStocks);
router.use("/watchlists", watchlists);
// routes for portfolios
router.use("/portfolios", portfolios);

module.exports = router;