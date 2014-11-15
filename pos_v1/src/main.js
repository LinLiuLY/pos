//////////////////////////////////////////////////
var Item = function(item) {
  this.name = item.name;
  this.barcode = item.barcode;
  this.unit = item.unit;
  this.price = item.price.toFixed(2);
  this.count = item.count || 1;
}

Item.prototype.isPromoted = function () {
  if (this.count < 2) {
    return false;
  }

  var barcode = this.barcode;
  var promotions = loadPromotions().filter(function(promotion) {
    return promotion.barcodes.contains(barcode);
  });

  return promotions && promotions.length ? true : false;
}

Item.prototype.realPrice = function() {
  return (this.price * this.realCount()).toFixed(2);
}

Item.prototype.realCount = function() {
  return this.isPromoted() ? (Math.ceil(this.count / 2)) : this.count;
}

Item.prototype.savedPrice = function() {
  return this.price * this.count - this.realPrice();
}

Item.prototype.print = function() {
  var self = this;
  var result = '名称：%name%，数量：%count%%unit%，单价：%price%(元)，小计：%realPrice%(元)\n'.replace(/%\w+%/g, function(prop) {
    var key = prop.replace(/%/g, '');
    if (typeof(self[key]) === 'function') {
      return self[key]();
    }

    return self[key];
  });

  return result;
}

Item.prototype.printSaved = function() {
  if (!this.isPromoted()) {
    return '';
  }

  return '名称：' + this.name + '，数量：' + (this.count - Math.ceil(this.count / 2)) + this.unit + '\n';
}

//////////////////////////////////////////////////
var Pos = function(inputs) {
  this.inputs = inputs;
}

function findItemBy(barcode) {
  return loadAllItems().filter(function(item) {
    return item.barcode == barcode;
  })[0];
}

Pos.prototype.groupItemsByBarcode = function() {
  var boughtItems = {};
  
  this.inputs.forEach(function(input) {
    var barcode = input.indexOf('-') > 0 ? input.split('-')[0] : input;
    var count = input.indexOf('-') > 0 ? parseInt(input.split('-')[1]) : 1;

    boughtItems[barcode] = boughtItems[barcode] || findItemBy(barcode);
    boughtItems[barcode]['count'] = boughtItems[barcode]['count'] || 0;
    boughtItems[barcode]['count'] += count;
  });

  return boughtItems;
}

Pos.prototype.printInventory = function() {
  var itemMap = this.groupItemsByBarcode();
  var inventory = '***<没钱赚商店>购物清单***\n';
  var allPrice = 0;
  var savedPrice = 0;
  var savedInventory = '';
  for (var barcode in itemMap) {
    var item = new Item(itemMap[barcode]);
    inventory += item.print();
    allPrice += parseFloat(item.realPrice());
    savedPrice += item.savedPrice();
    savedInventory += item.printSaved();
  }

  inventory += '----------------------\n';
  if (savedInventory) {
    inventory += '挥泪赠送商品:\n';
    inventory += savedInventory;
    inventory += '----------------------\n';
  }
  inventory += '总计：' + allPrice.toFixed(2) + '(元)\n';

  if (savedPrice > 0) {
    inventory += '节省：' + savedPrice.toFixed(2) + '(元)\n';
  }

  inventory += '**********************';

  console.log(inventory);
}

//////////////////////////////////////////////////
Array.prototype.contains = function(barcode) {
  return this.indexOf(barcode) > -1;
}