const whiteList = ['www.kcozy.works', 'www.google.com']
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        }
        else {

            callback(new Error("NOT ALLOWED BY CORS"))
        }

    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions