var keystone = require('keystone');
var Types = keystone.Field.Types;

var ServiceCharge = new keystone.List('ServiceCharge');

ServiceCharge.add({
    name: { type: Types.Name, required: true, index: true },
    
});