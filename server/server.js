import express from "express";
import 'dotenv/config'
import "./dbConnection.js"
import router from "./router.js";
import userRouter from "./routers/userRouter.js";
import { errorHandler } from "./errorHandler.js";
import cartRouter from "./routers/cartRouter.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import stripeRouter from "./routers/stripeRouter.js";
import authController from "./controllers/authController.js";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// this middleware applies to all requests
// allows our server to parse the req.body
app.use(express.json());
// allows our server to parse the req.cookies
app.use(cookieParser())

// this middleware only applies to requests with path as /router

// http://localhost:4000/router
app.use('/router', router)
app.use('/user', userRouter)
app.use('/cart', cartRouter)
app.use('/stripe', authController, stripeRouter)

app.use(express.static(path.join(__dirname, "public")));

// regex for accept everything
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.use(errorHandler)
// app.use('/cart', cartRouter)
// app.use('/admin', adminRouter)

// http://localhost:4000/check-server
// app.get("/check-server", (req, res) => {
//   res.send({ message: "Restarting server using nodemon" });
// });

// app.post('/signup', (req,res)=>{});
// // login
// app.post('/login/:id', (req, res) => {
//   console.log("🚀 ~ req.body:", req.body)
//   console.log("🚀 ~ req.query:", req.query)
//   console.log("🚀 ~ req.params:", req.params)
//   console.log("🚀 ~ req.path:", req.path)
//   console.log("🚀 ~  req.url:", req.url)

//   res.status(500)
//   res.send({ message: "Login successful!!!" });
// })
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.clear();
  console.log(`server running on port ${PORT}!!!`);
});