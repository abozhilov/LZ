describe('Object', function () {
    describe('lz.klass should return the internal [[Class]]', function () {
        it('{} class is Object', function () {
            expect(lz.klass({})).toBe('Object');
        });
        
        it('[] class is Array', function () {
            expect(lz.klass([])).toBe('Array');
        });  
        
        it('function(){} class is Function', function () {
            expect(lz.klass(function(){})).toBe('Function');
        }); 
        
        it('/reg/ class is RegExp', function () {
            expect(lz.klass(/reg/)).toBe('RegExp');
        });         
        
        it('"string" class is String', function () {
            expect(lz.klass('')).toBe('String');
        });   
        
        it('10 class is Number', function () {
            expect(lz.klass(10)).toBe('Number');
        });   
        
        it('true class is Boolean', function () {
            expect(lz.klass(true)).toBe('Boolean');
        });
        
        it('new Date class is Date', function () {
            expect(lz.klass(new Date)).toBe('Date');
        });
        
        it('new Error class is Error', function () {
            expect(lz.klass(new Error)).toBe('Error');
        }); 
        
        it('new TypeError class is Error', function () {
            expect(lz.klass(new TypeError)).toBe('Error');
        });
        
        it('Math class is Math', function () {
            expect(lz.klass(Math)).toBe('Math');
        });                                                                      
    });
    
    describe('lz.type shoud return the type of the value', function () {
        it('null is a "null" string', function () {
            expect(lz.type(null)).toBe('null');
        }); 
        
        it('[] is an "array" string', function () {
            expect(lz.type([])).toBe('array');
        }); 
        
        it('undefined is an "undefined" string', function () {
            var udef;
            expect(lz.type(udef)).toBe('undefined');
        });
        
        it('"" is a "string" string', function () {
            expect(lz.type('')).toBe('string');
        });
        
        it('10 is a "number" string', function () {
            expect(lz.type(10)).toBe('number');
        });
        
        it('true is a "boolean" string', function () {
            expect(lz.type(true)).toBe('boolean');
        });
        
        it('callable is a "function" string', function () {
            expect(lz.type(function (){})).toBe('function');
        });
        
        it('{} is an "objec" string', function () {
            expect(lz.type({})).toBe('object');
        });  
        
        it('/reg/ is an "objec" string', function () {
            expect(lz.type(/reg/)).toBe('object');
        });                                                                  
    });
    
    describe('lz.isObject should test whether the value is object reference', function () {
        it ('{} is an object', function () {
            expect(lz.isObject({})).toBe(true);    
        });
        
        it ('[] is an object', function () {
            expect(lz.isObject([])).toBe(true);    
        });  
        
        it ('function(){} is an object', function () {
            expect(lz.isObject(function(){})).toBe(true);    
        });  
        
        it ('null is NOT an object', function () {
            expect(lz.isObject(null)).not.toBe(true);    
        }); 
        
        it ('undefined is NOT an object', function () {
            var udef;
            expect(lz.isObject(udef)).not.toBe(true);    
        });  
        
        it ('NaN is NOT an object', function () {
            expect(lz.isObject(NaN)).not.toBe(true);    
        })                                         
    });
    
    describe('lz.isPrimitive should test whether the value is a primitive value', function () {
        it('null is primitive', function () {
            expect(lz.isPrimitive(null)).toBe(true);
        });  
        
        it('true is primitive', function () {
            expect(lz.isPrimitive(true)).toBe(true);
        });
        
        it('undefined is primitive', function () {
            var udef;
            expect(lz.isPrimitive(udef)).toBe(true);
        });
        
        it('10 is primitive', function () {
            expect(lz.isPrimitive(10)).toBe(true);
        });
        
        it('"str" is primitive', function () {
            expect(lz.isPrimitive('str')).toBe(true);
        }); 
        
        it('NaN is primitive', function () {
            expect(lz.isPrimitive(NaN)).toBe(true);
        });
        
        it('{} is NOT primitive', function () {
            expect(lz.isPrimitive({})).not.toBe(true);
        });
        
        it('[] is NOT primitive', function () {
            expect(lz.isPrimitive([])).not.toBe(true);
        });                                                                 
    });
    
    describe('lz.object should create new instance of the constructor', function () {
        it('creates new Boolean object', function () {
            var obj = lz.object(Boolean, []);
            expect(lz.type(obj) == 'object' && lz.klass(obj) == 'Boolean').toBe(true);
        });
        
        it('creates new String object', function () {
            var obj = lz.object(String, []);
            expect(lz.type(obj) == 'object' && lz.klass(obj) == 'String').toBe(true);
        }); 
        
        it('creates new Number object', function () {
            var obj = lz.object(Number, []);
            expect(lz.type(obj) == 'object' && lz.klass(obj) == 'Number').toBe(true);
        }); 
        
        it('creates new Date object', function () {
            var obj = lz.object(Date, []);
            expect(lz.type(obj) == 'object' && lz.klass(obj) == 'Date').toBe(true);
        });    
        
        it('creates new Array object', function () {
            var obj = lz.object(Array, []);
            expect(lz.type(obj) == 'array' && lz.klass(obj) == 'Array').toBe(true);
        }); 
        
        it('creates new object with user defined constructor', function () {
            function F(){}
            expect(lz.object(F, []) instanceof F).toBe(true);
        });                                              
    });
    
    describe('lz.object should pass variable length of arguments to the constructor', function () {
        it('creates array with length=10', function () {
            expect(lz.object(Array, [10]).length).toBe(10);
        });
        
        it('creates array [1, 2, 3] ', function () {
            var arr = lz.object(Array, [1, 2, 3]);
            expect(arr.length == 3 && arr[0] == 1 && arr[1] == 2 && arr[2] == 3).toBe(true);
        });
        
        it('creates Date from timestamp', function () {
            var date = new Date,
                date1 = lz.object(Date, [+date]) 
            expect(date1).toEqual(date);
        });
        
        it('creates Date(year, month)', function () {
            var date = lz.object(Date, [2012, 8]); 
            expect(
                date.getFullYear() == 2012 && 
                date.getMonth() == 8 && 
                date.getDate() == 1
            ).toBe(true);
        });  
        
        it('creates exact Date(year, months, date, hours, minutes, seconds, milliseconds)', function () {
            var date = lz.object(Date, [2012, 8, 30, 10, 11, 12, 123]); 
            expect(
                date.getFullYear() == 2012 && 
                date.getMonth() == 8 && 
                date.getDate() == 30 &&
                date.getHours() == 10 &&
                date.getMinutes() == 11 &&
                date.getSeconds() == 12 &&
                date.getMilliseconds() == 123
            ).toBe(true);
        });  
        
        it('should pass 3 arguments to the user defined constructor', function () {
            function F() {
                expect(arguments.length).toBe(3);
            }
            lz.object(F, [1, 2, 3]);
        });                                 
    });
    
    describe('lz.create should create an object with the given prototype object', function () {
        var obj = {
            foo : {}
        };
        
        it('tests whether the passed proto is the prototype of the created object ', function () {
            expect(obj.isPrototypeOf(lz.create(obj))).toBe(true);
        });
        
        it('the new object should inherit from its prototype', function () {
            expect(lz.create(obj).foo).toBe(obj.foo);        
        });    
    });
    
    describe('lz.keys should return own enumerable properties of the object', function () {
        var obj = lz.create({a : 1, b : 1});
            obj.c = 1;
            obj.d = 1;
            
        it('get own enumerable properties of the object with user defined prototype', function () {
            var keys = lz.keys(obj);
            expect(
                keys.length == 2 && 
                lz.indexOf(keys, 'c') > -1 && 
                lz.indexOf(keys, 'd') > -1
            ).toBe(true);
        });
        
        it('does not collect non-enumerable properties', function () {
            var keys = lz.keys([1, 2, 3]);
            expect(lz.indexOf(keys, 'length')).toBe(-1);
        });
        
        it('returns empty array if there are not own enumerable properties', function () {
            expect(lz.keys({}).length).toBe(0);
        });            
    });
    
    describe('lz.mixin should mix the sources own properties to the destination object', function () {
        var hasOwnP = {}.hasOwnProperty,
            obj = {foo : 1, bar : 1},
            obj1 = {baz : 1},
            obj2 = {foo : {}, bar : {}, baz : {}};
            
        it('returns the destination object', function () {
            var dst = {};
            expect(lz.mixin(dst, {})).toBe(dst);
        });
            
        it('mixes only own properties of the source', function () {
            var proto = {a : 1, b : 2},
                obj = lz.create(proto),
                dst = {};
            obj.foo = 1;
            obj.bar = 1;
            
            lz.mixin(dst, obj);
            expect(
                hasOwnP.call(dst, 'foo') && 
                hasOwnP.call(dst, 'bar') && 
                !hasOwnP.call(dst, 'a') && 
                !hasOwnP.call(dst, 'b')
            ).toBe(true);         
        });
        
        it('mixes multiple sources in the destination object', function () {
            var dst = {};
            lz.mixin(dst, obj, obj1);
            expect(
                hasOwnP.call(dst, 'foo') && 
                hasOwnP.call(dst, 'bar') &&             
                hasOwnP.call(dst, 'baz')  
            ).toBe(true);
        });
        
        it('the value of a property is the value in the last source object which has that name', function () {
            var dst = {};
            lz.mixin(dst, obj, obj1, obj2);
            expect(
                dst.foo === obj2.foo &&
                dst.bar === obj2.bar &&
                dst.baz === obj2.baz
            ).toBe(true);   
        });         
    });
    
    describe('lz.dup should create shallow copy of object', function () {
        it('[1, 2, 3] clones numeric index properties and return new array', function () {
            var arr = [1, 2, 3],
                arr1 = lz.dup(arr);
            expect(
                lz.klass(arr) == 'Array' &&
                arr1[0] == arr[0] && 
                arr1[1] == arr[1] &&
                arr1[2] == arr[2]
            ).toBe(true);                                
        }); 
        
        it('clones Date object and keep its timestamp value', function () {
            var date = new Date(2012, 11, 2, 0, 0, 0),
                date1 = lz.dup(date);            
            expect(
                lz.klass(date1) == 'Date' &&
                +date1 == +date 
            ).toBe(true); 
        }); 
        
        it('returns bound function if object is Function', function () {
            var f = lz.dup(function () {return true;});
            expect(
                typeof f == 'function' &&
                f()
            ).toBe(true);
        });
        
        it('clones the pattern of RegExp', function () {
            var reg = /reg/,
                reg1 = lz.dup(reg);
            expect(
                lz.klass(reg1) == 'RegExp' &&
                reg1.source == reg.source
            ).toBe(true);        
        });
        
        it('clones the flags of RegExp', function () {
            var reg = /reg/gm,
                reg1 = lz.dup(reg);
            expect(
                lz.klass(reg1) == 'RegExp' &&
                reg1.global == reg.global &&
                reg1.ignoreCase == reg.ignoreCase && 
                reg1.multiline == reg.multiline
            ).toBe(true);        
        });
        
        it('clones internal primitive value of Boolean', function () {
            var bool = new Boolean(true),
                bool1 = lz.dup(bool);            
            expect(
                typeof bool1 == 'object' &&
                lz.klass(bool1) == 'Boolean' && 
                +bool1 == +bool    
            ).toBe(true);    
        });
        
        it('clones internal primitive value of Number', function () {
            var num = new Number(30),
                num1 = lz.dup(num);            
            expect(
                typeof num1 == 'object' &&
                lz.klass(num1) == 'Number' && 
                +num1 == +num    
            ).toBe(true);    
        });  
        
        it('clones internal primitive value of String', function () {
            var str = new String('lz lib'),
                str1 = lz.dup(str);            
            expect(
                typeof str1 == 'object' &&
                lz.klass(str1) == 'String' && 
                String(str1) == String(str)    
            ).toBe(true);    
        });
        
        it('clones the own enumerable properties of regular objects', function () {
            var obj = {foo : 1, bar : 1},
                obj1 = lz.dup(obj),
                hasOwnP = {}.hasOwnProperty;
            expect(
                hasOwnP.call(obj1, 'foo') &&
                hasOwnP.call(obj1, 'bar')
            ).toBe(true);            
        });
        
        it('keeps the prototype chain of object', function () {
            var obj = {foo : 1, bar : 1},
                obj1 = lz.create(obj),
                obj2 = lz.dup(obj1);
            expect(obj.isPrototypeOf(obj2)).toBe(true);            
        });
        
        it('throws a TypeError if the passed value is NOT an object', function () {
            expect(lz.dup).toThrow('obj is not an object');
        });                                   
    });
    
    describe('lz.select should create white list property selector', function () {
        var filter = lz.select('foo', 'bar', 'baz'),
            hasOwnP = {}.hasOwnProperty;
        
        it('selects only described properties', function () {
            var obj = {prop : 1};
            expect(!hasOwnP.call(filter(obj), 'prop')).toBe(true);
        });
        
        it('selects only own properties', function () {
            var obj = {foo : 1, prop : 1},
                obj1 = lz.create(obj);
            obj1.bar = 1;
            var selected = filter(obj1);
            expect(
                !hasOwnP.call(selected, 'foo') &&
                hasOwnP.call(selected, 'bar')
            ).toBe(true);
        });
        
        it('selects from multiple source objects', function () {
            var obj = filter({foo : 1}, {bar : 1, baz : 1}); 
            expect(
                hasOwnP.call(obj, 'foo') && 
                hasOwnP.call(obj, 'bar') &&
                hasOwnP.call(obj, 'baz')    
            ).toBe(true);
        });
        
        it('selects non-enumerable properties', function () {
            expect(lz.select('length')([1, 2, 3]).length).toBe(3);
        });
    });
    
    describe('lz.omit should create black list property selector', function () {
        var omit = lz.omit('foo', 'bar', 'baz'),
            hasOwnP = {}.hasOwnProperty;
        
        it('omits passed properties', function () {
            var obj = {foo : 1, test : 1, bar: 1, test1 : 1, baz : 1},
                selected = omit(obj);
            expect(
                hasOwnP.call(selected, 'test') && 
                hasOwnP.call(selected, 'test1') &&
                lz.keys(selected).length == 2                 
            ).toBe(true);      
        });
        
        it('collects only own properties of sources', function () {
            var obj = {a : 1, b : 1},
                obj1 = lz.create(obj),
                selected = omit(obj1);
            expect(
                !hasOwnP.call(selected, 'a') &&
                !hasOwnP.call(selected, 'b') 
            ).toBe(true);        
        });
        
        it('omits black listed properties in multiple sources', function () {
            var selected = omit(
                            {foo : 1, bar : 1, baz : 1},
                            {foo : {}, baz : {}, test: 1}
                           );
            expect(
                hasOwnP.call(selected, 'test') &&
                lz.keys(selected).length == 1
            ).toBe(true);                           
        });
    });
    
    describe('lz.namespace should initialize namespace starting from the global space', function () {
        it('initializes new namespace __lib__.test.lz', function () {
            lz.namespace('__lib__.test.lz');
            expect(
                typeof __lib__ == 'object' &&
                typeof __lib__.test == 'object' &&
                typeof __lib__.test.lz == 'object'
            ).toBe(true);
        });
        
        it('does not overwrite if already exist', function () {
            lz.namespace('__lib__.exist');
            var space = __lib__.exist;
            lz.namespace('__lib__.exist.test');
            expect(
                space === __lib__.exist &&
                typeof space.test == 'object'
            ).toBe(true);    
        });
        
        it('overwrites if space is not an object with new space object', function () {
            lz.namespace('__lib__.test.lz');
            __lib__.test = true;
            lz.namespace('__lib__.test.lz');
            expect(typeof __lib__.test.lz).toBe('object');
        });
        
        it('calls init function if it is provided', function () {
            var obj = {f : function (){}};
            spyOn(obj, 'f');
            lz.namespace('__lib__.test.lz', obj.f);
            expect(obj.f).toHaveBeenCalled();
        });
        
        it('pass the initialized namespace to the init function', function () {
            var obj = {f : function (module){}};
            spyOn(obj, 'f');
            lz.namespace('__lib__.test.lz', obj.f);
            expect(obj.f).toHaveBeenCalledWith(__lib__.test.lz);
        });          
    }); 
});
