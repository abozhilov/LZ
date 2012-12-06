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
        it('removes spaces from the start of the string', function () {
            expect(lz.trim('        str')).toBe('str');    
        });
        
        it('removes spaces from the end of the string', function () {
            expect(lz.trim('str        ')).toBe('str');     
        });
        
        it('removes spaces from the start and the end', function () {
            expect(lz.trim('        str        ')).toBe('str');    
        });        
    });
});

