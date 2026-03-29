import express from "express";
const router = express.Router();

const users = [];

router.get('/', (req, res) => {
    res.send('Response from router');
})
// http://localhost:4000/router/signup

// /signup, until http://localhost:4000/router we've matched previously
router.post('/signup', (req, res) => {
    const userdata = req.body;
    // imitate db save;
    users.push(userdata);
    res.send({ message: `${userdata.username} signed up successfully!!!`, data: users });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const userData = users.find(u => u.username === username);
    if (!userData) {
        res.status(404);
        res.send("User account not found!!!")
    } else if (userData.password !== password) {
        res.status(401);
        res.send("Incorrect Password!!!")
    } else if (userData.password === password) {
        res.status(200);
        const { password: dbStoredPwd, ...sanitizedUser } = userData
        res.send({ message: "Loggedin successfully", data: sanitizedUser })
    }
});

router.get('/login', (req, res) => {
    res.send('login via GET Method')
});

// wildcard route

router.all('/*splat', (req, res)=>{
    res.status(404);
    res.send('Invalid route')
})


export default router