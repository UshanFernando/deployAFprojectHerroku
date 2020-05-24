const express = require('express');
const StoreProducts = require('../../schema/StoreManagerProducts');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const Imagfilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false);
    }
};

const ImageUpload = multer({
    storage: storage,
    limits: { fileSize: 4194304 },
    fileFilter: Imagfilter
});

router.get('/products', (req, res, next) => {
    StoreProducts.find().exec().
        then(singleitem => {
            console.log(singleitem);
            res.status(200).json(singleitem);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });




});

router.post('/products', ImageUpload.single('productImage'), (req, res, next) => {
    console.log(req.file.path.replace("\\", "/"));
    const product = new StoreProducts({
        _id: mongoose.Types.ObjectId(),
        productname: req.body.productname,
        category: req.body.category,
        price: req.body.price,
        discount: req.body.discount,
        description: req.body.description,
        productImage: req.file.path.replace("\\", "/")

    });

    product.save()
        .then(single => {
            console.log(single);
            res.status(201).json(single);

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });

        });

});



router.get('/products/:productId', (req, res, next) => {
    const id = req.params.productId;
    StoreProducts.findById(id).exec()
        .then(oneitem => {
            console.log(oneitem);
            if (oneitem) {
                res.status(200).json(oneitem);
            } else {
                res.status(404).json({ warning: 'No any data to retriew' });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });

        });

});





router.get('/products/category/:categoryname', (req, res, next) => {
    const catgname = req.params.categoryname;
    StoreProducts.find({ category: catgname }).exec()
        .then(oneitem => {
            console.log(oneitem);
            if (oneitem) {
                res.status(200).json(oneitem);
            } else {
                res.status(404).json({ warning: 'No any category found to retriew' });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });

        });

});















router.patch('/products/:pidd', ImageUpload.single('productImage'), async (req, res, next) => {
    const producid = req.params.pidd;
    if (req.file) {
        var obj = await StoreProducts.findById(producid).exec()
            .then(oneitem => oneitem)
        console.log("file found");
        StoreProducts.update({ _id: producid }, {
            $set: {
                productname: req.body.productname,
                category: req.body.category,
                price: req.body.price,
                discount: req.body.discount,
                description: req.body.description,
                productImage: req.file.path.replace("\\", "/")
            }
        }).exec().then(singleitem => {
            if (obj.productImage) {
                fs.unlink("./" + obj.productImage, function (err) {
                    if (err) return console.log(err);
                    console.log('file deleted successfully');
                });
            }
            res.status(200).json(singleitem);
        })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });

    }
    else {
        console.log("file  cannot found");
        StoreProducts.update({ _id: producid }, {
            $set: {
                productname: req.body.productname,
                category: req.body.category,
                price: req.body.price,
                discount: req.body.discount,
                description: req.body.description
            }
        }).exec().then(singleitem => {
            res.status(200).json(singleitem);
        })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });

    }

    // console.log(req.file)

});



router.delete('/products/:pidd', async (req, res, next) => {
    const id = req.params.pidd;


    console.log('delete endpoint');
    var obj = await StoreProducts.findById(id).exec()
        .then(oneitem => oneitem)
    console.log(obj);

    StoreProducts.remove({ _id: id }).exec()
        .then(singleitem => {
            console.log('item deleted: ' + singleitem.productImage);
            if (obj.productImage) {
                fs.unlink("./" + obj.productImage, function (err) {
                    if (err) return console.log(err);
                    console.log('file deleted successfully');
                });
            }
            res.status(200).json(singleitem);

        })
        .catch(err => {
            res.status(500).json({
                error: err
            });

        });
});
module.exports = router;
