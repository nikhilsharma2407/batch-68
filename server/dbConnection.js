import mongoose from "mongoose";
const URL = process.env.DB_URL;
mongoose.connect(URL).then(data => console.log('Connected to DB Successfully')).catch(e => console.log(e))
