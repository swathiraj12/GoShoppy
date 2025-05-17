const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const runProduct = require('./view/productView');
const runUser = require('./view/userView')

app.use(express.json());
app.use(cors());
app.use(runProduct);
app.use(runUser);

//Image storage
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

//Creating upload endpoint for images
app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    res.json({
        success: 1,
        image_url: imageUrl
    })
})

mongoose.connect("mongodb+srv://swathijcvl:Ibornon12th@cluster0.eutqbuo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log(`Database Connected PORT ${port}`);
        app.listen(port);
    })