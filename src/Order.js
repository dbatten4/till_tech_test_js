function Order() {
  this.receipt = {};
  this.grossTotal = new Number;
  this.taxAdded = new Number;
  this.netTotal = new Number;
  this.isFinalised = false;
}

var cafeData = [
  {
    "shopName": "The Coffee Connection",
    "address": "123 Lakeside Way",
    "phone": "16503600708",
    "prices": [
      {
        "Cafe Latte": 4.75,
        "Flat White": 4.75,
        "Cappucino": 3.85,
        "Single Espresso": 2.05,
        "Double Espresso": 3.75,
        "Americano": 3.75,
        "Cortado": 4.55,
        "Tea": 3.65,
        "Choc Mudcake": 6.40,
        "Choc Mousse": 8.20,
        "Affogato": 14.80,
        "Tiramisu": 11.40,
        "Blueberry Muffin": 4.05,
        "Chocolate Chip Muffin": 4.05,
        "Muffin Of The Day": 4.55
      }
    ]
  }
];
var menu = cafeData[0].prices[0];
var DEFAULT_TAX = 0.0864;

Order.prototype.receiveOrder = function(item, quantity) {
  itemCheck(item);
  this.itemAdd(item, quantity);
  this.grossTotal += menu[item]
};

Order.prototype.finaliseOrder = function() {
 this.taxAdded = parseFloat((this.grossTotal * DEFAULT_TAX).toFixed(2));
 this.netTotal = parseFloat((this.grossTotal += this.taxAdded).toFixed(2)); 
 this.isFinalised = true;
};

Order.prototype.itemAdd = function(item, quantity) {
  if(this.receipt.hasOwnProperty(item)) { 
    this.receipt[item] += quantity;
  } else { 
    this.receipt[item] = quantity;
  };
};

Order.prototype.receivePayment = function(amount) {
  if(!this.isFinalised) {
    throw "Order has not been finalised yet"; 
  }; 
  if(amount < this.netTotal) {
    throw "Insufficient Payment";
  };
  return parseFloat((amount - this.netTotal).toFixed(2));
};

itemCheck = function(item) {
  if(!menu.hasOwnProperty(item)) {
    throw "Item is not on the menu";
  };
};

