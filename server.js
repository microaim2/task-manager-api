require('dotenv').config()
console.log('JWT_SECRET exists?', !!process.env.JWT_SECRET);
const app = require('./src/app')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})