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
var Order = mongoose.model('Orders');

// Here, we are testing to make sure that the Order controller functions that we made are working properly.

describe('TESTING ORDERS API', function () {

    // Before running a test, clear the database.
    beforeEach(function (done) {
        Order.deleteMany({}, function (err) {
            done();
        })
    });

    describe('Testing .get', function () {
        it('should return OK status', function (done) {
            chai.request(app)
                .get('/orders')
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
        it('should not add an order without ingredients', function (done) {
            var order = {
                student_email: 'rafaelvchaves@gmail.com',
                which_lunch: 1,
                is_completed: false
            };
            chai.request(app)
                .post('/orders')
                .send(order)
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
        it('should add an order', function (done) {
            var order = {
                student_email: 'rafaelvchaves@gmail.com',
                ingredients: [{
                    ingredient_type_id: '5c7614cc34b37ea27789161b',
                    name: 'ham',
                    is_available: true
                }],
                which_lunch: 1
            };
            chai.request(app)
                .post('/orders')
                .send(order)
                .end(function (err, res) {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('order_date');
                    res.body.should.have.property('student_email');
                    res.body.should.have.property('ingredients');
                    res.body.should.have.property('which_lunch');
                    res.body.should.have.property('is_completed');
                    res.body.should.have.property('which_lunch').eql(1);
                    done();
                });

        });
    });

    describe('Testing .get with query', function () {
        it('should find order given query', function (done) {
            var order1 = new Order({
                student_email: 'rafavchaves@gmail.com',
                ingredients: [{
                    ingredient_type_id: '5c7614cc34b37ea27789161b',
                    name: 'ham',
                    is_available: true
                }],
                which_lunch: 1
            });
            order1.save();
            var order2 = new Order({
                student_email: 'rafaelvchaves@gmail.com',
                ingredients: [{
                    ingredient_type_id: '5c7614cc34b37ea27789161b',
                    name: 'ham',
                    is_available: true
                }],
                which_lunch: 1
            });
            order2.save();
            chai.request(app)
                .get('/orders').query({student_email: 'rafaelvchaves@gmail.com'})
                .end(function (err, res) {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('array').with.length(1);
                    done();
                });


        });
    });

    describe('Testing .put', function () {
        it('should update an order given the id', function (done) {
            var order = new Order({
                student_email: 'rafavchaves@gmail.com',
                ingredients: [{
                    ingredient_type_id: '5c7614cc34b37ea27789161b',
                    name: 'ham',
                    is_available: true
                }],
                which_lunch: 1
            });
            var updated_order = {
                student_email: 'rafavchaves@gmail.com',
                ingredients: [{
                    ingredient_type_id: '5c7614cc34b37ea27789161b',
                    name: 'ham',
                    is_available: true
                }],
                which_lunch: 3
            };
            order.save(function (err, order) {
                chai.request(app)
                    .put('/orders/' + order._id)
                    .send(updated_order)
                    .end(function (err, res) {
                        console.log(order);
                        console.log(res.body);
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('which_lunch').eql(3);
                        res.body.should.have.property('_id').eql(order._id.toString());
                        done();
                    });
            });
        });
    });

    describe('Testing .delete', function () {
        it('should delete an order given the id', function (done) {
            var order = new Order({
                student_email: 'rafavchaves@gmail.com',
                ingredients: [{
                    ingredient_type_id: '5c7614cc34b37ea27789161b',
                    name: 'ham',
                    is_available: true
                }],
                which_lunch: 1
            });
            order.save(function (err, order) {
                chai.request(app)
                    .delete('/orders/' + order._id)
                    .end(function (err, res) {
                        console.log(res.body);
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Order successfully deleted!');
                        done();
                    });
            })
        });
    });


});