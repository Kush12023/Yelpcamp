const Campground = require('../models/campground');
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

async function seedImg() {
    try {
      const resp = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: '****YOUR CLIENT ID GOES HERE****',
          collections: 1114848,
        },
      })
      return resp.data.urls.small
    } catch (err) {
      console.error(err)
    }
  }

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price= Math.floor(Math.random() *30)+10;
        const camp = new Campground({
            author: '64ea6a01e1e8690b527528b8',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://source.unsplash.com/random/300x300?camping,${i}',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia rerum minima eligendi incidunt quisquam quibusdam laudantium. Necessitatibus voluptate debitis facere voluptas molestias, molestiae quia vitae, mollitia, ex quod illum possimus?',
            price,images:[
              
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})