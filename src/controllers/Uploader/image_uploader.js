const multer  = require('multer');
const path = require('path');


function updateImageCustomName() {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'images/') 
        },
        filename: function (req, file, cb) {
          cb(null, imageName + path.extname(file.originalname))
        }
      })

      return storage;
}
function upload(storage) {
    const update = multer({storage : updateImageCustomName});

    return update.single('image');
}

module.exports = upload;