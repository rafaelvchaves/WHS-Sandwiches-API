var assert = require('assert');
var expect = require('chai').expect;
var app = require('../server');
var chaiHttp = require('chai-http');
var chai = require('chai');
var should = chai.should();
var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
chai.use(chaiHttp);
var FavoriteOrder = mongoose.model('FavoriteOrders');

// Here, we are testing to make sure that the Order controller functions that we made are working properly.

describe('TESTING FAVORITE ORDERS API', function () {

    // Before running a test, clear the database.
    beforeEach(function (done) {
        FavoriteOrder.deleteMany({}, function () {
            done();
        })
    });

    describe('Testing .get', function () {
        it('should return OK status', function (done) {
            chai.request(app)
                .get('/favorite_orders')
                .end(function (err, res) {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });

        });
    });

    describe('Testing .post (negative)', function () {
        it('should not add a favorite order without ingredients', function (done) {
            var favorite_order = {
                student_email: 'rafaelvchaves@gmail.com',
                favorite_name: 'MyFavoriteOrder'
            };
            chai.request(app)
                .post('/favorite_orders')
                .send(favorite_order)
                .end(function (err, res) {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('ingredients');
                    done();
                });

        });
    });

    describe('Testing .post (positive)', function () {
        it('should add a favorite order', function (done) {
            var favorite_order = {
                student_email: 'rafaelvchaves@gmail.com',
                ingredients: [{
                    ingredient_type_id: '5c7614cc34b37ea27789161b',
                    name: 'ham',
                    is_available: true
                }],
                favorite_name: 'MyFavoriteOrder'

            };
            chai.request(app)
                .post('/favorite_orders')
                .send(favorite_order)
                .end(function (err, res) {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('student_email');
                    res.body.should.have.property('ingredients');
                    res.body.should.have.property('favorite_name');
                    res.body.should.have.property('favorite_name').eql('MyFavoriteOrder');
                    done();
                });

        });
    });

    describe('Testing .get with query', function () {
        it('should find favorite order given query', function (done) {
            var favoriteOrder1 = new FavoriteOrder({
                student_email: 'rafavchaves@gmail.com',
                ingredients: [{
                    ingredient_type_id: '5c7614cc34b37ea27789161b',
                    name: 'ham',
                    is_available: true
                }],
                favorite_name: 'MyFavoriteOrder'
            });
            favoriteOrder1.save();
            var favoriteOrder2 = new FavoriteOrder({
                student_email: 'rafavchaves@gmail.com',
                ingredients: [{
                    ingredient_type_id: '5c7614cc34b37ea27789161b',
                    name: 'ham',
                    is_available: true
                }],
                favorite_name: 'MyNewFavoriteOrder'
            });
            favoriteOrder2.save();
            chai.request(app)
                .get('/favorite_orders').query({favorite_name: 'MyNewFavoriteOrder'})
                .end(function (err, res) {
                    console.log(res.body);
                    console.log(favoriteOrder2.favorite_name);
                    res.should.have.status(200);
                    res.body.should.be.a('array').with.length(1);
                    done();
                });


        });
    });

    describe('Testing .delete', function () {
        it('should delete a favorite order given the id', function (done) {
            var favorite_order = new FavoriteOrder({
                student_email: 'rafavchaves@gmail.com',
                ingredients: [{
                    ingredient_type_id: '5c7614cc34b37ea27789161b',
                    name: 'ham',
                    is_available: true
                }],
                favorite_name: 'MyUnwantedFavoriteOrder'
            });
            favorite_order.save(function (err, order) {
                chai.request(app)
                    .delete('/favorite_orders/' + favorite_order._id)
                    .end(function (err, res) {
                        console.log(res.body);
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Favorite Order successfully deleted!');
                        done();
                    });
            })
        });
    });
});