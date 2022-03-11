const {Schema, model} = require('mongoose');


const MessageSchema = Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required : true,
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required : true,
    },
    message: {
        type: String,
        required: true,
    }
}, {timestamps: true});

// para que sólo devuelva lo necesario del model en lugar de todo el modelo
// como se está usando mongoDB, agrega el __v, _id y no queremos mostrar la password
// todo lo demás, se almacenará en un object (...object)
MessageSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject();
    return object;

});
// para exportar una clase modelo
module.exports = model('Message', MessageSchema);
