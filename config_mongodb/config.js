"use strict";

const mongoose = require('mongoose');
const username = "LeHuuDan99";
const password = "3lyIxDXEzwCtzw2i";
const database = "FoodOrder";
const URL = `mongodb+srv://${username}:${password}@clustervegas.ym3zd.mongodb.net/${database}?retryWrites=true&w=majority`;
const DB_OPTIONS = {
useNewUrlParser: true,
useUnifiedTopology: true,
};

const connection = mongoose.createConnection(URL,DB_OPTIONS);

const connectToiletDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    const connect = await mongoose.connect(
      URL,
      DB_OPTIONS
    )
    console.log(`Connected to mongoDB FoodOrder DB`);
    return connect;
  } catch (error) {
    console.log('Cannot connect FoodOrder DB')
    process.exit(1)
  }
}

module.exports = {
  connectToiletDB:connectToiletDB,
}
