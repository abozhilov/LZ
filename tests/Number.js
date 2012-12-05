describe('Number', function () {
    describe('lz.clz should count the leading zeros of integer', function () {
        it('lz.clz(0) returns 32', function () {
            expect(lz.clz(0)).toBe(32);    
        }); 
        
        it('leading zeros of 2 powers', function () {
            var num = 2;
            for (var i = 1; i < 32; i++) {
                expect(lz.clz(num)).toBe(31 - i);
                num *= 2;
            }
        });    
    });
    
    describe('lz.ctz should count the trailing zeros of integer', function () {
        it('lz.ctz(0) returns 32', function () {
            expect(lz.clz(0)).toBe(32);    
        }); 
        
        it('trailing zeros of negative 2 powers', function () {
            var num = -2;
            for (var i = 1; i < 32; i++) {
                expect(lz.ctz(num)).toBe(i);
                num *= 2;
            }
        });         
    });    
});
