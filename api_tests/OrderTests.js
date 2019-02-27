var assert = require('assert');
var expect = require('chai').expect;
// var request = require('supertest');
var app = require('../server');
var chaiHttp = require('chai-http');
var chai = require('chai');
var should = chai.should();
var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var Order = mongoose.model('Orders');

chai.use(chaiHttp);

describe('TESTING ORDERS API', function () {

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
        it('should not add an order without a date', function (done) {
            var order = {
                student_email: 'rafaelvchaves@gmail.com',
                is_favorite: false,
                // ingredients: [
                //     {
                //     ingredient_type_id: '5c7614cc34b37ea27789161b',
                //     name: 'ham',
                //     is_available: true
                // }],
                which_lunch: 1,
                is_cancelled: false
            };
            chai.request(app)
                .post('/orders')
                .send(order)
                .end(function (err, res) {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('date');
                    res.body.errors.should.have.property('ingredients');
                    res.body.errors.date.should.have.property('kind').eql('required');
                    done();
                });

        });
    });

    describe('Testing .post (positive)', function () {
        it('should add an order', function (done) {
            var order = {
                date: '2001-08-16T12:13:44.555Z',
                student_email: 'rafaelvchaves@gmail.com',
                // is_favorite: false,
                ingredients: [{
                    ingredient_type_id: '5c7614cc34b37ea27789161b',
                    name: 'ham',
                    is_available: true
                }],
                which_lunch: 1
                // is_cancelled: false
            };
            chai.request(app)
                .post('/orders')
                .send(order)
                .end(function (err, res) {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('date');
                    res.body.should.have.property('student_email');
                    res.body.should.have.property('is_favorite');
                    res.body.should.have.property('ingredients');
                    res.body.should.have.property('which_lunch');
                    res.body.should.have.property('is_cancelled');
                    res.body.should.have.property('which_lunch').eql(1);
                    done();
                });

        });
    });

    describe('Testing .get (specific id)', function () {
        it('should get an order by the given id', function (done) {
            var order = new Order({
                date: '2001-08-16T12:13:44.555Z',
                student_email: 'rafaelvchaves@gmail.com',
                // is_favorite: false,
                ingredients: [{
                    ingredient_type_id: '5c7614cc34b37ea27789161b',
                    name: 'ham',
                    is_available: true
                }],
                which_lunch: 1
            });
            order.save(function (err, order) {
                chai.request(app)
                    .get('/orders/' + order._id)
                    .end(function (err, res) {
                        console.log(res.body);
                        should.not.exist(err);
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name');
                        res.body.should.have.property('limit');
                        res.body.should.have.property('_id').eql(ingredient_type._id.toString());
                        done();
                    });
            });

        });
    });

    // describe('Testing .put', function () {
    //     it('should update an order given the id', function (done) {
    //         var order = new Order({
    //             date: '2001-08-16T12:13:44.555Z',
    //             student_email: 'rafaelvchaves@gmail.com',
    //             ingredients: [{
    //                 ingredient_type_id: '5c7614cc34b37ea27789161b',
    //                 name: 'ham',
    //                 is_available: true
    //             }],
    //             which_lunch: 1
    //         });
    //         var updated_order = {
    //             date: '2001-08-16T12:13:44.555Z',
    //             student_email: 'rafaelvchaves@gmail.com',
    //             ingredients: [{
    //                 ingredient_type_id: '5c7614cc34b37ea27789161b',
    //                 name: 'ham',
    //                 is_available: true
    //             }],
    //             which_lunch: 3
    //         };
    //         order.save(function (err, ingredient_type) {
    //             chai.request(app)
    //                 .put('/order/' + order._id)
    //                 .send(updated_order)
    //                 .end(function (err, res) {
    //                     console.log(res.body);
    //                     res.should.have.status(200);
    //                     res.body.should.be.a('object');
    //                     // res.body.should.have.property('name');
    //                     res.body.should.have.property('which_lunch').eql(3);
    //                     res.body.should.have.property('_id').eql(order._id.toString());
    //                     done();
    //                 });
    //         });
    //     });
    // });






});