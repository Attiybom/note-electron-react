const os = require('os')
const path = require('path')

const desktopDir = path.join(os.homedir(), 'Desktop')
console.log('Desktop directory:', desktopDir)
