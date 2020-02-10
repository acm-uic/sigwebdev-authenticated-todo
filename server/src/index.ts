require('dotenv').config() // * Load env variables
import app from '@server'; // * Import app

// * Start the application
const port = Number(process.env.port || 3002);
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});
