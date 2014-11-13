function printInventory(inputs) {
  var shopList = '***<没钱赚商店>购物清单***\n',
      allProducts = '',
      allPromotions = '',
      realPrice = 0,
      totalPrice = 0;

  var line = '';

  var groups = groupby(inputs);

  for (var key in groups) {
    if (groups.hasOwnProperty(key)) {
      var count = groups[key];
      var code = key;
      var product = findProduct(code);

      realPrice += calculatePrice(product['price'], count, code);

      totalPrice += product['price'] * count;

      allProducts += calculateProduct(product, count);

      allPromotions += calculatePromotion(count, product);
    }
  }
  var promotionInfo = '';
  var saveInfo = '';
  if (allPromotions != '') {
    promotionInfo = '挥泪赠送商品:\n' +
    allPromotions +
    '----------------------\n';

    saveInfo = '节省：'+(totalPrice-realPrice).toFixed(2)+'(元)\n';
  }

  var outputs = shopList +
            allProducts +
            '----------------------\n' +
            promotionInfo +
            '总计：'+realPrice.toFixed(2)+'(元)\n' +
            saveInfo +
            '**********************';
  console.log(outputs);
}

function calculateProduct(item, count) {
  var name = item['name'],
      unit = item['unit'],
      price = item['price'].toFixed(2);
  var allPrice = calculatePrice(price, count, item['barcode']);
  return '名称：'+name+'，数量：'+count+unit+'，单价：'+price+'(元)，小计：'+allPrice.toFixed(2)+'(元)\n';
}

function calculatePromotion(count, item) {
  if(hasPromotion(count, item['barcode'])) {
    var promoteCount = count - Math.ceil(count/2);
    return '名称：'+item['name']+'，数量：'+promoteCount+item['unit']+'\n';
  }
  
  return '';
}

function calculatePrice(price, count, barcode) {
  var payCount = count;      

  if(hasPromotion(count, barcode)) {
    payCount = Math.ceil(count/2);
  }

  return price * payCount;
}

function hasPromotion(count, barcode) {
  return count >= 2 && getPromotionProduct().indexOf(barcode) > -1;
}

function findProduct(input) {
  var product;
  var allItems = loadAllItems();

  allItems.forEach(function(item) {
    if (item['barcode'] == input) {
      product = item;
      return;
    }
  });

  return product;
}

function groupby(inputs) {
  var groups = {};

  inputs.forEach(function(input) {
    var count = 1;
    var code = input;
    if(input.indexOf('-') >= 0) {
      code = input.split('-')[0];
      count = parseInt(input.split('-')[1]);
    }
    groups[code] = groups[code] || 0;
    groups[code] += count;
  });

  return groups;
}

function getPromotionProduct() {
  var promotionProduct = [];

  loadPromotions().forEach (function(promotion) {
    if(promotion['type'] === 'BUY_TWO_GET_ONE_FREE'){
      promotionProduct = promotion['barcodes'];
    }
  })

  return promotionProduct;
}
