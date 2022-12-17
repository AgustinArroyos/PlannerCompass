import app from './app.js'
import serverless from 'serverless-http';
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server in ${PORT}`)
})

export const handler = serverless(app);
