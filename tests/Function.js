describe('Function', function () {
    describe('lz.ctor should create constructor function', function () {
        function F(){}   
         
        it('shares same prototype as target function', function () {            
            expect(lz.ctor(F).prototype).toBe(F.prototype);
        });
        
        it('always calls the internal [[Construct]] regardless type of call', function () {
            var ctor = lz.ctor(F),
                obj = new ctor(),
                obj1 = ctor();
            expect(
                obj instanceof F &&
                obj1 instanceof F
            ).toBe(true);
        });
        
        it('always calls the [[Construct]] of built-in functions', function () {
            var ctor = lz.ctor(Date),
                date = new ctor(),
                date1 = ctor();
            expect(
                date instanceof Date && 
                date1 instanceof Date 
            ).toBe(true);
        });
        
        it('returns the returned value of [[Construct]]', function () {
            function F(){return {}}
            expect(
                lz.type(lz.ctor(F)()) == 'object' && 
                !(lz.ctor(F)() instanceof F)
            ).toBe(true);
        });
        
        it('always returns an object', function () {
            function F(){return null;}
            expect(lz.type(lz.ctor(F)()) == 'object').toBe(true);
        });
        
        it('passes the arguments to the target function', function () {
            function F(){return {length : arguments.length}}
            expect(lz.ctor(F)(1, 2, 3).length).toBe(3);
        });
    });
    
    describe('lz.bind should create a new bound function with the passed function', function () {
        it('binds without thisVal', function () {
            function f(){return this;}
            expect(lz.bind(f)()).toBe(f());    
        });
        
        it('binds with thisVal', function () {
            function f(){return this;}
            var thisVal = {};
            expect(lz.bind(f, thisVal)()).toBe(thisVal);
        });
        
        it('binds correctly with arguments passed to the lz.bind', function () {
            function f(){return arguments.length}
            expect(lz.bind(f, null, 1, 2, 3)()).toBe(3);
        }); 
        
        it('binds correctly with arguments passed to the bound function', function () {
            function f(){return arguments.length}
            expect(lz.bind(f, null, 1, 2, 3)(4, 5, 6)).toBe(6);
        });
        
        it('call does not alter the this value', function () {
            function f(){return this;}
            expect(lz.bind(f).call({})).toBe(f());
        }); 
        
        it('apply does not alter the this value', function () {
            function f(){return this;}
            expect(lz.bind(f).apply({}, [])).toBe(f());
        });
        
        it('calls the [[Construct]] of target when the bound func. is called with new', function () {
            function F(){}
            var bound = lz.bind(F);
            expect(new bound instanceof F).toBe(true);
        });
        
        it('calls the [[Construct]] of built-in target funciton', function () {
            expect(new (lz.bind(Date)) instanceof Date).toBe(true);
        });
        
        it('handles properly if the constructor returns a primitive value', function () {
            expect(lz.type(new (lz.bind(function () {return false;})))).toBe('object');            
        });
        
        it('ignores the thisVal if it is called with `new`', function () {
            function f(){return this;}
            var thisVal = {};
            expect(new (lz.bind(f, thisVal))).not.toBe(thisVal);            
        });                        
    });
});
