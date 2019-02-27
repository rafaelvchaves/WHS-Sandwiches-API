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
var IngredientType = mongoose.model('IngredientTypes');

chai.use(chaiHttp);

describe('TESTING INGREDIENT TYPES API', function () {
    beforeEach(function (done) {
        IngredientType.deleteMany({}, function (err) {
            done();
        })
    });


    describe('Testing .get', function () {
        it('should return OK status', function (done) {
            chai.request(app)
                .get('/ingredient_types')
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
        it('should not add an ingredient type without a limit', function (done) {
            var ingredient_type = {
                name: 'bread'
            };
            chai.request(app)
                .post('/ingredient_types')
                .send(ingredient_type)
                .end(function (err, res) {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('limit');
                    res.body.errors.limit.should.have.property('kind').eql('required');
                    done();
                });

        });
    });
    describe('Testing .post (positive)', function () {
        it('should add an ingredient type with a limit and name', function (done) {
            var ingredient_type = {
                name: 'bread',
                limit: 1
            };
            chai.request(app)
                .post('/ingredient_types')
                .send(ingredient_type)
                .end(function (err, res) {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('limit');
                    res.body.should.have.property('limit').eql(1);
                    // res.body.errors.limit.should.have.property('kind').eql('required');
                    done();
                });

        });
    });

    describe('Testing .get (specific id)', function () {
        it('should get an ingredient type by the given id', function (done) {
            var ingredient_type = new IngredientType({
                name: 'meat',
                limit: 3
            });
            ingredient_type.save(function (err, ingredient_type) {
                chai.request(app)
                    .get('/ingredient_types/' + ingredient_type._id)
                    .end(function (err, res) {
                        console.log(res.body);
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

    describe('Testing .put', function () {
        it('should update an ingredient type given the id', function (done) {
            var ingredient_type = new IngredientType({
                name: 'meat',
                limit: 3
            });
            var updated_ingredient_type = {
                name: 'meat',
                limit: 4
            };
            ingredient_type.save(function (err, ingredient_type) {
                chai.request(app)
                    .put('/ingredient_types/' + ingredient_type._id)
                    .send(updated_ingredient_type)
                    .end(function (err, res) {
                        console.log(res.body);
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        // res.body.should.have.property('name');
                        res.body.should.have.property('limit').eql(4);
                        res.body.should.have.property('_id').eql(ingredient_type._id.toString());
                        done();
                    });
            });
        });
    });

});



