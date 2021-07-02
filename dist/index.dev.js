"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _zid = _interopRequireDefault(require("./zid.js"));

var _addCoupon = _interopRequireDefault(require("./addCoupon.js"));

var _mail = _interopRequireDefault(require("./mail.js"));

var _loyality = _interopRequireDefault(require("./loyality.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _dirname = _path["default"].resolve();

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.set("views", _path["default"].join(_dirname, "views"));
app.set("view engine", "pug");
app.use(_express["default"]["static"](_path["default"].join(_dirname, "public")));
app.get("/carts", function _callee(req, res) {
  var response, renderedData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _zid["default"])());

        case 2:
          response = _context.sent;
          renderedData = response["abandoned-carts"];
          res.render("abandoned", {
            renderedData: renderedData
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.get("/", function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.render("index");

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.get("/loyalty", function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.render("loyalty");

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.get("/coupon", function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res.render("coupon");

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.get("/error", function (req, res) {
  res.render("error");
});
app.post("/loyalty", function _callee5(req, res) {
  var response;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap((0, _loyality["default"])());

        case 2:
          response = _context5.sent;
          res.send(response);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
});
app.post("/add-coupon", function _callee6(req, res) {
  var data, dataToSend, response;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          data = req.body;
          dataToSend = Object.assign({}, data);
          _context6.next = 4;
          return regeneratorRuntime.awrap((0, _addCoupon["default"])(dataToSend));

        case 4:
          response = _context6.sent;

          if (response) {
            res.redirect("/");
          } else {
            res.redirect("/error");
          }

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
});
app.post("/mail", function _callee7(req, res) {
  var data, dataToSend, send;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          data = req.body;
          dataToSend = Object.assign({}, data);
          _context7.next = 4;
          return regeneratorRuntime.awrap((0, _mail["default"])(dataToSend));

        case 4:
          send = _context7.sent;

          if (send) {
            res.send("mail has been sent");
          } else {
            res.send("there was an error");
          }

        case 6:
        case "end":
          return _context7.stop();
      }
    }
  });
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server started on ".concat(port));
});