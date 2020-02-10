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
    // TODO: Write Logout Route
    if (req.session) req.session.destroy(err => console.error)
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
    // TODO: Write Add Todo Route
    const { title, description } = req.body
    if (req.session) {
        const newTodo: ITodo = { title, description, completed: false, id: uuidv1() }
        await User.updateOne({ _id: req.session.userid }, { $push: { todos: newTodo } })
        res.send('OK')
    } else res.status(400).send({ message: 'You are not authenticated!' })
})

// * Delete ToDo route
router.post('/deletetodo', async (req: Request, res: Response) => {
    // TODO: Write Delete Todo Route
    const { id } = req.body
    console.log(id)

    if (req.session) {
        await User.updateOne(
            {
                _id: req.session.userid
            },
            {
                $pull: { todos: { id: id } }
            }
        )
        res.send('OK')
    } else res.status(400).send({ message: 'You are not authenticated!' })
})

// * Update Todo Route
router.post('/marktodo', async (req: Request, res: Response) => {
    // TODO: Weite Mark Todo route
    const { id, value } = req.body
    console.log(id)

    if (req.session) {
        try {
            // * Update ToDo in array with completed value
            const res = await User.updateOne(
                {
                    _id: req.session.userid,
                    todos: {
                        $elemMatch: {
                            id: id
                        }
                    }
                },
                {
                    $set: { 'todos.$.completed': value }
                }
            )
            console.log(res)
        } catch (err) {
            console.log('ERR' + err)
        }
        res.send('OK')
    } else res.status(400).send({ message: 'You are not authenticated!' })
})

// * export router
export default router
