import './loadEnvironment'
import app from './Server' // * Import app

// * Start the application
const port = Number(process.env.port || 3002)
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
