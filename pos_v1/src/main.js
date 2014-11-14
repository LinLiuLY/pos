var START = '***<没钱赚商店>购物清单***\n',
    LINE = '----------------------\n',
    END = '**********************';

function printInventory(inputs) {
  var allItems = '',
      allPromotions = '',
      realPrice = 0,
      totalPrice = 0;

  var itemGroups = groupby(inputs);

  for (var barcode in itemGroups) {
    if (itemGroups.hasOwnProperty(barcode)) {
      var count = itemGroups[barcode];
      var item = findProduct(barcode);

      realPrice += calculatePrice(item['price'], count, barcode);

      totalPrice += item['price'] * count;

      allItems += printItem(item, count, calculatePrice(item['price'], count, item['barcode']));

      allPromotions += calculatePromotion(count, item);
    }
  }

  var outputs = printAllItems(allItems) +
            printPromotion(allPromotions) +
            printTotal(realPrice) +
            printSaved(totalPrice-realPrice) + END
            ;
  console.log(outputs);
}

function printAllItems(allItems) {
  return START + allItems + LINE;
}

function printItem(item, count, prices) {
  return '名称：' + item['name'] +
      '，数量：' + count + item['unit'] +
      '，单价：' + item['price'].toFixed(2) + '(元)' +
      '，小计：' + prices.toFixed(2) + '(元)\n';
}

function printPromotion(promotions) {
  return !promotions ? '' : '挥泪赠送商品:\n' + promotions + LINE;
}

function printSaved(saved) {
  return saved > 0 ? '节省：'+saved.toFixed(2)+'(元)\n' : '';
}

function printTotal(realPrice) {
  return '总计：'+realPrice.toFixed(2)+'(元)\n';
}

function calculatePromotion(count, item) {
  if(!hasPromotion(count, item['barcode'])) {
    return '';
  }

  return '名称：' + item['name'] + 
        '，数量：' + (count - Math.ceil(count/2)) + item['unit'] + '\n';
}

function calculatePrice(price, count, barcode) {
  var payCount = count;      

  if(hasPromotion(count, barcode)) {
    payCount = Math.ceil(count/2);
  }

  return price * payCount;
}

function hasPromotion(count, barcode) {
  return count >= 2 && promotionBarcodes().indexOf(barcode) > -1;
}

function groupby(inputs) {
  var itemGroups = {};

  inputs.forEach(function(input) {
    var count = 1;
    var code = input;
    if(input.indexOf('-') >= 0) {
      code = input.split('-')[0];
      count = parseInt(input.split('-')[1]);
    }
    itemGroups[code] = itemGroups[code] || 0;
    itemGroups[code] += count;
  });

  return itemGroups;
}

function findProduct(input) {
  var product;

  loadAllItems().some(function(item) {
    product = item;

    return item['barcode'] == input;
  });

  return product;
}

function promotionBarcodes() {
  var promotionBarcodes = [];

  loadPromotions().forEach(function(promotion) {
    if(promotion['type'] === 'BUY_TWO_GET_ONE_FREE'){
      promotionBarcodes = promotion['barcodes'];
    }
  })

  return promotionBarcodes;
}
