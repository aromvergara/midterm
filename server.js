// server.js
console.log('May Node be with you')

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;


//const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:251107@cluster0.h3pj1.mongodb.net/midterm-blog?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
const collection = client.db("midterm-blog").collection("quotes");
console.log('Connected to Database')
 
const db = client.db('midterm-blog');
const quotesCollection = db.collection('quotes');

  // perform actions on the collection object
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(express.static('public'))

 
  app.listen(3000, function() {
      console.log('listening on 3000')
  })

  app.post('/quotes', (req,res) => {
    collection.insertOne(req.body)
    .then ( result => {
        console.log(result)
        res.redirect('/')
    })
    .catch (error => console.error(error))
})

    app.get('/', (req,res) => {
        db.collection('quotes').find().toArray()
            .then (results => {
                console.log(results)
                res.render('index.ejs', {quotes: results})
            })
            .catch(error => console.error(error))
    })

  
    app.set('view engine','ejs')

  
    app.put('/quotes', (req,res) => {
        collection.findOneAndUpdate(
            { name: 'Dan' },
            {
              $set: {
                name: req.body.name,
                quote: req.body.quote
              }
            },
            {
              upsert: true
            }
          )
          .then(result => {
            res.json('Success')
            //console.log(result)
           })
          .catch(error => console.error(error))        
    //console.log(req.body)
    })

    app.delete('/quotes', (req,res) => {
    quotesCollection.deleteOne({ name: req.body.name })
    .then(result => {
        if (result.deletedCount === 0){
            return res.json('No quote to delete')
        }
        res.json(`Delete Arom's quote`)
    })
    .catch(error => console.error(error))
})

});

//   app.get('/', (req,res) => {
//       res.sendFile(__dirname + '/index.html')
//   })
  
//   app.post('/quotes', (req,res) => {
//       console.log(req.body)
//       //console.log('Hellooooooooooooooooo!')
//   })

 // client.close();

//  MongoClient.connect('mongodb+srv://admin:251107@cluster0.h3pj1.mongodb.net/midterm-blog?retryWrites=true&w=majority', (err, client) => {
//     if (err) return console.error(err)
//     console.log('Connected to Database')
//   })

  

// MongoClient.connect('mongodb+srv://admin:251107@cluster0.h3pj1.mongodb.net/midterm-blog?retryWrites=true&w=majority', {useUnifiedTopology: true})
// .then (client => {


//     console.log('Connected to Database')
    
//     const db = client.db('midterm-blog')
//     app.use(bodyParser.urlencoded({extended: true}))
//     app.get('/', (req,res) => {
//         res.sendFile(__dirname + '/index.html')
//     })
    
//     app.post('/quotes', (req,res) => {
//         console.log(req.body)
//         //console.log('Hellooooooooooooooooo!')
//     })

//     app.listen(3000, function() {
//         console.log('listening on 3000')
//     })

// })
// .catch(console.error)

    
//     const quotesCollection = db.collection('quotes')
    
    // app.get('/', (req,res) => {
    //     res.send('Hello World')
    // })
    // app.get('/', (req,res) => {
    //     const cursor = db.collection('quotes').find()
    //     console.log(cursor)
    // })

// })
// .catch (console.error)





