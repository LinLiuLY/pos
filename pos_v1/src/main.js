function printInventory(inputs) {
  var shopList = '***<没钱赚商店>购物清单***\n',
      itemPrice,
      allPrice = 0.00;
  inputs.forEach(function(input) {
    var product = findProduct(input);

    allPrice += product['price'];

    itemPrice = calculateProduct(product, 1);
  });

  var outputs = shopList +
            itemPrice +
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
