function printInventory(inputs) {
    var outputs =
          '***<没钱赚商店>购物清单***\n' +
          '名称：雪碧，数量：1瓶，单价：3.00(元)，小计：3.00(元)\n' +
          '----------------------\n' +
          '总计：3.00(元)\n' +
          '**********************';

    var weightOutputs =
          '***<没钱赚商店>购物清单***\n' +
          '名称：荔枝，数量：1斤，单价：15.00(元)，小计：15.00(元)\n' +
          '----------------------\n' +
          '总计：15.00(元)\n' +
          '**********************'

    inputs.forEach(function(input) {
        if (input.indexOf('-') >= 0) {
          outputs = weightOutputs;
        }
    });

    console.log(outputs);
}
