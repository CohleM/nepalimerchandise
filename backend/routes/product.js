const router = require('express').Router();
const multer = require('multer');
const { Product }  = require('../models/product')

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


router.post("/uploadImage", (req, res) => {

    upload(req, res, err => {
        if (err) {
            console.log(err)
            return res.json({ success: false, err })
        }
        
        return res.json({ success: true, image: res.req.file.filename, fileName: res.req.file.filename })
    })

});

router.route('/uploadProduct').post((req,res) => {
    const product = new Product(req.body)
    product.save((err) => {
        if(err) { 
            console.log(err)
            return res.status(400).json({success : false,err}) 
        }

        return res.status(200).json({success: true })
    })
})

router.route('/getProducts').post((req,res) => {

    let order = req.body.order ? req.body.order : "desc";
    let sortBy =  req.body.sortBy ? req.body.sortBy : "_id"
    let skip = parseInt(req.body.skip)
    let limit = req.body.limit ?  parseInt(req.body.limit) : 100
    let filters = req.body.filters
    let findArgs = {

    }
    
    for(let key in req.body.filters) {
        if(req.body.filters[key].length > 0) {
            //console.log(req.body.filters[key])
            if( key == "price") {
                findArgs[key] = {
                    $gte : req.body.filters[key][0],
                    $lte : req.body.filters[key][1]
                }
            }
            else {
                findArgs[key] = req.body.filters[key]
                console.log(findArgs)
            }

        }
    }
   // console.log(req.body.filters["continents"])
    console.log(findArgs)

    Product.find(findArgs)
        .skip(skip)
        .limit(limit)
        .exec((err,products) => {
            if(err) { 
               console.log(err) 
                return res.status(400).json({ success : false,err }) } 

            return res.status(200).json({success : true, products, postSize : products.length })
            
        })
})

module.exports = router;