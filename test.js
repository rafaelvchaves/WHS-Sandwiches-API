var IngredientType = mongoose.model('IngredientTypes');

var ingredient_type = new IngredientType({
    name: 'sauce',
    limit: 2
});
ingredient_type.save();