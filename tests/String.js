describe('String', function () {
    describe('lz.indexOf should work as String.prototype.indexOf with strings', function () {
        it('returns -1 if there is no searching substring in the string', function () {
            expect(lz.indexOf('string', 'sub')).toBe(-1);    
        });
        
        it('returns the position of match in string', function () {
            expect(lz.indexOf('string', 'ing')).toBe(3);    
        });
        
        it('searches from position', function () {
            expect(
                lz.indexOf('lz js', 'lz', 1) == -1 && 
                lz.indexOf('lz js', 'js', 1) == 3
            ).toBe(true);
        });        
    });
    
    describe('lz.lastIndexOf should work as String.prototype.lastIndexOf with strings', function () {
        it('returns -1 if there is no searching substring in the string', function () {
            expect(lz.lastIndexOf('string', 'sub')).toBe(-1);    
        });
        
        it('returns the right most position of match in string', function () {
            expect(lz.lastIndexOf('js js', 'js')).toBe(3);    
        });
        
        it('searches from position', function () {
            expect(
                lz.lastIndexOf('lz js', 'js', 1) == -1 && 
                lz.lastIndexOf('lz js', 'lz', 0) == 0
            ).toBe(true);
        });               
    });
    
    describe('lz.contains should test whether the substring is contained by the string', function () {
        it('returns false if the substring is not contained', function () {
            expect(lz.contains('string', 'substring')).toBe(false);    
        });
        
        it('returns true if the substring appear in string', function () {
            expect(lz.contains('string', 'ing')).toBe(true);    
        });        
    });
    
    describe('lz.repeat should repeat the given string N times', function () {
        it('returns repeated string', function () {
            expect(typeof lz.repeat('a', 27)).toBe('string');
        });
        
        it('returns correctly repeated string', function () {
            expect(lz.repeat('a', 27).length).toBe(27);
        }); 
        
        it('returns empty string for 0 times', function () {
            expect(lz.repeat('a', 0)).toBe('');
        });               
    });
    
    describe('lz.trim should remove leading and trailing spaces', function () {
        var W_SPACES = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
        it('removes spaces from the start of the string', function () {
            expect(lz.trim(W_SPACES + 'str')).toBe('str');    
        });
        
        it('removes spaces from the end of the string', function () {
            expect(lz.trim('str' + W_SPACES)).toBe('str');     
        });
        
        it('removes spaces from the start and the end', function () {
            expect(lz.trim(W_SPACES + 'str' + W_SPACES)).toBe('str');    
        });        
    });
    
    describe('lz.fill should perform substitution of the placeholders in string', function () {
        it('substitute named placeholders with property names of argv object', function () {
            expect(lz.fill('${foo}-${bar}', {foo : 'hello', bar : 'world'})).toBe('hello-world');
        });
        
        it('substitute indexed placeholders with indexed properties of argv', function () {
            expect(lz.fill('${0}-${1}', ['hello', 'world'])).toBe('hello-world');
        }); 
        
        it('substitute indexed and named placeholders with indexed and named properties of argv', function () {
            expect(lz.fill('${0}-${bar}', {0 : 'hello', bar : 'world'})).toBe('hello-world');
        }); 
        
        it('substitute empty placeholders ${} with positional indexed property of argv', function () {
            expect(lz.fill('${}-${}', ['hello', 'world'])).toBe('hello-world');
        });
        
        it('substitute and tests for the rest of the string', function () {
            expect(lz.fill('${}-world', ['hello'])).toBe('hello-world');
        });                                 
    });
    
    describe('lz.camelize should camelize the dasherized e.g. CSS string', function () {
        it('camelizes the border-width-top to borderWidthTop', function () {
            expect(lz.camelize('border-width-top')).toBe('borderWidthTop');
        });
        
        it('camelizes the -moz-border-width-top to MozBorderWidthTop', function () {
            expect(lz.camelize('-moz-border-width-top')).toBe('MozBorderWidthTop');
        });        
    });
    
    describe('lz.capitalize should capitalize the first letter and lower case rest of the string', function () {
        it('capitalizes aRrAy to Array', function () {
            expect(lz.capitalize('aRrAy')).toBe('Array');
        });
        
        it('capitalizes ARRAY to Array', function () {
            expect(lz.capitalize('ARRAY')).toBe('Array');
        });        
    });
    
    describe('lz.underscore should underscore camelized string', function () {
        it('returns border_width_top for borderWidthTop', function () {
            expect(lz.underscore('borderWidthTop')).toBe('border_width_top');
        });
        
        it('returns _border_width_top for BorderWidthTop', function () {
            expect(lz.underscore('BorderWidthTop')).toBe('_border_width_top');
        });        
    });
    
    describe('lz.dasherize should convert underscores to dashes', function () {
        it('converts _moz_border_radius to -moz-border-radius', function () {
            expect(lz.dasherize('_moz_border_radius')).toBe('-moz-border-radius');
        });   
        
        it('doesnt alter the case of the chars', function () {
            expect(lz.dasherize('_Moz_Border_Radius')).toBe('-Moz-Border-Radius');
        });         
    });
    
    describe('lz.startsWith should test whether the string starts with given substring', function () {
        it('returns true if the string starts with substring', function () {
            expect(lz.startsWith('lz js', 'lz')).toBe(true);
        });
                
        it('returns false if the string does not start with substring', function () {
            expect(lz.startsWith('lz js', 'js')).toBe(false);
        });
        
        it('returns false if the string is shorter than substring', function () {
            expect(lz.startsWith('lz js', 'lz js lz js')).toBe(false);
        });        
    }); 
    
    describe('lz.endsWith should test whether the string ends with given substring', function () {
        it('returns true if the string ends with substring', function () {
            expect(lz.endsWith('lz js', 'js')).toBe(true);
        });
                
        it('returns false if the string does not end with substring', function () {
            expect(lz.endsWith('lz js', 'lz')).toBe(false);
        });
        
        it('returns false if the string is shorter than substring', function () {
            expect(lz.endsWith('lz js', 'lz js lz js')).toBe(false);
        });        
    });
    
    describe('lz.zpadd should padd numeric string with zeros to the given size', function () {
        it('padds 9 to 0009', function () {
            expect(lz.zpadd('9', 4)).toBe('0009');
        });
        
        it('padds +9 to +009', function () {
            expect(lz.zpadd('+9', 4)).toBe('+009');
        });      
        
        it('padds -9 to -009', function () {
            expect(lz.zpadd('-9', 4)).toBe('-009');
        });
        
        it('does not padd 1200', function () {
            expect(lz.zpadd('1200', 4)).toBe('1200');
        }); 
        
        it('does not padd with negative size', function () {
            expect(lz.zpadd('1', -4)).toBe('1');
        });                             
    });
    
    describe('lz.count should count the number of occurrences of substring in the string', function () {
        it('returns 6 for "abababababab" for "a" or "b" substring', function () {
            expect(lz.count('abababababab', 'a')).toBe(6);
            expect(lz.count('abababababab', 'b')).toBe(6);
        });
        
        it('returns 0 if the substring does not appear in string', function () {
            expect(lz.count('ababababab', 'c')).toBe(0);
        });
        
        it('returns 0 for empty substring', function () {
            expect(lz.count('ababababab', '')).toBe(0);
        });        
    });
    
    describe('lz.inscmp should perform case insensitive comparision of strings', function () {
        it('performs insensitive comparision', function () {
            expect(lz.inscmp('ABC', 'abc')).toBe(true);
            expect(lz.inscmp('ABC', 'abcc')).toBe(false);
            expect(lz.inscmp('abc', 'ABC')).toBe(true);
            expect(lz.inscmp('ABC', 'ABC')).toBe(true);                                    
        });
    });      
});

