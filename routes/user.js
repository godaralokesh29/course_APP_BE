const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");


// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    
    users.create({
        username, 
        password
    })

    res.json({
        message: "User created successfully"
    })
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
     // Implement fetching all courses logic
     const response = await courses.find({});

     res.json({
         courses: response
     })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await users.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    })
    res.json({
        message: "Purchase complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const users = await users.findOne({
        username: req.headers.username
    });

    console.log(user.purchasedCourses);
    const courses = await courses.find({
        _id: {
            "$in": users.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router