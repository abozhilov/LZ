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
    
    describe('lz.once should execute the function only once', function () {
        it('returns the same result regardless the number of calls', function () {
            var f = lz.once(function F(){return {}});
            expect(f()).toBe(f());
        });
        
        it('shares the prototype with the target function', function () {
            function F(){}
            expect(lz.once(F).prototype).toBe(F.prototype);
        }); 
        
        it('passes the arguments to the target function', function () {
            var f = lz.once(function (){return arguments.length;});
            expect(f(1, 2, 3)).toBe(3);
        });
        
        it('delegates the this value to the target function', function () {
            var f = lz.once(function (){return this;}),
                thisObj = {};
            expect(f.call(thisObj)).toBe(thisObj);    
        });
        
        it('creates new instances of the target with new keyword', function () {
            function F(){}
            expect(new (lz.once(F)) instanceof F).toBe(true);  
        });       
    });
    
    describe('lz.range should create lazy evaluated range', function () {        
        it('creates range from 0 to N - 1 with default step', function () {
            var range = lz.range(10),
                arr = [];
            range(function (val) {
                arr.push(val);
            });
            expect(
                arr.length == 10 && 
                arr[9] - arr[8] == 1 &&
                arr[9] == 9
            ).toBe(true);    
        });
        
        it('creates range from M to N - 1 with default step', function () {
            var range = lz.range(5, 10),
                arr = [];
            range(function (val) {
                arr.push(val);
            });
            expect(
                arr.length == 5 && 
                arr[4] - arr[3] == 1 &&
                arr[4] == 9 && 
                arr[0] == 5
            ).toBe(true);    
        });
        
        it('creates range from M to N - 1 with step 2', function () {
            var range = lz.range(5, 10, 2),
                arr = [];
            range(function (val) {
                arr.push(val);
            });
            expect(
                arr.length == 3 && 
                arr[2] - arr[1] == 2 &&
                arr[2] == 9 && 
                arr[0] == 5
            ).toBe(true);    
        });                
    });
    
    describe('lz.memo should create a function which memoize its calls', function () {
        it('memoize with single argument', function () {
            var calls = 0,
                f = lz.memo(function (a) {
                    calls++;
                });
            f(1);f(1);
            expect(calls).toBe(1);
        }); 
        
        it('memoize with multiple arguments', function () {
            var calls = 0,
                f = lz.memo(function (a, b) {
                    calls++;
                });
            f(1, 2);f(1, 2);
            expect(calls).toBe(1);
        });
        
        it('always return the same computed value', function () {
            var f = lz.memo(function (a) {
                return {};
            });
            expect(f(1)).toBe(f(1));
            expect(f(2)).toBe(f(2));
            expect(f(2)).not.toBe(f(1));
        });               
    });
    
    describe('lz.times should execute N times the given function', function () {
        it('executes N times the function', function () {
            var N = 10,
                calls = 0;
            lz.times(N, function (){calls++;});
            expect(calls).toBe(N);    
        }); 
        
        it('stores the returned value of func in array and returns that array', function () {
            var N = 10,
                arr = lz.times(N, function (){return 0});
            expect(arr[0] === arr[9] && arr[0] === 0).toBe(true);    
        });
        
        it('does not store the value if it is undefined', function () {
            var N = 10,
                calls = 0,
                arr = lz.times(N, function(){calls++});
                
            expect(
                arr.length == 0 &&
                calls == N
            ).toBe(true);
        });
        
        it('passes the executed index to callback', function () {
            var N = 10,
                arr = lz.times(N, function(i){return i});                
            expect(
                arr[0] == 0 &&
                arr[9] == 9 
            ).toBe(true);        
        });            
    });
});
