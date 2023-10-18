const fs = require('fs')
const axios = require('axios')

function cat(filePath) {

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data)
    })
}

function webCat(url) {
    axios.get(url)
    .then((response) => {
        if(response.status === 200) {
        const data = response.data;
        console.log(data)
    }
    }, (err) => console.log(err) );
}


const arg1 = process.argv[2]
const arg2 = process.argv[3]

if (arg1) {
    if (arg1 == '-local') {
        cat(arg2)
    }
    else if (arg1 == '-web') {
        webCat(arg2)
    }
    else {
        console.log('ERROR: Please use -local or -web flags to read from local file or remote site.')
    }
}
