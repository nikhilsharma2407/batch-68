import express from "express";
import router from "./router.js";
import userRouter from "./userRouter.js";
import { errorHandler } from "./errorHandler.js";


const app = express();

// this middleware applies to all requests
// allows our server to parse the req.body
app.use(express.json());

// this middleware only applies to requests with path as /router

// http://localhost:4000/router
app.use('/router', router)
app.use('/user', userRouter)

app.use((req,res, next)=>{
  console.log('another global handler before errorHandler')
  res.send('global middleware')
})
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

app.listen(4000, () => {
  console.clear();
  console.log("server running on port 4000!!!");
});