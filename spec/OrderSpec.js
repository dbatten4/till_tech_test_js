describe("Thermostat", function() {

  var order;

  beforeEach(function() {
    order = new Order();
  });

  it("should be able to receive an order", function() {
    var sampleReceipt = {
      'Cafe Latte': 1
    };
    order.receiveOrder('Cafe Latte', 1);
    expect(order.receipt).toEqual(sampleReceipt);
  });

  it("should return an error if an item is selected which is not on the menu", function() {
    expect(function(){order.receiveOrder('Chicken Katsu', 1);}).toThrow("Item is not on the menu");
  });

  it("should calculate the gross total", function() {
    order.receiveOrder('Cafe Latte', 1);
    order.receiveOrder('Tea', 1);
    expect(order.grossTotal).toEqual(8.4);
  });

  it("should be able to finalise the order which will calculate the tax added", function() {
    order.receiveOrder('Cafe Latte', 1);
    order.receiveOrder('Tea', 1);
    order.finaliseOrder();
    expect(order.taxAdded).toEqual(0.73);
  });


  it("should be able to calculate the net total", function() {
    order.receiveOrder('Cafe Latte', 1);
    order.receiveOrder('Tea', 1);
    order.finaliseOrder();
    expect(order.netTotal).toEqual(9.13);
  });

  it("should increase the quantity of an item if an item is added twice or more", function() {
    var sampleReceipt = {
      'Cafe Latte': 2
    };
    order.receiveOrder('Cafe Latte', 1);
    order.receiveOrder('Cafe Latte', 1);
    expect(order.receipt).toEqual(sampleReceipt);
  });

  it("should not be able to take a payment unless the order is finalised", function() {
    order.receiveOrder('Cafe Latte', 1);
    expect(function(){order.receivePayment(10);}).toThrow("Order has not been finalised yet");
  });
  
  it("should not be able to take a payment of less than the net amount", function() {
    order.receiveOrder('Cafe Latte', 1);
    order.finaliseOrder();
    expect(function(){order.receivePayment(1);}).toThrow("Insufficient Payment");
  });

  it("should be able to take a payment and return the correct change", function() { 
    order.receiveOrder('Cafe Latte', 1);
    order.finaliseOrder();
    expect(order.receivePayment(6)).toEqual(0.84);
  });
});
