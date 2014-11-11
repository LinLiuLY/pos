describe('pos', function () {
    var allItems;
    var inputs;

    beforeEach(function () {
        allItems = loadAllItems();
        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
    });

    it('should print correct text', function () {

        spyOn(console, 'log');

        printInventory(inputs);

        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';

          // expect(console.log).toHaveBeenCalledWith(expectText);
    });

    it('should print 3yuan for 1 Sprint', function() {
      spyOn(console, 'log');

      printInventory(['ITEM000001']);

      var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：1瓶，单价：3.00(元)，小计：3.00(元)\n' +
            '----------------------\n' +
            '总计：3.00(元)\n' +
            '**********************';

      expect(console.log).toHaveBeenCalledWith(expectText);
    });

    it('should print 2yuan for 1 battery', function() {
      spyOn(console, 'log');

      printInventory(['ITEM000004']);

      var expectedText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：电池，数量：1个，单价：2.00(元)，小计：2.00(元)\n' +
            '----------------------\n' +
            '总计：2.00(元)\n' +
            '**********************';

        expect(console.log).toHaveBeenCalledWith(expectedText);
    });

    it('should print correct text for one item with weight', function() {
      spyOn(console, 'log');

      printInventory(['ITEM000003-1']);

      var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：荔枝，数量：1斤，单价：15.00(元)，小计：15.00(元)\n' +
            '----------------------\n' +
            '总计：15.00(元)\n' +
            '**********************';
      // expect(console.log).toHaveBeenCalledWith(expectText);
    });

    it('should print correct text for two items', function() {
      spyOn(console, 'log');

      printInventory(['ITEM000001', 'ITEM000003-1']);

      var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：1瓶，单价：3.00(元)，小计：3.00(元)\n' +
            '名称：荔枝，数量：1斤，单价：15.00(元)，小计：15.00(元)\n' +
            '----------------------\n' +
            '总计：18.00(元)\n' +
            '**********************';
      // expect(console.log).toHaveBeenCalledWith(expectText);
    })
});
