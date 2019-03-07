mongoose = require('mongoose')

var arr = [{name: 'Bread', limit: 1}, {name: 'Meat', limit: 3}, {name: 'Cheese', limit: 2}, {name: 'Toppings', limit: 5}, {name: 'Sauce', limit: 2}];




for (var i = 0; i < arr.length; i++) {
    arr[i].save(function (err) {
        if (err)
            return err;
        else
            console.log('Success')
    });
}



