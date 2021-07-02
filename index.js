import express from "express";
import path from "path";
import AbandonedCarts from "./zid.js";
import AddCoupon from "./addCoupon.js";
import sendMail from "./mail.js";
import Loyalty from "./loyality.js";

const __dirname = path.resolve();
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.get("/carts", async (req, res) => {
  const response = await AbandonedCarts();
  const renderedData = response["abandoned-carts"];
  res.render("abandoned", { renderedData });
});

app.get("/", async (req, res) => {
  res.render("index");
});

app.get("/loyalty", async (req, res) => {
  res.render("loyalty");
});

app.get("/coupon", async (req, res) => {
  res.render("coupon");
});

app.get("/error", (req, res) => {
  res.render("error");
});

app.post("/loyalty", async (req, res) => {
  const response = await Loyalty();
  res.send(response);
});

app.post("/add-coupon", async (req, res) => {
  const data = req.body;
  const dataToSend = Object.assign({}, data);
  const response = await AddCoupon(dataToSend);
  if (response) {
    res.redirect("/");
  } else {
    res.redirect("/error");
  }
});

app.post("/mail", async (req, res) => {
  const data = req.body;
  const dataToSend = Object.assign({}, data);
  const send = await sendMail(dataToSend);
  if (send) {
    res.send("mail has been sent");
  } else {
    res.send("there was an error");
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
