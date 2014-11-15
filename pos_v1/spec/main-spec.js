describe('pos', function () {
    it('should price 3 yuan for price of Sprint', function() {
      var sprint = new Item({name: '雪碧', barcode: 'ITEM000001', unit: '瓶', price: 3.00});

      expect(sprint.realPrice()).toBeCloseTo(3.00);
    });

    it('should not promote 1 coca cola', function() {
      var cocacola = new Item({name: '可口可乐', barcode: 'ITEM000000', unit: '瓶', price: 3.00, count: 1});

      expect(cocacola.isPromoted()).toBe(false);
    });

    it('should promote 2 coca cola', function() {
      var cocacola = new Item({name: '可口可乐', barcode: 'ITEM000000', unit: '瓶', price: 3.00, count: 2});

      expect(cocacola.isPromoted()).toBe(true);
    });

    it('should not promote apple', function() {
      var apple = new Item({name: '苹果', barcode: 'ITEM000002', unit: '斤', price: 5.50});

      expect(apple.isPromoted()).toBe(false);
    });

    it('should price 4 yuan for 2 battery', function() {
      var battery = new Item({name: '电池', barcode: 'ITEM000004', unit: '个', price: 2.00, count: 2});

      expect(battery.realPrice()).toBeCloseTo(4.00);
    });

    it('should price 3 yuan for 2 sprint', function() {
      var sprint = new Item({name: '雪碧', barcode: 'ITEM000001', unit: '瓶', price: 3.00, count: 2});

      expect(sprint.realPrice()).toBeCloseTo(3.00);
    });

    it('should price 15 yuan for 0.5 kilo lychee', function() {
      var lychee = new Item({name: '荔枝', barcode: 'ITEM000003', unit: '斤', price: 15.00})

      expect(lychee.realPrice()).toBeCloseTo(15.00);
    });

    it('should price 30 yuan for 1 kilo lychee', function() {
      var lychee = new Item({name: '荔枝', barcode: 'ITEM000003', unit: '斤', price: 15.00, count: 2})

      expect(lychee.realPrice()).toBeCloseTo(30.00);
    });

    it('should print correct info for 1 sprint', function() {
      var sprint = new Item({name: '雪碧', barcode: 'ITEM000001', unit: '瓶', price: 3.00});

      expect(sprint.print()).toEqual('名称：雪碧，数量：1瓶，单价：3.00(元)，小计：3.00(元)\n')
    });

    it('should print correct inventory for 1 Sprint', function() {
      spyOn(console, 'log');

      new Pos(['ITEM000001']).printInventory();

      var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：1瓶，单价：3.00(元)，小计：3.00(元)\n' +
            '----------------------\n' +
            '总计：3.00(元)\n' +
            '**********************';

      expect(console.log).toHaveBeenCalledWith(expectText);
    });

    it('should print 2 yuan for 1 battery', function() {
      spyOn(console, 'log');

      new Pos(['ITEM000004']).printInventory();

      var expectedText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：电池，数量：1个，单价：2.00(元)，小计：2.00(元)\n' +
            '----------------------\n' +
            '总计：2.00(元)\n' +
            '**********************';

        expect(console.log).toHaveBeenCalledWith(expectedText);
    });

    it('should print 15 yuan for 0.5 kilogram lychee', function() {
      spyOn(console, 'log');

      new Pos(['ITEM000003']).printInventory();

      var expectedText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：荔枝，数量：1斤，单价：15.00(元)，小计：15.00(元)\n' +
            '----------------------\n' +
            '总计：15.00(元)\n' +
            '**********************';

      expect(console.log).toHaveBeenCalledWith(expectedText);
    });

    it('should print 11 yuan for 1 kilogram apple', function() {
      spyOn(console, 'log');

      new Pos(['ITEM000002-2']).printInventory();

      var expectedText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：苹果，数量：2斤，单价：5.50(元)，小计：11.00(元)\n' +
            '----------------------\n' +
            '总计：11.00(元)\n' +
            '**********************';

      expect(console.log).toHaveBeenCalledWith(expectedText);
    });

    it('should print 4 yuan for 2 battery', function() {
      spyOn(console, 'log');

      new Pos(['ITEM000004', 'ITEM000004']).printInventory();

      var expectedText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：电池，数量：2个，单价：2.00(元)，小计：4.00(元)\n' +
            '----------------------\n' +
            '总计：4.00(元)\n' +
            '**********************';

      expect(console.log).toHaveBeenCalledWith(expectedText);
    });

    it('should print 20 yuan for 1 kilogram apple and 2 instant noodles', function() {
      spyOn(console, 'log');

      new Pos(['ITEM000002-2', 'ITEM000005']).printInventory();

      var expectedText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：苹果，数量：2斤，单价：5.50(元)，小计：11.00(元)\n' +
            '名称：方便面，数量：1袋，单价：4.50(元)，小计：4.50(元)\n' +
            '----------------------\n' +
            '总计：15.50(元)\n' +
            '**********************';

      expect(console.log).toHaveBeenCalledWith(expectedText);
    });

    it('should print 3 yuan for 2 cola with promotion', function() {
      spyOn(console, 'log');

      new Pos(['ITEM000000', 'ITEM000000']).printInventory();

      var expectedText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：可口可乐，数量：2瓶，单价：3.00(元)，小计：3.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品:\n' +
            '名称：可口可乐，数量：1瓶\n' +
            '----------------------\n' +            
            '总计：3.00(元)\n' +            
            '节省：3.00(元)\n' +
            '**********************';

      expect(console.log).toHaveBeenCalledWith(expectedText);
    });

    it('should print correct text', function () {

        spyOn(console, 'log');

        var inputs = [
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
        new Pos(inputs).printInventory();

        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：9.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品:\n' +
            '名称：雪碧，数量：2瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：48.00(元)\n' +
            '节省：10.50(元)\n' +
            '**********************';

          expect(console.log).toHaveBeenCalledWith(expectText);
    });
});
