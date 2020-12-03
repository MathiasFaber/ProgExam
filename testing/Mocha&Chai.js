var expect = require('chai').expect;
var potens = require('../pow')
 
describe('potens()', function(){
    it('Burde lave potens', function(){
        var x = 3;
        var n = 3;
       // var p;
/*
        // If statement, som gør at resultatet bliver rigtigt, selvom potensen er negativ
        if (n < 0){
            n == -n
        }else{
            n == p
        };
       */
        var sum1 = potens(x,n);
        var sum2 = Math.pow(x,n);


        expect(sum2).to.be.equal(sum1);

        console.log(potens(x,n));

    });

    it('Burde kaste en fejl', function(){
        var x = "streng1";
        var n = "streng2";

        var result1 = 'Indtast to tal!'
        var result2 = potens(x,n);


        expect(result1).to.be.equal(result2);

        console.log(potens(x,n))
    });
});
