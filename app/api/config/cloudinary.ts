import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.v2.config({
    cloud_name: "Raymond",
    api_key: "353476226674558",
    api_secret: "NG6wwx02rj4ka7g1VjbkRvAVfZ0",
})

export default cloudinary.v2;