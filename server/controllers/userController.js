const users = [];

export const login = (req, res) => {
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
};

export const signup = (req, res) => {
    const userdata = req.body;
    // imitate db save;
    users.push(userdata);
    res.send({ message: `${userdata.username} signed up successfully!!!`, data: users });
};