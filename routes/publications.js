const express = require("express");
const router = express.Router();
const Publication = require("../models/publications");
const Tag = require("../models/tags");
const bodyParser = require("body-parser");
const tagColorGenerator = require('random-color');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));


//Get all publications
router.get('/', async (req, res) => {

    let data = [];
    let tags = [];
    await Tag.find({}, (err, tagsData) => {
        if (err) {
            console.log(err);
        }
        else{
            tagsData.map(tag => {
                tags.push(tag);
            })
        }
    });

    const queryAllPublications = async () => {
        //Where User is you mongoose user model
        await Publication.find({}, (err, publications) => {
            if (err) {
                console.log(err);
            } else {
                publications.map(publication => {
                    data.push(publication);
                });
                res.render('publications', {
                    data: data,
                    page: "publications",
                    tags: tags,
                    user: req.user
                });
            }
        });
    };
    await queryAllPublications();
});

//Get specific publication data
router.get('/get/:id', async (req, res) => {
    console.log("called");
    console.log(req.params.id);
    //Where User is you mongoose user model
    await Publication.findOne({
        _id: req.params.id
    }, (err, publication) => {
        if (err) {
            console.log(err);
        } else {
            console.log(publication);
            res.json(publication);
        }
    });
});

// number: Number,
// title: String,
// description: String,
// authors: String,
// link: String


// Creates a new tag
router.post('/newtag', async (req, res) => {
    console.log("Adding new tag");
    let tagColor = tagColorGenerator();
    const tag = new Tag({
        tag: {name: req.body.name, color: tagColor.hexString() }
    })
    tag.save()
        .then((doc) => {
            console.log(doc);
            res.send('success');
        })
        .catch(err => res.json({
            error: err
        }));
})


router.post('/add', async (req, res) => {
    console.log("POSTED");
    //Create tag color array
    let tags = req.body.tags;
    let colorArray = [];
    for (let i = 0; i < tags.length; i++){
        switch (tags[i]) {
            case 'GPCR':
                colorArray[i] = 'badge-1'
                break;
    
            case 'Ion transporter':
                colorArray[i] = 'badge-2'
                break;
    
            case 'Cysteine protease':
                colorArray[i] = 'badge-3'
                break;
    
            case 'Kinase':
                colorArray[i] = 'badge-4'
                break;
    
            case 'Chitosan':
                colorArray[i] = 'badge-5'
                break;

            case 'Covalent inhibitor':
                colorArray[i] = 'badge-6'
                break;
    
            case 'Reversible inhibitor':
                colorArray[i] = 'badge-7'
                break;

            case 'Opioid':
                colorArray[i] = 'badge-8'
                break;
    
            case 'Kinetics':
                colorArray[i] = 'badge-9'
                break;

            case 'Binding free energy':
                colorArray[i] = 'badge-10'
                break;
    
            case 'pKa calculation':
                colorArray[i] = 'badge-11'
                break;

            case 'CpHMD development':
                colorArray[i] = 'badge-12'
                break;
                
            case 'Aspartyl protease':
                colorArray[i] = 'badge-13'
                break;
        }
    }
    console.log(colorArray);

    const publication = new Publication({
        number: req.body.number,
        title: req.body.title,
        description: req.body.description,
        authors: req.body.authors,
        date: req.body.date,
        imagePath: req.body.imagePath,
        imageDescription: req.body.imageDescription,
        dlink: req.body.dlink,
        plink: req.body.plink,
        doi: req.body.doi,
        pmcid: req.body.pmcid,
        tags: req.body.tags,
        tagsColor: colorArray
    });
    console.log(publication);
    publication.save()
        .then(data => res.send('success'))
        .catch(err => res.json({
            message: err
        }));
});


router.put('/update/:id', async (req, res) => {
    console.log("PUT");
    console.log(req.params.id);
    //Publication tags
    let pubTags = req.body.tags;
    //Publication tag colors
    let colorArray = [];
    // Predefined tags
    let tagArray = []
    Tag.find({}).exec()
        .then((data) => {
            console.log(data);
            tagArray = data;
            console.log(tagArray);
            console.log(pubTags);
            for (let i = 0; i < pubTags.length; i++){
                let tag = tagArray.find( ({tag}) => tag.name === pubTags[i]);
                console.log(tag);
                if (tag){
                    colorArray.push(tag.tag.color);
                    console.log("PUSHED");
                }
            }
            update();
        });
    const update = () => {
        let newData = {
            number: req.body.number,
            title: req.body.title,
            description: req.body.description,
            authors: req.body.authors,
            date: req.body.date,
            imagePath: req.body.imagePath,
            imageDescription: req.body.imageDescription,
            dlink: req.body.dlink,
            plink: req.body.plink,
            doi: req.body.doi,
            pmcid: req.body.pmcid,
            tags: req.body.tags,
            tagsColor: colorArray
        };
        Publication.findOneAndUpdate({
            _id: req.params.id
        }, newData, {
            upsert: true,
            new: true,
            useFindAndModify: false
        }).exec().then((err, doc) => {
            if (err) console.log(err);
            res.send('success');
        })
    }
    
});

router.delete('/delete/:id', async (req, res) => {
    console.log(req.params.id)
    await Publication.findOneAndDelete({
        _id: req.params.id
    }, (err, publication) => {
        if (err) console.log(err);
        res.send('success');
    });

});


module.exports = router;