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
var Ingredient = mongoose.model('Ingredients');

chai.use(chaiHttp);

describe('TESTING INGREDIENTS API', function () {
    beforeEach(function (done) {
        Ingredient.deleteMany({}, function (err) {
            done();
        })
    });

    describe('Testing .get', function () {
        it('should return OK status', function (done) {
            chai.request(app)
                .get('/ingredients')
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
        it('should not add an ingredient without an is_available boolean', function (done) {
            var ingredient = {
                name: 'ciabatta' //not adding is_available won't produce and error, but not adding an ingredient_type_id will.
            };
            chai.request(app)
                .post('/ingredients')
                .send(ingredient)
                .end(function (err, res) {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.not.have.property('is_available'); //the is_available boolean won't show up as an error in this case because it has a default setting.
                    res.body.errors.should.have.property('ingredient_type_id');
                    res.body.errors.ingredient_type_id.should.have.property('kind').eql('required');
                    done();
                });

        });
    });

    describe('Testing .post (positive)', function () {
        it('should add an ingredient', function (done) {
            var ingredient = {
                ingredient_type_id: '5c7613fc3e1a71a26cf51003', //can't just put anything in here, needs to be a real ID.
                name: 'ciabatta',
                is_available: false //this doesn't need to be added unless we are setting it to be false
            };
            chai.request(app)
                .post('/ingredients')
                .send(ingredient)
                .end(function (err, res) {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('is_available');
                    res.body.should.have.property('name').eql('ciabatta');
                    done();
                });

        });
    });

    describe('Testing .get (specific id)', function () {
        it('should get an ingredient by the given id', function (done) {
            var ingredient = new Ingredient({
                ingredient_type_id: '5c7614cc34b37ea27789161b',
                name: 'ham',
                is_available: false
            });
            ingredient.save(function (err, ingredient) {
                chai.request(app)
                    .get('/ingredients/' + ingredient._id)
                    .end(function (err, res) {
                        console.log(res.body);
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name');
                        res.body.should.have.property('ingredient_type_id');
                        res.body.should.have.property('is_available');
                        res.body.should.have.property('_id').eql(ingredient._id.toString());
                        done();
                    });
            });

        });
    });

    describe('Testing .put', function () {
        it('should update an ingredient given the id', function (done) {
            var ingredient = new Ingredient({
                ingredient_type_id: '5c7614cc34b37ea27789161b',
                name: 'ham',
                is_available: false
            });
            var updated_ingredient = {
                ingredient_type_id: '5c7614cc34b37ea27789161b',
                name: 'ham',
                is_available: true
            };
            ingredient.save(function (err, ingredient) {
                chai.request(app)
                    .put('/ingredients/' + ingredient._id)
                    .send(updated_ingredient)
                    .end(function (err, res) {
                        console.log(res.body);
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('is_available').eql(true);
                        res.body.should.have.property('_id').eql(ingredient._id.toString());
                        res.body.should.have.property('name').eql(ingredient.name);
                        done();
                    });
            });
        });
    });

    describe('Testing .delete', function () {
        it('should delete an ingredient given the id', function (done) {
            var ingredient = new Ingredient({
                ingredient_type_id: '5c7614cc34b37ea27789161b',
                name: 'ham',
                is_available: false
            });
            ingredient.save(function (err, ingredient) {
                chai.request(app)
                    .delete('/ingredients/' + ingredient._id)
                    .end(function (err, res) {
                        console.log(res.body.result);
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Ingredient successfully deleted!');
                        // res.body.result.should.have.property('ok').eql(1);
                        // res.body.result.should.have.property('n').eql(1);
                        done();
                    });
            })
        });
    });

});