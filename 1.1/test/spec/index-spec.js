KISSY.add(function (S, Node,Demo) {
    var $ = Node.all;
    describe('float_box', function () {
        it('Instantiation of components',function(){
            var demo = new Demo();
            expect(S.isObject(demo)).toBe(true);
        })
    });

},{requires:['node','gallery/float_box/1.0/']});