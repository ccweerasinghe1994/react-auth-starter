import { MongoClient } from 'mongodb';
const uri = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(uri);
// let client;
const dbName = 'myProject';
export const initializeDbConnection = async () => {
    await client.connect();
    console.log('Connected successfully to server');
}

export const getDbConnection = dbName => {
    const db = client.db(dbName);
    return db;
}