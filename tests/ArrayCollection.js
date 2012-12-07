describe('Array/Collection', function() {
    var testSubject;
    beforeEach(function() {
        testSubject = [2, 3, undefined, true, 'hej', null, false, 0];
        delete testSubject[1];
    });
    function createArrayLikeFromArray(arr) {
        var o = {};
        lz.each(arr, function(e, i) {
            o[i]=e;
        });
        o.length = arr.length;
        return o;
    };
    
    describe('lz.each', function() {
        "use strict";
        var expected, actual;
        
        beforeEach(function() {
            expected = {0:2, 2: undefined, 3:true, 4: 'hej', 5:null, 6:false, 7:0 };
            actual = {};
        });
        it('should pass the right parameters', function() {
            var callback = jasmine.createSpy('callback'),
                array = ['1'];
            lz.each(array, callback);
            expect(callback).toHaveBeenCalledWith('1', 0, array);
        });
        it('should not affect elements added to the array after it has begun', function() {
            var arr = [1,2,3],
                i = 0;
            lz.each(arr, function(a) {
                i++;
                arr.push(a+3);
            });
            expect(arr).toEqual([1,2,3,4,5,6]);
            expect(i).toBe(3);
        });
        
        it('should set the right context when given none', function() {
            var context;
            lz.each([1], function() {context = this;});
            expect(context).toBe(function() {return this}.call());
        });
        it('should iterate all', function() {
            lz.each(testSubject, function(obj, index) {
                actual[index] = obj;
            });
            expect(actual).toExactlyMatch(expected);
        });
        it('should iterate all using a context', function() {
            var o = { a: actual };
    
            lz.each(testSubject, function(obj, index) {
                this.a[index] = obj;
            }, o);
            expect(actual).toExactlyMatch(expected);
        });
        
        it('should iterate all in an array-like object', function() {
            var ts = createArrayLikeFromArray(testSubject);
            lz.each(ts, function(obj, index) {
                actual[index] = obj;
            });
            expect(actual).toExactlyMatch(expected);
        });
        it('should iterate all in an array-like object using a context', function() {
            var ts = createArrayLikeFromArray(testSubject),
                o = { a: actual };
            
            lz.each(ts, function(obj, index) {
                this.a[index] = obj;
            }, o);
            expect(actual).toExactlyMatch(expected);
        });
    });
    

    describe('lz.some', function() {
        var actual, expected, numberOfRuns;
        
        beforeEach(function() {
            expected = {0:2, 2: undefined, 3:true };
            actual = {};
            numberOfRuns = 0;
        });
        
        it('should pass the correct values along to the callback', function() {
            var callback = jasmine.createSpy('callback');
            var array = ['1'];
            lz.some(array, callback);
            expect(callback).toHaveBeenCalledWith('1', 0, array);
        });
        it('should not affect elements added to the array after it has begun', function() {
            var arr = [1,2,3],
                i = 0;
            lz.some(arr, function(a) {
                i++;
                arr.push(a+3);
                return i > 3;
            });
            expect(arr).toEqual([1,2,3,4,5,6]);
            expect(i).toBe(3);
        });
        it('should set the right context when given none', function() {
            var context;
            lz.some([1], function() {context = this;});
            expect(context).toBe(function() {return this}.call());
        });
        
        it('should return false if it runs to the end', function() {
            actual = lz.some(testSubject, function() {});
            expect(actual).toBeFalsy();
        });
        it('should return true if it is stopped somewhere', function() {
            actual = lz.some(testSubject, function() { return true; });
            expect(actual).toBeTruthy();
        });
        it('should return false if there are no elements', function() {
            actual = lz.some([], function() { return true; });
            expect(actual).toBeFalsy();
        });
        
        it('should stop after 3 elements', function() {
            lz.some(testSubject, function(obj, index) {
                actual[index] = obj;
                numberOfRuns += 1;
                if(numberOfRuns == 3) {
                    return true;
                }
                return false;
            });
            expect(actual).toExactlyMatch(expected);
        });
        it('should stop after 3 elements using a context', function() {
            var o = { a: actual };
            lz.some(testSubject, function(obj, index) {
                this.a[index] = obj;
                numberOfRuns += 1;
                if(numberOfRuns == 3) {
                    return true;
                }
                return false;
            }, o);
            expect(actual).toExactlyMatch(expected);
        });
    
        it('should stop after 3 elements in an array-like object', function() {
            var ts = createArrayLikeFromArray(testSubject);
            lz.some(ts, function(obj, index) {
                actual[index] = obj;
                numberOfRuns += 1;
                if(numberOfRuns == 3) {
                    return true;
                }
                return false;
            });
            expect(actual).toExactlyMatch(expected);
        });
        it('should stop after 3 elements in an array-like object using a context', function() {
            var ts = createArrayLikeFromArray(testSubject);
            var o = { a: actual };
            lz.some(ts, function(obj, index) {
                this.a[index] = obj;
                numberOfRuns += 1;
                if(numberOfRuns == 3) {
                    return true;
                }
                return false;
            }, o);
            expect(actual).toExactlyMatch(expected);
        });
    });
    
    describe('lz.every', function() {
        var actual, expected, numberOfRuns;
        
        beforeEach(function() {
            expected = {0:2, 2: undefined, 3:true };
            actual = {};
            numberOfRuns = 0;
        });
        
        it('should pass the correct values along to the callback', function() {
            var callback = jasmine.createSpy('callback');
            var array = ['1'];
            lz.every(array, callback);
            expect(callback).toHaveBeenCalledWith('1', 0, array);
        });
        it('should not affect elements added to the array after it has begun', function() {
            var arr = [1,2,3],
                i = 0;
            lz.every(arr, function(a) {
                i++;
                arr.push(a+3);
                return i <= 3;
            });
            expect(arr).toEqual([1,2,3,4,5,6]);
            expect(i).toBe(3);
        });
        it('should set the right context when given none', function() {
            var context;
            lz.every([1], function() {context = this;});
            expect(context).toBe(function() {return this}.call());
        });
        
        it('should return true if the array is empty', function() {
            actual = lz.every([], function() { return true; });
            expect(actual).toBeTruthy();
            
            actual = lz.every([], function() { return false; });
            expect(actual).toBeTruthy();
        });
        it('should return true if it runs to the end', function() {
            actual = lz.every([1,2,3], function() { return true; });
            expect(actual).toBeTruthy();
        });
        it('should return false if it is stopped before the end', function() {
            actual = lz.every([1,2,3], function() { return false; });
            expect(actual).toBeFalsy();
        });
        
        it('should return after 3 elements', function() {
            lz.every(testSubject, function(obj, index) {
                actual[index] = obj;
                numberOfRuns += 1;
                if(numberOfRuns == 3) {
                    return false;
                }
                return true;
            });
            expect(actual).toExactlyMatch(expected);
        });
        it('should stop after 3 elements using a context', function() {
            var o = { a: actual };
            lz.every(testSubject, function(obj, index) {
                this.a[index] = obj;
                numberOfRuns += 1;
                if(numberOfRuns == 3) {
                    return false;
                }
                return true;
            }, o);
            expect(actual).toExactlyMatch(expected);
        });
    
        it('should stop after 3 elements in an array-like object', function() {
            var ts = createArrayLikeFromArray(testSubject);
            lz.every(ts, function(obj, index) {
                actual[index] = obj;
                numberOfRuns += 1;
                if(numberOfRuns == 3) {
                    return false;
                }
                return true;
            });
            expect(actual).toExactlyMatch(expected);
        });
        it('should stop after 3 elements in an array-like object using a context', function() {
            var ts = createArrayLikeFromArray(testSubject);
            var o = { a: actual };
            lz.every(ts, function(obj, index) {
                this.a[index] = obj;
                numberOfRuns += 1;
                if(numberOfRuns == 3) {
                    return false;
                }
                return true;
            }, o);
            expect(actual).toExactlyMatch(expected);
        });
    });
    
    describe('lz.indexOf', function() {
        "use strict";
        var actual, expected, testSubject;
        
        beforeEach(function() {
            testSubject = [2, 3, undefined, true, 'hej', null, 2, false, 0];
            delete testSubject[1];
    
        });
    
        it('should find the element', function() {
            expected = 4;
            actual = lz.indexOf(testSubject, 'hej');
            expect(actual).toEqual(expected);
        });
        it('should not find the element', function() {
            expected = -1;
            actual = lz.indexOf(testSubject, 'mus');
            expect(actual).toEqual(expected);
        });
        it('should find undefined as well', function() {
            expected = -1;
            actual = lz.indexOf(testSubject, undefined);
            expect(actual).not.toEqual(expected);
        });
        it('should skip unset indexes', function() {
            expected = 2;
            actual = lz.indexOf(testSubject, undefined);
            expect(actual).toEqual(expected);
        });
        it('should use a strict test', function() {
            actual = lz.indexOf(testSubject, null);
            expect(actual).toEqual(5);
            
            actual = lz.indexOf(testSubject, '2');
            expect(actual).toEqual(-1);
        });
        it('should skip the first if fromIndex is set', function() {
            expect(lz.indexOf(testSubject, 2, 2)).toEqual(6);
            expect(lz.indexOf(testSubject, 2, 0)).toEqual(0);
            expect(lz.indexOf(testSubject, 2, 6)).toEqual(6);
        });
        it('should work with negative fromIndex', function() {
            expect(lz.indexOf(testSubject, 2, -3)).toEqual(6);
            expect(lz.indexOf(testSubject, 2, -9)).toEqual(0);
        });
        it('should work with fromIndex being greater than the length', function() {
            expect(lz.indexOf(testSubject, 0, 20)).toEqual(-1);
        });
        it('should work with fromIndex being negative and greater than the length', function() {
            expect(lz.indexOf(testSubject, 'hej', -20)).toEqual(4);
        });
        
        describe('Array-like', function ArrayLike() {
            var testAL;
            beforeEach(function beforeEach() {
                testAL = {};
                testSubject = [2, 3, undefined, true, 'hej', null, 2, false, 0];
                lz.each(testSubject, function (o,i) {
                    testAL[i] = o;
                });
                testAL.length = testSubject.length;
            });
            it('should find the element (array-like)', function() {
                expected = 4;
                actual = lz.indexOf(testAL, 'hej');
                expect(actual).toEqual(expected);
            });
            it('should not find the element (array-like)', function() {
                expected = -1;
                actual = lz.indexOf(testAL, 'mus');
                expect(actual).toEqual(expected);
            });
            it('should find undefined as well (array-like)', function() {
                expected = -1;
                actual = lz.indexOf(testAL, undefined);
                expect(actual).not.toEqual(expected);
            });
            it('should skip unset indexes (array-like)', function() {
                expected = 2;
                actual = lz.indexOf(testAL, undefined);
                expect(actual).toEqual(expected);
            });
            it('should use a strict test (array-like)', function() {
                actual = lz.indexOf(testAL, null);
                expect(actual).toEqual(5);
                
                actual = lz.indexOf(testAL, '2');
                expect(actual).toEqual(-1);
            });
            it('should skip the first if fromIndex is set (array-like)', function() {
                expect(lz.indexOf(testAL, 2, 2)).toEqual(6);
                expect(lz.indexOf(testAL, 2, 0)).toEqual(0);
                expect(lz.indexOf(testAL, 2, 6)).toEqual(6);
            });
            it('should work with negative fromIndex (array-like)', function() {
                expect(lz.indexOf(testAL, 2, -3)).toEqual(6);
                expect(lz.indexOf(testAL, 2, -9)).toEqual(0);
            });
            it('should work with fromIndex being greater than the length (array-like)', function() {
                expect(lz.indexOf(testAL, 0, 20)).toEqual(-1);
            });
            it('should work with fromIndex being negative and greater than the length (array-like)', function() {
                expect(lz.indexOf(testAL, 'hej', -20)).toEqual(4);
            });
        });
    });
    
    describe('lz.lastIndexOf', function() {
        "use strict";
        var actual, expected, testSubject, testAL;
        
        beforeEach(function() {
            testSubject = [2, 3, undefined, true, 'hej', null, 2, 3, false, 0];
            delete testSubject[1];
            delete testSubject[7];
        });
        describe('Array', function() {
            it('should find the element', function() {
                expected = 4;
                actual = lz.lastIndexOf(testSubject, 'hej');
                expect(actual).toEqual(expected);
            });
            it('should not find the element', function() {
                expected = -1;
                actual = lz.lastIndexOf(testSubject, 'mus');
                expect(actual).toEqual(expected);
            });
            it('should find undefined as well', function() {
                expected = -1;
                actual = lz.lastIndexOf(testSubject, undefined);
                expect(actual).not.toEqual(expected);
            });
            it('should skip unset indexes', function() {
                expected = 2;
                actual = lz.lastIndexOf(testSubject, undefined);
                expect(actual).toEqual(expected);
            });
            it('should use a strict test', function() {
                actual = lz.lastIndexOf(testSubject, null);
                expect(actual).toEqual(5);
                
                actual = lz.lastIndexOf(testSubject, '2');
                expect(actual).toEqual(-1);
            });
            it('should skip the first if fromIndex is set', function() {
                expect(lz.lastIndexOf(testSubject, 2, 2)).toEqual(0);
                expect(lz.lastIndexOf(testSubject, 2, 0)).toEqual(0);
                expect(lz.lastIndexOf(testSubject, 2, 6)).toEqual(6);
            });
            it('should work with negative fromIndex', function() {
                expect(lz.lastIndexOf(testSubject, 2, -3)).toEqual(6);
                expect(lz.lastIndexOf(testSubject, 2, -9)).toEqual(0);
            });
            it('should work with fromIndex being greater than the length', function() {
                expect(lz.lastIndexOf(testSubject, 2, 20)).toEqual(6);
            });
            it('should work with fromIndex being negative and greater than the length', function() {
                expect(lz.lastIndexOf(testSubject, 2, -20)).toEqual(-1);
            });
        });
    
        describe('Array like', function() {
            var testAL;
            beforeEach(function() {
                testAL = {};
                lz.each(testSubject, function (o,i) {
                    testAL[i] = o;
                });
                testAL.length = testSubject.length;
            });
            it('should find the element (array-like)', function() {
                expected = 4;
                actual = lz.lastIndexOf(testAL, 'hej');
                expect(actual).toEqual(expected);
            });
            it('should not find the element (array-like)', function() {
                expected = -1;
                actual = lz.lastIndexOf(testAL, 'mus');
                expect(actual).toEqual(expected);
            });
            it('should find undefined as well (array-like)', function() {
                expected = -1;
                actual = lz.lastIndexOf(testAL, undefined);
                expect(actual).not.toEqual(expected);
            });
            it('should skip unset indexes (array-like)', function() {
                expected = 2;
                actual = lz.lastIndexOf(testAL, undefined);
                expect(actual).toEqual(expected);
            });
            it('should use a strict test (array-like)', function() {
                actual = lz.lastIndexOf(testAL, null);
                expect(actual).toEqual(5);
                
                actual = lz.lastIndexOf(testAL, '2');
                expect(actual).toEqual(-1);
            });
            it('should skip the first if fromIndex is set', function() {
                expect(lz.lastIndexOf(testAL, 2, 2)).toEqual(0);
                expect(lz.lastIndexOf(testAL, 2, 0)).toEqual(0);
                expect(lz.lastIndexOf(testAL, 2, 6)).toEqual(6);
            });
            it('should work with negative fromIndex', function() {
                expect(lz.lastIndexOf(testAL, 2, -3)).toEqual(6);
                expect(lz.lastIndexOf(testAL, 2, -9)).toEqual(0);
            });
            it('should work with fromIndex being greater than the length', function() {
                expect(lz.lastIndexOf(testAL, 2, 20)).toEqual(6);
            });
            it('should work with fromIndex being negative and greater than the length', function() {
                expect(lz.lastIndexOf(testAL, 2, -20)).toEqual(-1);
            });
        });
    });
    
    describe('lz.filter', function() {
        var filteredArray,
            callback = function callback(o, i, arr) {
                return (
                    i != 3 && i != 5
                );
            };
        
        beforeEach(function() {
            testSubject = [2, 3, undefined, true, 'hej', 3, null, false, 0];
            delete testSubject[1];
            filteredArray = [2, undefined, 'hej', null, false, 0];
        });
        describe('Array object', function() {

            it('should call the callback with the proper arguments', function() {
                var callback = jasmine.createSpy('callback'),
                    arr = ['1'];
                lz.filter(arr, callback);
                expect(callback).toHaveBeenCalledWith('1', 0, arr);
            });
            it('should not affect elements added to the array after it has begun', function() {
                var arr = [1,2,3],
                    i = 0;
                lz.filter(arr, function(a) {
                    i++;
                    if(i <= 4) {
                        arr.push(a+3);
                    }
                    return true;
                });
                expect(arr).toEqual([1,2,3,4,5,6]);
                expect(i).toBe(3);
            });
            it('should skip non-set values', function() {
                var passedValues = {};
                testSubject = [1,2,3,4];
                delete testSubject[1];
                lz.filter(testSubject, function(o, i) {
                    passedValues[i] = o;
                    return true;
                });
                expect(passedValues).toExactlyMatch(testSubject);
            });
            it('should pass the right context to the filter', function() {
                var passedValues = {};
                testSubject = [1,2,3,4];
                delete testSubject[1];
                lz.filter(testSubject, function(o, i) {
                    this[i] = o;
                    return true;
                }, passedValues);
                expect(passedValues).toExactlyMatch(testSubject);
            });
            it('should set the right context when given none', function() {
                var context;
                lz.filter([1], function() {context = this;});
                expect(context).toBe(function() {return this}.call());
            });
            it('should remove only the values for which the callback returns false', function() {
                var result = lz.filter(testSubject, callback);
                expect(result).toExactlyMatch(filteredArray);
            });
            it('should leave the original array untouched', function() {
                var copy = testSubject.slice();
                lz.filter(testSubject, callback);
                expect(testSubject).toExactlyMatch(copy);
            });
            it('should not be affected by same-index mutation', function () {
                var results = lz.filter([1, 2, 3], function (value, index, array) {
                    array[index] = 'a';
                    return true;
                });
                expect(results).toEqual([1, 2, 3]);
            });
        });
        describe('Array like', function() {
            beforeEach(function() {
                testSubject = createArrayLikeFromArray(testSubject);
            });
            it('should call the callback with the proper arguments', function() {
                var callback = jasmine.createSpy('callback'),
                    arr = createArrayLikeFromArray(['1']);
                lz.filter(arr, callback);
                expect(callback).toHaveBeenCalledWith('1', 0, arr);
            });
            it('should not affect elements added to the array after it has begun', function() {
                var arr = createArrayLikeFromArray([1,2,3]),
                    i = 0;
                lz.filter(arr, function(a) {
                    i++;
                    if(i <= 4) {
                        arr[i+2] = a+3;
                    }
                    return true;
                });
                delete arr.length;
                expect(arr).toExactlyMatch([1,2,3,4,5,6]);
                expect(i).toBe(3);
            });
            it('should skip non-set values', function() {
                var passedValues = {};
                testSubject = createArrayLikeFromArray([1,2,3,4]);
                delete testSubject[1];
                lz.filter(testSubject, function(o, i) {
                    passedValues[i] = o;
                    return true;
                });
                delete testSubject.length;
                expect(passedValues).toExactlyMatch(testSubject);
            });
            it('should set the right context when given none', function() {
                var context;
                lz.filter(createArrayLikeFromArray([1]), function() {context = this;}, undefined);
                expect(context).toBe(function() {return this}.call());
            });
            it('should pass the right context to the filter', function() {
                var passedValues = {};
                testSubject = createArrayLikeFromArray([1,2,3,4]);
                delete testSubject[1];
                lz.filter(testSubject, function(o, i) {
                    this[i] = o;
                    return true;
                }, passedValues);
                delete testSubject.length;
                expect(passedValues).toExactlyMatch(testSubject);
            });
            it('should remove only the values for which the callback returns false', function() {
                var result = lz.filter(testSubject, callback);
                expect(result).toExactlyMatch(filteredArray);
            });
            it('should leave the original array untouched', function() {
                var copy = createArrayLikeFromArray(testSubject);
                lz.filter(testSubject, callback);
                expect(testSubject).toExactlyMatch(copy);
            });
        });
    });
    
    describe('lz.map', function() {
        var callback;
        beforeEach(function() {
            var i = 0;
            callback = function() {
                return i++;
            };
        });
        describe('Array object', function() {
            it('should call callback with the right parameters', function() {
                var callback = jasmine.createSpy('callback'),
                    array = [1];
                lz.map(array, callback);
                expect(callback).toHaveBeenCalledWith(1, 0, array);
            });
            it('should set the context correctly', function() {
                var context = {};
                lz.map(testSubject, function(o,i) {
                    this[i] = o;
                }, context);
                expect(context).toExactlyMatch(testSubject);
            });
            it('should set the right context when given none', function() {
                var context;
                lz.map([1], function() {context = this;});
                expect(context).toBe(function() {return this}.call());
            });
            it('should not change the array it is called on', function() {
                var copy = testSubject.slice();
                lz.map(testSubject, callback);
                expect(testSubject).toExactlyMatch(copy);
            });
            it('should only run for the number of objects in the array when it started', function() {
                var arr = [1,2,3],
                    i = 0;
                lz.map(arr, function(o) {
                    arr.push(o+3);
                    i++;
                    return o;
                });
                expect(arr).toExactlyMatch([1,2,3,4,5,6]);
                expect(i).toBe(3);
            });
            it('should properly translate the values as according to the callback', function() {
                var result = lz.map(testSubject, callback),
                    expected = [0,0,1,2,3,4,5,6];
                delete expected[1];
                expect(result).toExactlyMatch(expected);
            });
            it('should skip non-existing values', function() {
                var array = [1,2,3,4],
                    i = 0;
                delete array[2];
                lz.map(array, function() {
                    i++;
                });
                expect(i).toBe(3);
            });
        });
        describe('Array-like', function() {
            beforeEach(function() {
                testSubject = createArrayLikeFromArray(testSubject);
            });
            it('should call callback with the right parameters', function() {
                var callback = jasmine.createSpy('callback'),
                    array = createArrayLikeFromArray([1]);
                lz.map(array, callback);
                expect(callback).toHaveBeenCalledWith(1, 0, array);
            });
            it('should set the context correctly', function() {
                var context = {};
                lz.map(testSubject, function(o,i) {
                    this[i] = o;
                }, context);
                delete testSubject.length;
                expect(context).toExactlyMatch(testSubject);
            });
            it('should set the right context when given none', function() {
                var context;
                lz.map(createArrayLikeFromArray([1]), function() {context = this;});
                expect(context).toBe(function() {return this}.call());
            });
            it('should not change the array it is called on', function() {
                var copy = createArrayLikeFromArray(testSubject);
                lz.map(testSubject, callback);
                expect(testSubject).toExactlyMatch(copy);
            });
            it('should only run for the number of objects in the array when it started', function() {
                var arr = createArrayLikeFromArray([1,2,3]),
                    i = 0;
                lz.map(arr, function(o) {
                    Array.prototype.push.call(arr, o+3);
                    i++;
                    return o;
                });
                delete arr.length;
                expect(arr).toExactlyMatch([1,2,3,4,5,6]);
                expect(i).toBe(3);
            });
            it('should properly translate the values as according to the callback', function() {
                var result = lz.map(testSubject, callback),
                    expected = [0,0,1,2,3,4,5,6];
                delete expected[1];
                expect(result).toExactlyMatch(expected);
            });
            it('should skip non-existing values', function() {
                var array = createArrayLikeFromArray([1,2,3,4]),
                    i = 0;
                delete array[2];
                lz.map(array, function() {
                    i++;
                });
                expect(i).toBe(3);
            });
        });
    });
    
    describe('lz.reduce', function() {
        beforeEach(function() {
            testSubject = [1,2,3];
        });
        
        describe('Array', function() {
            it('should pass the correct arguments to the callback', function() {
                var spy = jasmine.createSpy().andReturn(0);
                lz.reduce(testSubject, spy);
                expect(spy.calls[0].args).toExactlyMatch([1, 2, 1, testSubject]);
            });
            it('should start with the right initialValue', function() {
                var spy = jasmine.createSpy().andReturn(0);
                lz.reduce(testSubject, spy, 0);
                expect(spy.calls[0].args).toExactlyMatch([0, 1, 0, testSubject]);
            });
            it('should not affect elements added to the array after it has begun', function() {
                var arr = [1,2,3],
                    i = 0;
                lz.reduce(arr, function(a, b) {
                    i++;
                    if(i <= 4) {
                        arr.push(a+3);
                    };
                    return b;
                });
                expect(arr).toEqual([1,2,3,4,5]);
                expect(i).toBe(2);
            });
            it('should work as expected for empty arrays', function() {
                var spy = jasmine.createSpy();
                expect(function() {
                    lz.reduce([], spy);
                }).toThrow();
                expect(spy).not.toHaveBeenCalled();
            });
            it('should throw correctly if no callback is given', function() {
                expect(function() {
                    lz.reduce(testSubject);
                }).toThrow();
            });
            it('should return the expected result', function() {
                expect(lz.reduce(testSubject, function(a,b) {
                    return (a||'').toString()+(b||'').toString();
                })).toEqual(testSubject.join(''));
            });
            it('should not directly affect the passed array', function() {
                var copy = testSubject.slice();
                lz.reduce(testSubject, function(a,b) {
                    return a+b;
                });
                expect(testSubject).toEqual(copy);
            });
            it('should skip non-set values', function() {
                delete testSubject[1];
                var visited = {};
                lz.reduce(testSubject, function(a,b) {
                    if(a)
                        visited[a] = true;
                    if(b)
                        visited[b] = true;
                    return 0;
                });
                
                expect(visited).toEqual({ '1': true, '3': true });
            });
        });
        describe('Array-like objects', function() {
            beforeEach(function() {
                testSubject = createArrayLikeFromArray(testSubject);
            });
            it('should pass the correct arguments to the callback', function() {
                var spy = jasmine.createSpy().andReturn(0);
                lz.reduce(testSubject, spy);
                expect(spy.calls[0].args).toExactlyMatch([1, 2, 1, testSubject]);
            });
            it('should start with the right initialValue', function() {
                var spy = jasmine.createSpy().andReturn(0);
                lz.reduce(testSubject, spy, 0);
                expect(spy.calls[0].args).toExactlyMatch([0, 1, 0, testSubject]);
            });
            it('should not affect elements added to the array after it has begun', function() {
                var arr = createArrayLikeFromArray([1,2,3]),
                    i = 0;
                lz.reduce(arr, function(a, b) {
                    i++;
                    if(i <= 4) {
                        arr[i+2] = a+3;
                    };
                    return b;
                });
                expect(arr).toEqual({
                    0: 1,
                    1: 2,
                    2: 3,
                    3: 4,
                    4: 5,
                    length: 3
                });
                expect(i).toBe(2);
            });
            it('should work as expected for empty arrays', function() {
                var spy = jasmine.createSpy();
                expect(function() {
                    lz.reduce({length: 0}, spy);
                }).toThrow();
                expect(spy).not.toHaveBeenCalled();
            });
            it('should throw correctly if no callback is given', function() {
                expect(function() {
                    lz.reduce(testSubject);
                }).toThrow();
            });
            it('should return the expected result', function() {
                expect(lz.reduce(testSubject, function(a,b) {
                    return (a||'').toString()+(b||'').toString();
                })).toEqual('123');
            });
            it('should not directly affect the passed array', function() {
                var copy = createArrayLikeFromArray(testSubject);
                lz.reduce(testSubject, function(a,b) {
                    return a+b;
                });
                delete(testSubject.reduce);
                expect(testSubject).toEqual(copy);
            });
            it('should skip non-set values', function() {
                delete testSubject[1];
                var visited = {};
                lz.reduce(testSubject, function(a,b) {
                    if(a)
                        visited[a] = true;
                    if(b)
                        visited[b] = true;
                    return 0;
                });
                
                expect(visited).toEqual({ '1': true, '3': true });
            });
        });
    });
    
    describe('lz.reduceRight', function() {
        beforeEach(function() {
            testSubject = [1,2,3];
        });
        
        describe('Array', function() {
            it('should pass the correct arguments to the callback', function() {
                var spy = jasmine.createSpy().andReturn(0);
                lz.reduceRight(testSubject, spy);
                expect(spy.calls[0].args).toExactlyMatch([3, 2, 1, testSubject]);
            });
            it('should start with the right initialValue', function() {
                var spy = jasmine.createSpy().andReturn(0);
                lz.reduceRight(testSubject, spy, 0);
                expect(spy.calls[0].args).toExactlyMatch([0, 3, 2, testSubject]);
            });
            it('should not affect elements added to the array after it has begun', function() {
                var arr = [1,2,3],
                    i = 0;
                lz.reduceRight(arr, function(a, b) {
                    i++;
                    if(i <= 4) {
                        arr.push(a+3);
                    };
                    return b;
                });
                expect(arr).toEqual([1,2,3,6,5]);
                expect(i).toBe(2);
            });
            it('should work as expected for empty arrays', function() {
                var spy = jasmine.createSpy();
                expect(function() {
                    lz.reduceRight([], spy);
                }).toThrow();
                expect(spy).not.toHaveBeenCalled();
            });
            it('should throw correctly if no callback is given', function() {
                expect(function() {
                    lz.reduceRight(testSubject);
                }).toThrow();
            });
            it('should return the expected result', function() {
                expect(lz.reduceRight(testSubject, function(a,b) {
                    return (a||'').toString()+(b||'').toString();
                })).toEqual('321');
            });
            it('should not directly affect the passed array', function() {
                var copy = testSubject.slice();
                lz.reduceRight(testSubject, function(a,b) {
                    return a+b;
                });
                expect(testSubject).toEqual(copy);
            });
            it('should skip non-set values', function() {
                delete testSubject[1];
                var visited = {};
                lz.reduceRight(testSubject, function(a,b) {
                    if(a)
                        visited[a] = true;
                    if(b)
                        visited[b] = true;
                    return 0;
                });
                
                expect(visited).toEqual({ '1': true, '3': true });
            });
        });
        describe('Array-like objects', function() {
            beforeEach(function() {
                testSubject = createArrayLikeFromArray(testSubject);
            });
            it('should pass the correct arguments to the callback', function() {
                var spy = jasmine.createSpy().andReturn(0);
                lz.reduceRight(testSubject, spy);
                expect(spy.calls[0].args).toExactlyMatch([3, 2, 1, testSubject]);
            });
            it('should start with the right initialValue', function() {
                var spy = jasmine.createSpy().andReturn(0);
                lz.reduceRight(testSubject, spy, 0);
                expect(spy.calls[0].args).toExactlyMatch([0, 3, 2, testSubject]);
            });
            it('should not affect elements added to the array after it has begun', function() {
                var arr = createArrayLikeFromArray([1,2,3]),
                    i = 0;
                lz.reduceRight(arr, function(a, b) {
                    i++;
                    if(i <= 4) {
                        arr[i+2] = a+3;
                    };
                    return b;
                });
                expect(arr).toEqual({
                    0: 1,
                    1: 2,
                    2: 3,
                    3: 6,
                    4: 5,
                    length: 3 // does not get updated on property assignment
                });
                expect(i).toBe(2);
            });
            it('should work as expected for empty arrays', function() {
                var spy = jasmine.createSpy();
                expect(function() {
                    lz.reduceRight({length:0}, spy);
                }).toThrow();
                expect(spy).not.toHaveBeenCalled();
            });
            it('should throw correctly if no callback is given', function() {
                expect(function() {
                    lz.reduceRight(testSubject);
                }).toThrow();
            });
            it('should return the expected result', function() {
                expect(lz.reduceRight(testSubject, function(a,b) {
                    return (a||'').toString()+(b||'').toString();
                })).toEqual('321');
            });
            it('should not directly affect the passed array', function() {
                var copy = createArrayLikeFromArray(testSubject);
                lz.reduceRight(testSubject, function(a,b) {
                    return a+b;
                });
                delete(testSubject.reduceRight);
                expect(testSubject).toEqual(copy);
            });
            it('should skip non-set values', function() {
                delete testSubject[1];
                var visited = {};
                lz.reduceRight(testSubject, function(a,b) {
                    if(a)
                        visited[a] = true;
                    if(b)
                        visited[b] = true;
                    return 0;
                });
                
                expect(visited).toEqual({ '1': true, '3': true });
            });
        });
    });
    
    describe('lz.uniq should return the unique values of array', function () {
        it("returns ['null', null, 'NaN', NaN, '1', 1]", function () {
            expect(lz.uniq(['null', 'null', null, 'NaN', NaN, NaN, '1', 1, 1, 1, '1'])).toExactlyMatch(['null', null, 'NaN', NaN, '1', 1]);
        });
        
        it('handles object references', function () {
            var obj = {}, 
                obj1 = {};
            expect(lz.uniq([obj, obj1, obj, obj1, obj, obj1]).length).toBe(2);        
        });
        
        it('calls the transformation function and use its returned value', function () {
            var obj = {foo : 1}, 
                obj1 = {foo : 2};
            expect(lz.uniq([obj, obj1, obj, obj1, obj, obj1], function (obj) {
                return obj.foo;
            })).toEqual([1, 2]);             
        });            
    });
    
    describe('lz.repeat', function () {
        it('repeats the content of the array N times', function () {
            expect(lz.repeat([0], 5)).toEqual([0, 0, 0, 0, 0]);
            expect(lz.repeat([0, 1, 2], 2)).toEqual([0, 1, 2, 0, 1, 2]);
        }); 
        
        it('returns empty array if times is 0', function () {
            expect(lz.repeat([1, 2, 3], 0).length).toBe(0);
        });
        
        it('does not mutate the original array', function () {
            var arr = [1, 2, 3];
            lz.repeat(arr, 5);
            expect(arr.length).toBe(3);
        });           
    }); 
    
    describe('lz.contains', function () {
        it('returns true if NaN value appears in array', function () {
            expect(lz.contains([1, NaN, 1], NaN)).toBe(true);
        });   
        
        it('returns true if -0 value appears in array', function () {
            expect(lz.contains([1, -0, 1], -0)).toBe(true);
        }); 
        
        it('returns false if -0 value does not appear in array', function () {
            expect(lz.contains([1, 0, 1], -0)).toBe(false);
        });
        
        it('returns true if object reference appear in array', function () {
            var obj = {};
            expect(lz.contains([null, null, 1, 2, obj, 1, 2], obj)).toBe(true);
        });                 
    });   
});
