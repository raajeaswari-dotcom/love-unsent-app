import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.djbdj9rax,
  api_key: process.env.184385174264263,
  api_secret: process.env.oyI1bf5kuc5V1rg4wPBYzgdh29Y
});

export default cloudinary;
