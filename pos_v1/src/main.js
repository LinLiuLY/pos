function printInventory(inputs) {
  var shopList = '***<没钱赚商店>购物清单***\n',
      allProducts = '',
      allPrice = 0.00;

  var groups = groupby(inputs);

  for (var key in groups) {
    if (groups.hasOwnProperty(key)) {
      var count = groups[key];
      var code = key;
      var product = findProduct(code);

      allPrice += product['price'] * count;

      allProducts += calculateProduct(product, count);
    }
  }

  var outputs = shopList +
            allProducts +
            '----------------------\n' +
            '总计：'+allPrice.toFixed(2)+'(元)\n' +
            '**********************';
  console.log(outputs);
}

function calculateProduct(item, count) {
  var name = item['name'],
      unit = item['unit'],
      price = item['price'].toFixed(2),
      allPrice = (price * count).toFixed(2);

  return '名称：'+name+'，数量：'+count+unit+'，单价：'+price+'(元)，小计：'+allPrice+'(元)\n';
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
