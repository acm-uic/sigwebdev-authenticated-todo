import { Router, Request, Response } from 'express'
import User, { IUser, ITodo } from '../models/Users'
import uuidv1 from 'uuid/v1'

// * initialize router
const router = Router()

// * Basic route
router.get('/', (req: Request, res: Response) => {
    res.send({ api: 'Hello World!' })
})

// * User Route
router.get('/user', async (req: Request, res: Response) => {
    // * If user exists in session object, send user. Otherwise send error message
    if (req.session && req.session.userid) {
        const user = await User.findOne({ _id: req.session.userid })
        res.send(user)
    } else res.status(400).send({ message: 'You are not logged in!' })
})

// * Login Route
router.post('/login', async (req: Request, res: Response) => {
    // TODO: Write Login Route
    const { username, password } = req.body

    // * Check if user exists
    let user = await User.findOne({ username })

    // * If user null, send 400 status with error message
    if (user === null) {
        res.status(400).send({ message: 'Incorrect username or password, try again.' })
        return
    }

    // * If password incorrect, send 400 status with error message
    // ! This app is not secure at all because we are storing plain text passwords,
    // ! this is for the sake of simplicity and learning, do not do this on your own apps
    if (user !== null && user.password !== password) {
        res.status(400).send({ message: 'Incorrect username or password, try again.' })
        return
    }

    // * Set session user
    if (req.session && user) req.session.userid = user._id

    // * Send logged in user object
    res.send({ username: user.username, todos: user.todos })
})

// * Logout Route
router.post('/logout', (req: Request, res: Response) => {
    // * Destroy session on server
    if (req.session) req.session.destroy(err => console.error)

    // * Send Success
    res.send('Success')
})

// * Registration Route
router.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body

    // * Check if user already exists
    let user = await User.findOne({
        username
    })

    // * If user not null, user already exists, send 400 status with error message
    if (user !== null) {
        res.status(400).send({
            message: 'A User with that username already exists!!'
        })
        return
    }

    // * Otherwise User does not exist, create and save new user
    user = new User({
        username,
        password,
        todos: []
    })

    // * Save user
    await user.save()

    // * Set session user
    if (req.session && user) req.session.userid = user._id

    // * Send new user object
    res.send({ username: user.username, todos: user.todos })
})

// * Add ToDo route
router.post('/addtodo', async (req: Request, res: Response) => {
    // * Add Todo
    const { title, description } = req.body
    if (req.session) {
        // * Add todo to users todo array
        const newTodo: ITodo = { title, description, completed: false, id: uuidv1() }
        await User.updateOne({ _id: req.session.userid }, { $push: { todos: newTodo } })

        // * Send confirmation
        res.send('OK')
    } else res.status(400).send({ message: 'You are not authenticated!' })
})

// * Delete ToDo route
router.post('/deletetodo', async (req: Request, res: Response) => {
    // * Grab ID from req.body
    const { id } = req.body

    // * If a session exists, delete the users todo with the provided id
    if (req.session) {
        // * Delete the user todo
        await User.updateOne(
            {
                _id: req.session.userid
            },
            {
                $pull: { todos: { id: id } }
            }
        )
    } else res.status(400).send({ message: 'You are not authenticated!' })

    // * Send confirmation
    res.send('OK')
})

// * Update Todo Route
router.post('/marktodo', async (req: Request, res: Response) => {
    // * Grab ID and value from body
    const { id, value } = req.body

    // * If session exists, attempt to update TODO value
    if (req.session) {
        // * Update ToDo in array with completed value
        await User.updateOne(
            {
                _id: req.session.userid,
                todos: {
                    $elemMatch: {
                        id: id // * Find Todos rthat match ID
                    }
                }
            },
            {
                // * Update todos that match id
                $set: { 'todos.$.completed': value }
            }
        )
    } else res.status(400).send({ message: 'You are not authenticated!' })

    // * Send confirmation
    res.send('OK')
})

// * export router
export default router
