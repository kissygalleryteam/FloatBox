KISSY.add(function (S, Node,Demo) {
    var $ = Node.all;
    describe('FloatBox', function () {
        it('Instantiation of components',function(){
            var demo = new Demo();
            expect(S.isObject(demo)).toBe(true);
        })
    });

},{requires:['node','gallery/FloatBox/1.0/']});