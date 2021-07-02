"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _zid = _interopRequireDefault(require("./zid.js"));

var _mail = _interopRequireDefault(require("./mail.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Loyalty = function Loyalty(couponCode) {
  var getAbandondCarts, response, getEmails, i, mailData;
  return regeneratorRuntime.async(function Loyalty$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _zid["default"])());

        case 2:
          getAbandondCarts = _context.sent;

          if (!getAbandondCarts) {
            _context.next = 17;
            break;
          }

          response = getAbandondCarts["abandoned-carts"];

          if (!response) {
            _context.next = 14;
            break;
          }

          getEmails = [];

          for (i = 0; i < response.length; i++) {
            getEmails.push(response[i].customer_email);
          }

          mailData = {
            to: getEmails,
            from: "info@geekcademy.com",
            // Use the email address or domain you verified above
            subject: "Special Offer for you",
            text: "Please use this " + couponCode + " for completing your order",
            html: "Please use this " + couponCode + " for completing your order"
          };
          _context.next = 11;
          return regeneratorRuntime.awrap((0, _mail["default"])(mailData));

        case 11:
          return _context.abrupt("return", _context.sent);

        case 14:
          return _context.abrupt("return", "There was an error getting abandond carts");

        case 15:
          _context.next = 18;
          break;

        case 17:
          return _context.abrupt("return", "There is a server error");

        case 18:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = Loyalty;
exports["default"] = _default;