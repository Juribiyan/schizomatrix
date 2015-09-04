# Schizomatrix
##### *Original kranus test*

    npm install kranus-test

## Usage
The module returns a function that takes a date in form of `string`, instance of `Date` or plain object with `day`, `month` and `year` properties.

    var test = require('kranus-test');
    test('1990-10-05') 
    // => {error: false, color: 'yellow', matrix: [0,3,1,0,0,3,1,1,0,2]}
    
    // we could also call test(new Date('1990-10-05')) or test({day: 5, month: 10, year: 1990})
    // matrix[1] holds the number of "1"-s in matrix; matrix[0] is a dummy value for convinience
`error` is `true` when given date makes no sense.

## Credits
Original concept by Kranus.