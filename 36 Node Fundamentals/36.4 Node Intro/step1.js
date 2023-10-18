const fs = require('fs')

function cat(filePath) {

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data)
    })
}

cat('one.txt')