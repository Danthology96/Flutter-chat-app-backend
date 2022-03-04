const {Schema, model} = require('mongoose');


const UserSchema = Schema({
    username: {
        type: String,
        required : true,
    },
    email: {
        type: String,
        required : true,
        unique: true,
    },
    password: {
        type: String,
        required : true,
    },
    online: {
        type: Boolean,
        default: false
    }
});

// para que sólo devuelva lo necesario del model en lugar de todo el modelo
// como se está usando mongoDB, agrega el __v, _id y no queremos mostrar la password
// todo lo demás, se almacenará en un object (...object)
UserSchema.method('toJSON', function(){
    const {__v, _id, password, online, ...object } = this.toObject();
    object.uid = _id;
    return object;

});
// para exportar una clase modelo
module.exports = model('User', UserSchema);
