const router = require('express').Router();
const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

router.route('/hello').post((req,res) => {
    console.log(req.body.name);
    res.json(req.body.name);
})


router.post("/upload", (req, res) => {

    upload(req, res, err => {
        if (err) {
            console.log(err)
            return res.json({ success: false, err })
        }
        console.log(res.req.file)
        return res.json({ success: true, image: res.req.file.filename, fileName: res.req.file.filename })
    })

});


module.exports = router;