# LZ v.0.5.1

<!-- div -->

<!-- div -->

## `Object`
* [`lz.create`](#lzcreateproto)
* [`lz.dup`](#lzdupobj)
* [`lz.isObject`](#lzisobjectval)
* [`lz.isPrimitive`](#lzisprimitiveval)
* [`lz.keys`](#lzkeysobj)
* [`lz.klass`](#lzklassobj)
* [`lz.mixin`](#lzmixindest--source1-source2-sourcen)
* [`lz.namespace`](#lznamespacespace--fn)
* [`lz.object`](#lzobjectctor-args)
* [`lz.omit`](#lzomitproperties)
* [`lz.select`](#lzselectproperties)
* [`lz.type`](#lztypeval)

<!-- /div -->

<!-- div -->

## <a id="Array/Collection"></a>`Array/Collection`
* [`lz.array`](#lzarrayobj)
* [`lz.contains`](#lzcontainsobj-value)
* [`lz.each`](#lzeachobj-fn--thisval)
* [`lz.every`](#lzeveryobj-fn--thisval)
* [`lz.filter`](#lzfilterobj-fn--thisval)
* [`lz.indexOf`](#lzindexofobj-value--pos)
* [`lz.lastIndexOf`](#lzlastindexofobj-value--pos)
* [`lz.map`](#lzmapobj-fn--thisval)
* [`lz.reduce`](#lzreduceobj-fn-initval)
* [`lz.reduceRight`](#lzreducerightobj-fn-initval)
* [`lz.repeat`](#lzrepeatobj-times)
* [`lz.shuffle`](#lzshuffleobj)
* [`lz.some`](#lzsomeobj-fn--thisval)
* [`lz.uniq`](#lzuniqobj--fn)

<!-- /div -->


<!-- div -->

## `Function`
* [`lz.bind`](#lzbindfn-thisval)
* [`lz.ctor`](#lzctorfn)
* [`lz.memo`](#lzmemofn)
* [`lz.once`](#lzoncefn)
* [`lz.range`](#lzrangestart--end-step)
* [`lz.times`](#lztimestimes-fn)

<!-- /div -->

<!-- div -->

## `String`
* [`lz.camelize`](#lzcamelizestr)
* [`lz.capitalize`](#lzcapitalizestr)
* [`lz.count`](#lzcountstr-substr)
* [`lz.dasherize`](#lzdasherizestr)
* [`lz.endsWith`](#lzendswithstr-suffix)
* [`lz.fill`](#lzfillstr-argv)
* [`lz.inscmp`](#lzinscmplstr-rstr)
* [`lz.startsWith`](#lzstartswithstr-prefix)
* [`lz.trim`](#lztrimstr)
* [`lz.underscore`](#lzunderscorestr)
* [`lz.zpadd`](#lzzpaddnum-size)

<!-- /div -->

<!-- div -->

## `Number`
* [`lz.clz`](#lzclznum)
* [`lz.ctz`](#lzctznum)

<!-- /div -->


<!-- div -->

## `Properties`
* [`lz`](#lz)

<!-- /div -->


<!-- /div -->


<!-- div -->

<!-- div -->

## `“Object” Methods`

<!-- div -->

### <a id="lzcreateproto"></a>`lz.create(proto)`
<a href="#lzcreateproto">#</a> [&#x24C8;](#L164 "View in source") [&#x24C9;][1]

Creates new object with given object as prototype.

#### Arguments
1. `proto` *(Object)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzdupobj"></a>`lz.dup(obj)`
<a href="#lzdupobj">#</a> [&#x24C8;](#L272 "View in source") [&#x24C9;][1]

Returns shallow copy of object.  If obj is not an object throw TypeError. 
<pre> 
.---------------------------------------------,   
| Object type  | Copying                      |   
-----------------------------------------------   
| Array        | Numeric index properties.    | 
|              | Returns new array object.    | 
----------------------------------------------- 
| Date         | Timestamp value.             | 
|              | Returns new date object.     | 
----------------------------------------------- 
| Function     | Binds function and return it.|   
----------------------------------------------- 
| RegExp       | Regex pattern and flags.     | 
|              | Returns new RegExp object.   | 
----------------------------------------------- 
| Number       | Internal primitive value.    | 
| Boolean      | Returns new object from      | 
| String       | the given type.              | 
-----------------------------------------------  
| Object       | Own enumerable properties.   | 
|              | Keeps the prototype chain.   | 
|              | Returns new Object.          | 
----------------------------------------------- 
</pre>

#### Arguments
1. `obj` *(Object)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzisobjectval"></a>`lz.isObject(val)`
<a href="#lzisobjectval">#</a> [&#x24C8;](#L92 "View in source") [&#x24C9;][1]

Tests whether the value is object reference.

#### Arguments
1. `val` ():

* * *

<!-- /div -->


<!-- div -->

### <a id="lzisprimitiveval"></a>`lz.isPrimitive(val)`
<a href="#lzisprimitiveval">#</a> [&#x24C8;](#L104 "View in source") [&#x24C9;][1]

Tests whether the value is primitive value.

#### Arguments
1. `val` ():

* * *

<!-- /div -->


<!-- div -->

### <a id="lzkeysobj"></a>`lz.keys(obj)`
<a href="#lzkeysobj">#</a> [&#x24C8;](#L185 "View in source") [&#x24C9;][1]

Returns array of own enumerable properties of given object.

#### Arguments
1. `obj` *(Object)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzklassobj"></a>`lz.klass(obj)`
<a href="#lzklassobj">#</a> [&#x24C8;](#L42 "View in source") [&#x24C9;][1]

Retrieves the type tag of object.  Useful for nominal type checking.

#### Arguments
1. `obj` *(Object)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzmixindest--source1-source2-sourcen"></a>`lz.mixin(dest [, source1, source2, ... sourceN])`
<a href="#lzmixindest--source1-source2-sourcen">#</a> [&#x24C8;](#L212 "View in source") [&#x24C9;][1]

Mixes own enumerable properties of source objects in dest object.  If property already exists, it overwrites.

#### Arguments
1. `dest` *(Object)*: - Destination object
2. `[source1, source2, ... sourceN]` *(Object)*: - Source objects

* * *

<!-- /div -->


<!-- div -->

### <a id="lznamespacespace--fn"></a>`lz.namespace(space [, fn])`
<a href="#lznamespacespace--fn">#</a> [&#x24C8;](#L371 "View in source") [&#x24C9;][1]

Creates and initialize namespace starting from the global space. If initialize function is provided, it is called  with namespace object as first argument.

#### Arguments
1. `space` *(string)*:
2. `[fn]` *(Function)*: - optional initializer of the namespace

* * *

<!-- /div -->


<!-- div -->

### <a id="lzobjectctor-args"></a>`lz.object(ctor, args)`
<a href="#lzobjectctor-args">#</a> [&#x24C8;](#L119 "View in source") [&#x24C9;][1]

Creates new instance object via passed constructor function.  The arguments list for constructor is provided by an array.

#### Arguments
1. `ctor` *(Function)*: - constructor function
2. `args` *(Array)*: - arguments list

* * *

<!-- /div -->


<!-- div -->

### <a id="lzomitproperties"></a>`lz.omit(properties)`
<a href="#lzomitproperties">#</a> [&#x24C8;](#L340 "View in source") [&#x24C9;][1]

Black list filter factory. Accepts variable length of properties,  which will not be selected from passed objects  to the returned function.

#### Arguments
1. `properties` *(string)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzselectproperties"></a>`lz.select(properties)`
<a href="#lzselectproperties">#</a> [&#x24C8;](#L310 "View in source") [&#x24C9;][1]

White list filter factory. Accepts variable length of properties,  which will be selected from passed objects  to the returned function.

#### Arguments
1. `properties` *(string)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lztypeval"></a>`lz.type(val)`
<a href="#lztypeval">#</a> [&#x24C8;](#L71 "View in source") [&#x24C9;][1]

Retrieves the type of the value.  Extending built-in typeof operator.   

<pre> 
,---------------------------------. 
| Type of val    |  Result string | 
----------------------------------- 
| Undefined      | undefined      | 
| Null           | null           |       
| Number         | number         | 
| String         | string         | 
| Boolean        | boolean        | 
| Array          | array          | 
| callable obj   | function       | 
| Object         | object         | 
| Host object    | impl. depend   | 
`---------------------------------` 
</pre>

#### Arguments
1. `val` ():

* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Array/Collection” Methods`

<!-- div -->

### <a id="lzarrayobj"></a>`lz.array(obj)`
<a href="#lzarrayobj">#</a> [&#x24C8;](#L541 "View in source") [&#x24C9;][1]

Converts any array like object to true array object.

#### Arguments
1. `obj` *(ArrayLike)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzcontainsobj-value"></a>`lz.contains(obj, value)`
<a href="#lzcontainsobj-value">#</a> [&#x24C8;](#L944 "View in source") [&#x24C9;][1]

Returns true if the value is found in obj, otherwise false.

#### Arguments
1. `obj` *(Array|ArrayLike|string)*:
2. `value` ():

* * *

<!-- /div -->


<!-- div -->

### <a id="lzeachobj-fn--thisval"></a>`lz.each(obj, fn [, thisVal])`
<a href="#lzeachobj-fn--thisval">#</a> [&#x24C8;](#L616 "View in source") [&#x24C9;][1]

Calls a function for each element in obj.

#### Arguments
1. `obj` *(Array|ArrayLike)*:
2. `fn` *(Function)*: callback function, accepts three arguments.
3. `[thisVal]` (): the this value for callback calls.

* * *

<!-- /div -->


<!-- div -->

### <a id="lzeveryobj-fn--thisval"></a>`lz.every(obj, fn [, thisVal])`
<a href="#lzeveryobj-fn--thisval">#</a> [&#x24C8;](#L564 "View in source") [&#x24C9;][1]

Returns true if every element in obj  satisfies the provided testing function.

#### Arguments
1. `obj` *(Array|ArrayLike)*:
2. `fn` *(Function)*: callback function, accepts three arguments.
3. `[thisVal]` (): the this value for callback calls.

* * *

<!-- /div -->


<!-- div -->

### <a id="lzfilterobj-fn--thisval"></a>`lz.filter(obj, fn [, thisVal])`
<a href="#lzfilterobj-fn--thisval">#</a> [&#x24C8;](#L672 "View in source") [&#x24C9;][1]

Creates a new array with all of the elements of obj for which the provided filtering function returns true. If function is not provided, returns dense array.

#### Arguments
1. `obj` *(Array|ArrayLike)*:
2. `fn` *(Function)*: callback function, accepts three arguments.
3. `[thisVal]` (): the this value for callback calls.

* * *

<!-- /div -->


<!-- div -->

### <a id="lzindexofobj-value--pos"></a>`lz.indexOf(obj, value [, pos])`
<a href="#lzindexofobj-value--pos">#</a> [&#x24C8;](#L880 "View in source") [&#x24C9;][1]

Searches the value in given obj and pos from left-to-right. If it cannot be found, returns `-1` otherwise the position of occurrence.

#### Arguments
1. `obj` *(Array|ArrayLike|string)*:
2. `value` ():
3. `[pos]` *(int)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzlastindexofobj-value--pos"></a>`lz.lastIndexOf(obj, value [, pos])`
<a href="#lzlastindexofobj-value--pos">#</a> [&#x24C8;](#L927 "View in source") [&#x24C9;][1]

Searches the value in given obj and pos from right-to-left. If it cannot be found, returns `-1` otherwise the position of occurrence.

#### Arguments
1. `obj` *(Array|ArrayLike|string)*:
2. `value` ():
3. `[pos]` *(int)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzmapobj-fn--thisval"></a>`lz.map(obj, fn [, thisVal])`
<a href="#lzmapobj-fn--thisval">#</a> [&#x24C8;](#L642 "View in source") [&#x24C9;][1]

Creates a new array with the results of calling  a provided function on every element in obj.

#### Arguments
1. `obj` *(Array|ArrayLike)*:
2. `fn` *(Function)*: callback function, accepts three arguments.
3. `[thisVal]` (): the this value for callback calls.

* * *

<!-- /div -->


<!-- div -->

### <a id="lzreduceobj-fn-initval"></a>`lz.reduce(obj, fn, initVal)`
<a href="#lzreduceobj-fn-initval">#</a> [&#x24C8;](#L707 "View in source") [&#x24C9;][1]

Apply a function simultaneously against two values  of the obj *(from left-to-right)* as to reduce it to a single value.

#### Arguments
1. `obj` *(Array|ArrayLike)*:
2. `fn` *(Function)*: callback function, accepts four arguments.
3. `initVal` (): the initial value.

* * *

<!-- /div -->


<!-- div -->

### <a id="lzreducerightobj-fn-initval"></a>`lz.reduceRight(obj, fn, initVal)`
<a href="#lzreducerightobj-fn-initval">#</a> [&#x24C8;](#L752 "View in source") [&#x24C9;][1]

Apply a function simultaneously against two values  of the obj *(from right-to-left)* as to reduce it to a single value.

#### Arguments
1. `obj` *(Array|ArrayLike)*:
2. `fn` *(Function)*: callback function, accepts four arguments.
3. `initVal` (): the initial value.

* * *

<!-- /div -->


<!-- div -->

### <a id="lzrepeatobj-times"></a>`lz.repeat(obj, times)`
<a href="#lzrepeatobj-times">#</a> [&#x24C8;](#L956 "View in source") [&#x24C9;][1]

Repeats the given object N times.

#### Arguments
1. `obj` *(Array|string)*:
2. `times` *(int)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzshuffleobj"></a>`lz.shuffle(obj)`
<a href="#lzshuffleobj">#</a> [&#x24C8;](#L831 "View in source") [&#x24C9;][1]

Returns random permutation of the array.  It does not mutate the obj.

#### Arguments
1. `obj` *(Array|ArrayLike)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzsomeobj-fn--thisval"></a>`lz.some(obj, fn [, thisVal])`
<a href="#lzsomeobj-fn--thisval">#</a> [&#x24C8;](#L591 "View in source") [&#x24C9;][1]

Returns true if at least one element in obj  satisfies the provided testing function.

#### Arguments
1. `obj` *(Array|ArrayLike)*:
2. `fn` *(Function)*: callback function, accepts three arguments.
3. `[thisVal]` (): the this value for callback calls.

* * *

<!-- /div -->


<!-- div -->

### <a id="lzuniqobj--fn"></a>`lz.uniq(obj [, fn])`
<a href="#lzuniqobj--fn">#</a> [&#x24C8;](#L793 "View in source") [&#x24C9;][1]

Creates new array with uniques values in obj.   If callback function is passed, it is used as transformation of the value.

#### Arguments
1. `obj` *(Array|ArrayLike)*:
2. `[fn]` *(Function)*: It accepts one argument, the current value in obj.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `“Function” Methods`

<!-- div -->

### <a id="lzbindfn-thisval"></a>`lz.bind(fn, thisVal)`
<a href="#lzbindfn-thisval">#</a> [&#x24C8;](#L418 "View in source") [&#x24C9;][1]

The bind takes two or more arguments, fn, thisArg and *(optionally)* arg1, arg2, etc,  and returns a new function. It uses native bind if available.

#### Arguments
1. `fn` *(Function)*:
2. `thisVal` *(Object)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzctorfn"></a>`lz.ctor(fn)`
<a href="#lzctorfn">#</a> [&#x24C8;](#L398 "View in source") [&#x24C9;][1]

Creates constructor function. Regardless of calling with or without `new` keyword it always behaves as it called with `new` keyword.

#### Arguments
1. `fn` *(Function)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzmemofn"></a>`lz.memo(fn)`
<a href="#lzmemofn">#</a> [&#x24C8;](#L499 "View in source") [&#x24C9;][1]

Memoize the result of function calls.  Useful in repeatedly invoking of function with same arguments.  Avoids the recomputation of the returned result.

#### Arguments
1. `fn` *(Function)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzoncefn"></a>`lz.once(fn)`
<a href="#lzoncefn">#</a> [&#x24C8;](#L444 "View in source") [&#x24C9;][1]

Returns function which executes the passed function  only once and returns its result, regardless of the number of calls.

#### Arguments
1. `fn` *(Function)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzrangestart--end-step"></a>`lz.range(start [, end, step])`
<a href="#lzrangestart--end-step">#</a> [&#x24C8;](#L469 "View in source") [&#x24C9;][1]

Creates lazy evaluated range.  Returns function which accepts callback function,  it is called for every member of the range.

#### Arguments
1. `start` *(int)*:
2. `[end]` *(int)*: If it is not specified start=0; end=start
3. `[step]` *(int)*: Step between the members of the range. Default is `1`.

* * *

<!-- /div -->


<!-- div -->

### <a id="lztimestimes-fn"></a>`lz.times(times, fn)`
<a href="#lztimestimes-fn">#</a> [&#x24C8;](#L522 "View in source") [&#x24C9;][1]

Executes the passed function N times.  Pass the current index of call to the function.  If function returns a value different than undefined,  it will be stored in array.

#### Arguments
1. `times` *(int)*:
2. `fn` *(Function)*:

* * *

<!-- /div -->


<!-- /div -->

<!-- div -->

## `“String” Methods`

<!-- div -->

### <a id="lzcamelizestr"></a>`lz.camelize(str)`
<a href="#lzcamelizestr">#</a> [&#x24C8;](#L1027 "View in source") [&#x24C9;][1]

Converts a string separated by  dashes into a camelCase equivalent.

#### Arguments
1. `str` *(string)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzcapitalizestr"></a>`lz.capitalize(str)`
<a href="#lzcapitalizestr">#</a> [&#x24C8;](#L1046 "View in source") [&#x24C9;][1]

Capitalizes the first letter of a string  and downcases all the others.

#### Arguments
1. `str` *(string)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzcountstr-substr"></a>`lz.count(str, substr)`
<a href="#lzcountstr-substr">#</a> [&#x24C8;](#L1141 "View in source") [&#x24C9;][1]

Returns the number of occurrences of  the given substring in string.

#### Arguments
1. `str` *(string)*:
2. `substr` *(string)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzdasherizestr"></a>`lz.dasherize(str)`
<a href="#lzdasherizestr">#</a> [&#x24C8;](#L1072 "View in source") [&#x24C9;][1]

Replaces every instance of the underscore  character "_" by a dash "-".

#### Arguments
1. `str` *(string)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzendswithstr-suffix"></a>`lz.endsWith(str, suffix)`
<a href="#lzendswithstr-suffix">#</a> [&#x24C8;](#L1100 "View in source") [&#x24C9;][1]

Checks whether the string  ends with the given substring.

#### Arguments
1. `str` *(string)*:
2. `suffix` *(string)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzfillstr-argv"></a>`lz.fill(str, argv)`
<a href="#lzfillstr-argv">#</a> [&#x24C8;](#L997 "View in source") [&#x24C9;][1]

Substitutes the place holders `${prop}` in string with the properties value of obj.

#### Arguments
1. `str` *(string)*:
2. `argv` *(Object)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzinscmplstr-rstr"></a>`lz.inscmp(lstr, rstr)`
<a href="#lzinscmplstr-rstr">#</a> [&#x24C8;](#L1159 "View in source") [&#x24C9;][1]

Case insensitive comparison of two strings.

#### Arguments
1. `lstr` *(string)*:
2. `rstr` *(string)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzstartswithstr-prefix"></a>`lz.startsWith(str, prefix)`
<a href="#lzstartswithstr-prefix">#</a> [&#x24C8;](#L1086 "View in source") [&#x24C9;][1]

Checks whether the string  starts with the given substring.

#### Arguments
1. `str` *(string)*:
2. `prefix` *(string)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lztrimstr"></a>`lz.trim(str)`
<a href="#lztrimstr">#</a> [&#x24C8;](#L977 "View in source") [&#x24C9;][1]

Trim the leading and trailing  white spaces from a given string.

#### Arguments
1. `str` *(string)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzunderscorestr"></a>`lz.underscore(str)`
<a href="#lzunderscorestr">#</a> [&#x24C8;](#L1059 "View in source") [&#x24C9;][1]

Converts a camelized string into a series of words separated by an underscore *(_)*.

#### Arguments
1. `str` *(string)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzzpaddnum-size"></a>`lz.zpadd(num, size)`
<a href="#lzzpaddnum-size">#</a> [&#x24C8;](#L1115 "View in source") [&#x24C9;][1]

Padds the number string from left with  zeros to the given size. Strings starting with a sign are handled correctly.

#### Arguments
1. `num` *(string)*:
2. `size` *(int)*:

* * *

<!-- /div -->


<!-- /div -->

<!-- div -->

## `“Number” Methods`

<!-- div -->

### <a id="lzclznum"></a>`lz.clz(num)`
<a href="#lzclznum">#</a> [&#x24C8;](#L1173 "View in source") [&#x24C9;][1]

Counts the number of leading zero  bits of the given integer.

#### Arguments
1. `num` *(int)*:

* * *

<!-- /div -->


<!-- div -->

### <a id="lzctznum"></a>`lz.ctz(num)`
<a href="#lzctznum">#</a> [&#x24C8;](#L1200 "View in source") [&#x24C9;][1]

Counts the number of trailing zero  bits of the given integer.

#### Arguments
1. `num` *(int)*:

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Properties`

<!-- div -->

### <a id="lz"></a>`lz`
<a href="#lz">#</a> [&#x24C8;](#L20 "View in source") [&#x24C9;][1]

LZ Lib v.0.5.1  

* * *

<!-- /div -->


<!-- /div -->


<!-- /div -->


  [1]: #Array/Collection "Jump back to the TOC."
