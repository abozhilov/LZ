/**
 * LZ Lib v.0.6.3 
 * @module
 */
var lz = {};
(function () {
    var global = this,  
        hasOwnP = {}.hasOwnProperty;
    
    var PROTO_SUPPORT = '__lz__' in {__proto__ : {'__lz__' : 1}},
        PRIMITIVE = {
            string : 1,
            number : 1,
            boolean : 1,
            undefined : 1
        };
        
    /**
     * Retrieves the type tag of object. 
     * Useful for nominal type checking. 
     *
     * @memberOf lz 
     * @category Object   
     * @param {Object} obj 
     * @return {string}
     */    
    lz.classOf = function (obj) {
        return {}.toString.call(obj).slice(8, -1);
    };
    
    /**
     * Retrieves the type of the value. 
     * Extending built-in typeof operator. 
     * 
     * <pre>
     * ,---------------------------------.
     * | Type of val    |  Result string |
     * -----------------------------------
     * | Undefined      | undefined      |
     * | Null           | null           |      
     * | Number         | number         |
     * | String         | string         |
     * | Boolean        | boolean        |
     * | Array          | array          |
     * | callable obj   | function       |
     * | Object         | object         |
     * | Host object    | impl. depend   |
     * `---------------------------------`
     *</pre>
     *
     * @memberOf lz
     * @category Object          
     * @param {*} val
     * @return {string} 
     */
    lz.type = function (val) {
        var type = typeof val;
        if (type == 'object') {
            if (val === null) {
                type = 'null';
            }
            else if (lz.classOf(val) == 'Array') {
                type = 'array';
            }
        }
        return type;
    };
    
    /**
     * Tests whether the value is object reference. 
     * 
     * @memberOf lz  
     * @category Object        
     * @param {*} val
     * @return {boolean}      
     */
    lz.isObject = function (val) {
        return val === Object(val);
    };
    
    /**
     * Tests whether the value is primitive value. 
     * 
     * @memberOf lz 
     * @category Object         
     * @param {*} val
     * @return {boolean} 
     */      
    lz.isPrimitive = function (val) {
        return typeof val in PRIMITIVE || !val;     
    };
    
    /**
     * Tests whether the lval and rval are equal. 
     * Performs strict equality test and handle -0 and NaN. 
     *
     * @credits http://wiki.ecmascript.org/doku.php?id=harmony:egal
     * @memberOf lz
     * @category Object
     * @param {*} lval
     * @param {*} rval
     * @return {Boolean}
     */
    lz.sameValue = function (lval, rval) {
        if (lval === rval) {
          return lval !== 0 || (1 / lval) === (1 / rval);
        }
        return lval !== lval && rval !== rval;
    };
       
    if (Function.prototype.bind) {
        /**
         * Creates new instance object via passed constructor function. 
         * The arguments list for constructor is provided by an array.
         *
         * @memberOf lz 
         * @category Object             
         * @param {Function} ctor - constructor function
         * @param {Array} args - arguments list
         * @return {Object} 
         */     
        lz.object = function (ctor, args) {
            return new (ctor.bind.apply(ctor, [null].concat([].slice.call(args))));
        };
    }
    else {
        lz.object = function (ctor, args) {
            var len = args.length;
            switch (lz.classOf(ctor.prototype)) {
                case 'String':
                case 'Number':
                case 'Boolean': 
                    return new ctor(args[0]);
                case 'Date':
                    if (len) {
                        if (len == 1) {
                            return new Date(args[0]);
                        }                        
                        return new Date(
                            args[0], 
                            args[1], 
                            (len == 2 ? 1 : args[2]), 
                            args[3] || 0, 
                            args[4] || 0, 
                            args[5] || 0, 
                            args[6] || 0
                        );            
                    }
                    return new Date;   
                default:
                   var F = function (){return ctor.apply(this, args)};
                   F.prototype = ctor.prototype;
                   return new F; 
            }            
        };
    }
    
    if (Object.create) {
        /**
         * Creates new object with given object as prototype. 
         * 
         * @memberOf lz 
         * @category Object             
         * @param {Object} proto
         * @return {Object}
         */    
        lz.create = function (proto) {
            return Object.create(proto);
        };    
    }
    else {
        lz.create = function (proto) {
            function F(){}           
            F.prototype = proto;
            return new F;
        };
    }        
      
    if (Object.keys) {
        /**
         * Returns array of own enumerable properties of given object. 
         *
         * @memberOf lz 
         * @category Object             
         * @param {Object} obj
         * @return {Array} 
         */      
        lz.keys = function (obj) {
            return Object.keys(obj);
        };
    }
    else {
        lz.keys = function (obj) {
            var keys = [];
            
            for (var i in obj) {
                if (hasOwnP.call(obj, i)) {
                    keys.push(i);
                }
            }
            return keys;
        };
    }
    
    /**
     * Mixes own enumerable properties of source objects in dest object. 
     * If property already exists, it overwrites. 
     *
     * @memberOf lz     
     * @category Object     
     * @param {Object} dest - Destination object
     * @param {Object} [source1, source2, ... sourceN] - Source objects
     * @return {Object} - Returns dest object 
     */    
    lz.mixin = function(dest, source) {
        for (var i = 1, len = arguments.length; i < len; i++) {
            var obj = arguments[i];
            for (var prop in obj) {
                if (hasOwnP.call(obj, prop)) {
                    dest[prop] = obj[prop];    
                }    
            }
        }
        return dest;     
    };
    
    /**
     * Get the internal [[Prototype]]
     * Not really reliable in older non __proto__ environments. 
     * @private
     */
    var getProto = function (obj) {
        if (Object.getPrototypeOf) {
            return Object.getPrototypeOf(obj);
        }
        else if (PROTO_SUPPORT) {
            return obj.__proto__;
        }
        return obj.constructor.prototype; 
    };    
    
    /**
     * Returns shallow copy of object. 
     * If obj is not an object throw TypeError.
     * <pre>
     * .---------------------------------------------,  
     * | Object type  | Copying                      |  
     * -----------------------------------------------  
     * | Array        | Numeric index properties.    |
     * |              | Returns new array object.    |
     * -----------------------------------------------
     * | Date         | Timestamp value.             |
     * |              | Returns new date object.     |
     * -----------------------------------------------
     * | Function     | Binds function and return it.|  
     * -----------------------------------------------
     * | RegExp       | Regex pattern and flags.     |
     * |              | Returns new RegExp object.   |
     * -----------------------------------------------
     * | Number       | Internal primitive value.    |
     * | Boolean      | Returns new object from      |
     * | String       | the given type.              |
     * ----------------------------------------------- 
     * | Object       | Own enumerable properties.   |
     * |              | Keeps the prototype chain.   |
     * |              | Returns new Object.          |
     * -----------------------------------------------
     * </pre>
     *
     * @memberOf lz     
     * @category Object     
     * @param {Object} obj
     * @return {Object}           
     */
    lz.dup = function (obj) {
        if (!lz.isObject(obj)) {
            throw TypeError('obj is not an object');
        }
        switch (lz.classOf(obj)) { 
            case 'Array':                        
                return [].slice.call(obj); 
            case 'Date': 
                return new Date(+obj);     
            case 'Function':
                return lz.bind(obj);
            case 'RegExp':
                return new RegExp(obj);            
            case 'Number':
                return new Number(obj);
            case 'Boolean':
                return new Boolean(+obj);
            case 'String':
                return new String(obj);
            default: 
                return lz.mixin(
                    lz.create(getProto(obj)), 
                    obj
                );                    
        }
    };
    
    /**
     * White list filter factory.
     * Accepts variable length of properties, 
     * which will be selected from passed objects 
     * to the returned function. 
     *
     * @memberOf lz 
     * @category Object         
     * @param {string} properties
     * @return {Function} - accepts variable length of objects
     */
    lz.select = function () {
        var props = arguments;
        return function () {
            var obj = {},
                args = arguments,
                len = args.length;
            
            for (var i = props.length; i--;) {
                for (var j = 0; j < len; j++) {
                    var prop = props[i];
                    if (hasOwnP.call(args[j], prop)) {
                        obj[prop] = args[j][prop];        
                    }
                }
            }            
            return obj;
        };
    };
    
    /**
     * Black list filter factory.
     * Accepts variable length of properties, 
     * which will not be selected from passed objects 
     * to the returned function. 
     *
     * @memberOf lz   
     * @category Object       
     * @param {string} properties
     * @return {Function} - accepts variable length of objects
     */    
    lz.omit = function () {
        var props = {};
        for (var i = arguments.length; i--;) {
            props[arguments[i]] = 1; 
        }
        return function () {
            var obj = {},
                args = arguments,
                len = args.length;
            for (var i = 0; i < len; i++) {
                for (var prop in args[i]) {
                    if (hasOwnP.call(args[i], prop) && !hasOwnP.call(props, prop)) {
                        obj[prop] = args[i][prop];
                    }
                }
            }
            return obj;
        };
    };
    
    /**
     * Creates and initialize namespace starting from the global space.
     * If initialize function is provided, it is called 
     * with namespace object as first argument. 
     * 
     * @memberOf lz   
     * @category Object       
     * @param {string} space
     * @param {Function} [fn] - optional initializer of the namespace
     * @return {Object} namespace
     */
    lz.namespace = function (space, fn) {
        var names = space.split('.'),
            module = global;            
        for (var i = 0,  len = names.length; i < len; i++) {
            var name = names[i];
            if (!lz.isObject(module[name])) {
                module[name] = {};
            }
            module = module[name];                
        }
        if (lz.type(fn) == 'function') {
            fn(module);    
        }
        return module;         
    };      
        
    
    /**
     * Creates constructor function.
     * Regardless of calling with or without `new` keyword
     * it always behaves as it called with `new` keyword. 
     *
     * @memberOf lz 
     * @category Function        
     * @param {Function} fn
     * @return {Function} constructor function
     */       
    lz.ctor = function (fn) {
        function F () {
            return lz.object(fn, arguments);
        }
        F.prototype = fn.prototype;
        return F;
    };   
    

    if (Function.prototype.bind) {
        /**
         * The bind takes two or more arguments, fn, thisArg and (optionally) arg1, arg2, etc, 
         * and returns a new function. It uses native bind if available. 
         *
         * @memberOf lz
         * @category Function              
         * @param {Function} fn
         * @param {Object} thisVal
         * @return {Function}
         */    
        lz.bind = function (fn, thisVal) {
            return fn.bind.apply(fn, [].slice.call(arguments, 1));
        }
    }
    else {
        lz.bind = function (fn, thisVal) {
            var args = [].slice.call(arguments, 2);
            return function f() {
                var argsList = args.concat([].slice.call(arguments));
                if (this instanceof f) {
                    return lz.object(fn, argsList);
                }
                return fn.apply(thisVal, argsList);
            }
        }    
    }
    
    /**
     * Returns function which executes the passed function 
     * only once and returns its result, regardless of the number of calls.
     *
     * @memberOf lz     
     * @category Function     
     * @param {Function} fn
     * @return {Function} 
     */
    lz.once = function (fn) {
        var value;
        function f() {
            if (fn) {
                value = fn.apply(this, arguments);
                fn = null;
            }
            return value;
        }
        f.prototype = fn.prototype;
        return f;
    };
    
    /**
     * Creates lazy evaluated range. 
     * Returns function which accepts callback function, 
     * it is called for every member of the range.
     *
     * @memberOf lz    
     * @category Function      
     * @param {int} start
     * @param {int} [end] If it is not specified start=0; end=start
     * @param {int} [step] Step between the members of the range. Default is 1.   
     * @return {Function}
     */
    lz.range = function (start, end, step) {
        step = Math.floor(Math.abs(step)) || 1;
        if (lz.type(end) == 'undefined') {
            end = start; 
            start = 0;         
        }
        else if (start > end) {
            var s = start;
            start = end;
            end = s;
        }
        
        return function (fn) {
            for (var i = start; i < end; i += step) {
                fn(i);
            }
        };                           
    };
    
    /**
     * Memoize the result of function calls. 
     * Useful in repeatedly invoking of function with same arguments. 
     * Avoids the recomputation of the returned result. 
     *
     * @memberOf lz 
     * @category Function         
     * @credits to Steven Levithan
     * @param {Function} fn
     * @return {Function}
     */
    lz.memo = function (fn) {
        var cache = {};
        return function () {
            var key = [].join.call(arguments, '§') + '§';
            if (key in cache) {
                return cache[key];
            }
            return cache[key] = fn.apply(this, arguments);
        };              
    };
    
    /**
     * Executes the passed function N times. 
     * Pass the current index of call to the function. 
     * If function returns a value different than undefined, 
     * it will be stored in array.
     * 
     * @memberOf lz       
     * @category Function   
     * @param {int} times
     * @param {Function} fn
     * @return {Function}       
     */
    lz.times = function (times, fn) {
        var arr = [];
        for (var i = 0; i < times; i++) {
            var res = fn(i);
            if (lz.type(res) != 'undefined') {
                arr.push(res);
            }
        }
        return arr;        
    };    
    
    /**
     * Converts any array like object to true array object.  
     * 
     * @memberOf lz
     * @category Array/Collection         
     * @param {ArrayLike} obj
     * @return {Array}
     */
    lz.array = function (obj) {
        if (lz.classOf(obj) == 'String') {
            return obj.split('');
        } 
        var arr = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            arr.push(obj[i]);
        }
        return arr;
    };
    
    if (Array.prototype.every) {
        /**
         * Returns true if every element in obj 
         * satisfies the provided testing function.
         * 
         * @memberOf lz
         * @category Array/Collection             
         * @param {Array|ArrayLike} obj
         * @param {Function} fn callback function, accepts three arguments.
         * @param {*} [thisVal] the this value for callback calls.
         * @return {boolean} 
         */    
        lz.every = function (obj, fn, thisVal) {
            return [].every.call(obj, fn, thisVal);    
        }
    }
    else {
        lz.every = function (obj, fn, thisVal) {
            for (var i = 0, len = obj.length; i < len; i++) {
                if (i in obj && !fn.call(thisVal, obj[i], i, obj)) {
                    return false;
                }
            }
            return true;     
        }
    }

    if (Array.prototype.some) {
        /**
         * Returns true if at least one element in obj 
         * satisfies the provided testing function.
         * 
         * @memberOf lz 
         * @category Array/Collection        
         * @param {Array|ArrayLike} obj
         * @param {Function} fn callback function, accepts three arguments.
         * @param {*} [thisVal] the this value for callback calls.
         * @return {boolean} 
         */    
        lz.some = function (obj, fn, thisVal) {
            return [].some.call(obj, fn, thisVal);    
        }
    }
    else {
        lz.some = function (obj, fn, thisVal) {
            for (var i = 0, len = obj.length; i < len; i++) {
                if (i in obj && fn.call(thisVal, obj[i], i, obj)) {
                    return true;
                }
            }
            return false;         
        }
    }
      
    if (Array.prototype.forEach) {
        /**
         * Calls a function for each element in obj.
         * 
         * @memberOf lz  
         * @category Array/Collection       
         * @param {Array|ArrayLike} obj
         * @param {Function} fn callback function, accepts three arguments.
         * @param {*} [thisVal] the this value for callback calls.
         */      
        lz.each = function (obj, fn, thisVal) {
            [].forEach.call(obj, fn, thisVal);
        }
    }
    else {
        lz.each = function (obj, fn, thisVal) {
            for (var i = 0, len = obj.length; i < len; i++) {
                if (i in obj) {
                    fn.call(thisVal, obj[i], i, obj);
                }
            }        
        }
    }
     
    if (Array.prototype.map) {
        /**
         * Creates a new array with the results of calling 
         * a provided function on every element in obj.
         *
         * @memberOf lz       
         * @category Array/Collection  
         * @param {Array|ArrayLike} obj
         * @param {Function} fn callback function, accepts three arguments.
         * @param {*} [thisVal] the this value for callback calls.
         * @return {Array}
         */      
        lz.map = function (obj, fn, thisVal) {
            return [].map.call(obj, fn, thisVal);
        }
    }
    else {
        lz.map = function (obj, fn, thisVal) {
            var len = obj.length >>> 0,
                arr = new Array(len);
            for (var i = 0; i < len; i++) {
                if (i in obj) {
                    arr[i] = fn.call(thisVal, obj[i], i, obj);
                }
            }
            return arr;    
        }
    }
         
    if (Array.prototype.filter) {
        /**
         * Creates a new array with all of the elements of obj
         * for which the provided filtering function returns true.
         * If function is not provided, returns dense array. 
         *
         * @memberOf lz   
         * @category Array/Collection      
         * @param {Array|ArrayLike} obj
         * @param {Function} fn callback function, accepts three arguments.
         * @param {*} [thisVal] the this value for callback calls.
         * @return {Array}
         */    
        lz.filter = function (obj, fn, thisVal) {
            if (arguments.length < 2) {
                var fn = function () {return true};
            }
            return [].filter.call(obj, fn, thisVal);            
        }
    }
    else {
        lz.filter = function (obj, fn, thisVal) {
            var arr = [];
            if (arguments.length < 2) {
                var fn = function () {return true};
            }
            for (var i = 0, len = obj.length; i < len; i++) {
                var val = obj[i];
                if (i in obj && fn.call(thisVal, val, i, obj)) {
                    arr.push(val);
                }
            }
            return arr;    
        }
    }
        
    if (Array.prototype.reduce) {
        /**
         * Apply a function simultaneously against two values 
         * of the obj (from left-to-right) as to reduce it to a single value. 
         *
         * @memberOf lz  
         * @category Array/Collection       
         * @param {Array|ArrayLike} obj
         * @param {Function} fn callback function, accepts four arguments.
         * @param {*} initVal the initial value.
         * @return reduced value.
         */     
        lz.reduce = function (obj, fn, initVal) {
            return [].reduce.apply(obj, [].slice.call(arguments, 1));
        }
    }
    else {
        lz.reduce = function (obj, fn, initVal) {
            var len = obj.length,
                i = 0, 
                acc;
            if (arguments.length > 2) {
                acc = initVal;
            }
            else {
                do {
                    if (i in obj) {
                        acc = obj[i];
                        break;    
                    }
                } while (i++ < len);
                
                if (++i > len) {
                    throw new TypeError('reduce of empty array with no initial value');
                }
            }
            for (;i < len; i++) {
                if (i in obj) {
                    acc = fn(acc, obj[i], i, obj);
                }
            } 
            return acc;             
        }
    }
         
    if (Array.prototype.reduceRight) {
        /**
         * Apply a function simultaneously against two values 
         * of the obj (from right-to-left) as to reduce it to a single value. 
         *
         * @memberOf lz  
         * @category Array/Collection       
         * @param {Array|ArrayLike} obj
         * @param {Function} fn callback function, accepts four arguments.
         * @param {*} initVal the initial value.
         * @return reduced value.
         */      
        lz.reduceRight = function (obj, fn, initVal) {
            return [].reduceRight.apply(obj, [].slice.call(arguments, 1));
        }
    }
    else {
        lz.reduceRight = function (obj, fn, initVal) {
            var i = Math.max(0, obj.length), 
                acc;
            if (arguments.length > 2) {
                acc = initVal;
            }
            else {
                while(i--) {
                    if (i in obj) {
                        acc = obj[i];
                        break;    
                    }
                }
                if (i < 0) {
                    throw new TypeError('reduce of empty array with no initial value');
                }
            }
            while (i--) {
                if (i in obj) {
                    acc = fn(acc, obj[i], i, obj);       
                }    
            }
            return acc;                     
        }
    }
    
    /**
     * Creates new array with uniques values in obj.  
     * If callback function is passed, it is used as transformation of the value.
     * 
     * @memberOf lz    
     * @category Array/Collection 
     * @param {Array|ArrayLike} obj 
     * @param {Function} [fn] It accepts one argument, the current value in obj.
     * @return {Array}
     */
    lz.uniq = function(obj, fn) {
        var map = {},
            set = [],
            objSet = [],
            isFunc = typeof fn == 'function';
        for (var i = 0, len = obj.length; i < len; i++) {
            var value = isFunc ? fn(obj[i]) : obj[i];
            if (lz.isPrimitive(value)) {
                var key = (typeof value == 'string' ? '"' + value + '"' : value);
                if (!(key in map)) {
                    map[key] = 1;
                    set.push(value);
                }            
            }
            else {
                for (var j = objSet.length; j--;) {
                    if (objSet[j] === value) {
                        break;
                    }
                }
                if (j < 0) {
                    objSet.push(value);
                    set.push(value);    
                }            
            }
        }
        return set; 
    };
    
    /**
     * Returns random permutation of the array. 
     * It does not mutate the obj.
     *
     * @memberOf lz 
     * @category Array/Collection        
     * @param {Array|ArrayLike} obj
     * @return {Array}  
     */
    lz.shuffle = function (obj) {
        var arr = lz.array(obj);
        for (var i = arr.length; i-- > 1;) {
            var j = Math.round(Math.random() * i),
                val = arr[j];
            arr[j] = arr[i];
            arr[i] = val;
        }
        return arr;    
    };    
    

    var indexOf;
    if (Array.prototype.indexOf) {
        /**
         * indexOf in array
         * @private
         */    
        indexOf = function (arr, value, pos) {
            return [].indexOf.call(arr, value, pos);           
        }    
    }
    else {
        indexOf = function (arr, value, pos) {
            var len = arr.length,
                i = pos | 0;
            if (i < 0) {
                i = Math.max(0, len + i);
            }
            for (;i < len; i++) {
                if (i in arr && arr[i] === value) {
                    return i;
                }
            }
            return -1;
        }
    }
    
    /**
     * Searches the value in given obj and pos from left-to-right.
     * If it cannot be found, returns -1
     * otherwise the position of occurrence.
     * 
     * @memberOf lz 
     * @category Array/Collection        
     * @param {Array|ArrayLike|string} obj
     * @param {*} value
     * @param {int} [pos]  
     */
    lz.indexOf = function (obj, value, pos) {
        if (typeof obj == 'string' || lz.classOf(obj) == 'String') {
            return obj.indexOf(value, pos);
        }
        return indexOf(obj, value, pos);        
    };
        
    var lastIndexOf;
    if (Array.prototype.lastIndexOf) {
        /**
         * lastIndexOf in array
         * @private
         */    
        lastIndexOf = function (arr, value, pos) {            
            return [].lastIndexOf.call(arr, value, pos);           
        }    
    }
    else {
        lastIndexOf = function (arr, value, pos) {
            var len = arr.length,
                i;
            if (pos >= 0) {
                i = Math.min(pos, len - 1) | 0;
            }
            else {
                i = len + (pos | 0);
            }
            for (;i >= 0; i--) {
                if (i in arr && arr[i] === value) {
                    return i;
                }   
            }
            return -1;
        }
    }
    
    /**
     * Searches the value in given obj and pos from right-to-left.
     * If it cannot be found, returns -1
     * otherwise the position of occurrence.
     * 
     * @memberOf lz  
     * @category Array/Collection       
     * @param {Array|ArrayLike|string} obj
     * @param {*} value
     * @param {int} [pos]  
     */    
    lz.lastIndexOf = function (obj, value, pos) {
        if (typeof obj == 'string' || lz.classOf(obj) == 'String') {
            return obj.lastIndexOf(value, pos);    
        }
        pos = +pos;
        if (isNaN(pos)) pos = Infinity;
        return lastIndexOf(obj, value, pos);
    };
    
    /**
     * Returns true if the value is found in obj, otherwise false. 
     * 
     * @memberOf lz    
     * @category Array/Collection     
     * @param {Array|ArrayLike|string} obj
     * @param {Number} [pos] 
     * @param {*} value  
     */     
    lz.contains = function (obj, value, pos) {
        if (lz.classOf(obj) == 'String') {    
            return obj.indexOf(value, pos) > -1;
        }
        var len = obj.length,
            i = pos | 0;
        if (i < 0) {
            i = Math.max(0, len + i);
        } 
        for (;i < len; i++) {
            if (i in obj && lz.sameValue(obj[i], value)) {
                return true;
            }
        }
        return false;               
    };
    
    /**
     * Repeats the given object N times. 
     * 
     * @memberOf lz     
     * @category Array/Collection    
     * @param {Array|string} obj
     * @param {int} times  
     */     
    lz.repeat = function (obj, times) {
        var res =  (lz.classOf(obj) == 'String' ? '' : []);
        for (var mul = Math.max(0, times); mul; mul >>= 1) {
            if (mul & 0x1) res = res.concat(obj);
            obj = obj.concat(obj);
        }
        return res;         
    };        
    
    if (String.prototype.trim) {
        /**
         * Trim the leading and trailing 
         * white spaces from a given string.
         * 
         * @memberOf lz 
         * @category String             
         * @param {string} str
         * @return {string} 
         */    
        lz.trim = function (str) {
            return str.trim();
        };
    }
    else {    
        lz.trim = function (str) {
            return str.replace(/^\s+|\s+$/g, '');
        };
    }
    
    /**
     * Substitutes the place holders `${prop}` in string
     * with the properties value of obj. 
     * 
     * @memberOf lz     
     * @category String     
     * @param {string} str
     * @param {Object} argv
     * @return {string}
     */    
    lz.fill = function (str, argv) {
        var buffer = [],
            pos = 0, 
            argc = 0,
            offset, value, idx;
        
        while((offset = str.indexOf('${', ++offset)) > -1) {
            buffer.push(str.slice(pos, offset));
            pos = str.indexOf('}', offset) + 1;
            if (pos) {
                var prop = str.slice(offset + 2, pos -1);
                buffer.push(prop ? argv[prop] : argv[argc++]);      
            }
            else {
                pos = offset;
            }
        }
        buffer.push(str.slice(pos));
        return buffer.join('');
    };
    
    /**
     * Converts a string separated by 
     * dashes into a camelCase equivalent.
     * 
     * @memberOf lz 
     * @category String         
     * @param {string} str
     * @return {string}
     */
    lz.camelize = function (str) {
        var outstr = '',
            s = 0, e;
        while ((e = str.indexOf('-', ++e)) > -1) {
            outstr += str.slice(s, e) + str.charAt(e + 1).toUpperCase();
            s = e + 2;
        }
        return outstr + str.slice(s);
    };
    
    /**
     * Capitalizes the first letter of a string 
     * and downcases all the others.
     * 
     * @memberOf lz         
     * @category String 
     * @param {string} str
     * @return {string}
     */    
    lz.capitalize = function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }; 
    
    /**
     * Converts a camelized string into a series
     * of words separated by an underscore (_).
     * 
     * @memberOf lz   
     * @category String       
     * @param {string} str
     * @return {string}
     */    
    lz.underscore = function (str) {
        return str.replace(/[A-Z]/g, '_$&').toLowerCase();
    };    
    
    /**
     * Replaces every instance of the underscore 
     * character "_" by a dash "-".
     * 
     * @memberOf lz   
     * @category String       
     * @param {string} str
     * @return {string}
     */        
    lz.dasherize = function (str) {
        return str.replace(/_/g, '-');
    };
    
    /**
     * Checks whether the string 
     * starts with the given substring.
     * 
     * @memberOf lz     
     * @category String     
     * @param {string} str
     * @param {string} prefix 
     * @return {boolean} 
     */
    lz.startsWith = function (str, prefix) {
        return str.lastIndexOf(prefix, 0) == 0;        
    };
    
    /**
     * Checks whether the string 
     * ends with the given substring.
     * 
     * @memberOf lz     
     * @category String     
     * @param {string} str
     * @param {string} suffix 
     * @return {boolean} 
     */    
    lz.endsWith = function (str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) > -1;
    };
    
    /**
     * Padds the number string from left with 
     * zeros to the given size.
     * Strings starting with a sign are handled correctly. 
     * 
     * @memberOf lz
     * @category String 
     * @param {string} num
     * @param {int} size 
     * @return {string} 
     */     
    lz.zpadd = function (num, size) {
        var str = String(num),
            sign = str.charAt(0),
            len = str.length;
            
        if (sign == '-' || sign == '+')
            str = str.slice(1);
        else 
            sign = '';
        
        while (len++ < size) {
            str = '0' + str;
        }
        return sign + str;
    };
    
    /**
     * Returns the number of occurrences of 
     * the given substring in string. 
     * 
     * @credits Rick Waldron 
     * @memberOf lz
     * @category String 
     * @param {string} str
     * @param {string} substr
     * @return {int} 
     */
    lz.count = function(str, substr) {
        return substr.length && str.split(substr).length - 1;
    };  
    
    /**
     * Case insensitive comparison of two strings.
     * 
     * @memberOf lz
     * @category String 
     * @param {string} lstr
     * @param {string} rstr
     * @return {boolean}
     */
    lz.inscmp = function(lstr, rstr) {
        return lstr.toLowerCase() == rstr.toLowerCase();
    };
    
    if (Number.prototype.clz) {
        /**
         * Counts the number of leading zero 
         * bits of the given integer.
         * 
         * @memberOf lz
         * @category Number
         * @param {int} num
         * @return {int} 
         */    
        lz.clz = function (num) {
            return num.clz();
        }; 
    }
    else {
        lz.clz = function (num) {
            var zc = 0;
            if (num == 0) return 32;
            if (!(num & 0xFFFF0000)) {zc += 16; num <<= 16;}
            if (!(num & 0xFF000000)) {zc += 8;  num <<=  8;}
            if (!(num & 0xF0000000)) {zc += 4;  num <<=  4;}
            if (!(num & 0xC0000000)) {zc += 2;  num <<=  2;}
            if (!(num & 0x80000000)) {zc += 1;  num <<=  1;}

            return zc;    
        };
    }
    
    /**
     * Counts the number of trailing zero 
     * bits of the given integer.
     * 
     * @memberOf lz
     * @category Number
     * @param {int} num
     * @return {int} 
     */    
    lz.ctz = function (num) {
        var zc = 0;
        if (num == 0) return 32;
        if (!(num & 0x0000FFFF)) {zc += 16; num >>= 16;}
        if (!(num & 0x000000FF)) {zc += 8;  num >>=  8;}
        if (!(num & 0x0000000F)) {zc += 4;  num >>=  4;}
        if (!(num & 0x00000003)) {zc += 2;  num >>=  2;}
        if (!(num & 0x00000001)) {zc += 1;  num >>=  1;}

        return zc;    
    };                             
}).call(this);
