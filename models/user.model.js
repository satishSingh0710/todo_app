import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
     name: {
         type: String, 
         required: true, 
     },
     email: {
        type: String, 
        unique: true,
        required: true,  
     }, 
     password: {
        type: String, 
        select: false, 
        required: true, 
     }, 
     createdAt: {
        type: Date, 
        default: Date.now(), 
     }
});

const User = mongoose.model('User', userSchema);
export { User };