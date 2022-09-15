const multer = require('multer');
const fs = require('fs');
const path = require('path');


// get the extension of the file (ex: png....)
const getFileType = (file) => {
    const mimeType = file.mimetype.split('/')
    console.log('type of file being uploaded:', mimeType)
    return mimeType[mimeType.length -1]
};

// generate a random file name to be saved and execute a callback function
const generateFileName = (req, file, callback) => {
    const extension = getFileType(file)
    const filename = Date.now()+'-'+ Math.round(Math.random()*1E9) +'.'+extension; //1E9 stands for 1 billion
    callback(null, file.fieldname+'-'+filename)
};

// check if file is an accepted format thanks to native .test regexp method
const fileFilter = (req, file, callback) => {
    const extension = getFileType(file);
    const allowedTypes = /png|jpg|jpeg|gif/
    const passed = allowedTypes.test(extension)
    if (passed) {
        return callback(null, true)
    }
    return callback(null, false)
}


exports.productFile = (
    (req, res, next) => {
    //manage the multer params
    const storage = multer.diskStorage({
        destination: function(req, file, callback){
            const dest = `data/productsImages/` 
            fs.access(dest, (error)=>{
                 // if doens't exist
                 if (error) {
                    return fs.mkdir(dest, (error) => {
                        cb(error, dest)
                    })
                } else {
                    return cb(null, dest)
                }
            })
        },  
        filename: generateFileName,
    })
    return multer({storage, fileFilter}).single('imageUrl')
    }
)();