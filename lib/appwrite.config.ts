import * as sdk from 'node-appwrite';

export const {
    APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, API_KEY, DATABASE_ID, COLLECTION_ID
} = process.env;

const client = new sdk.Client();

client
    .setEndpoint(APPWRITE_ENDPOINT!) // Your API Endpoint
    .setProject(APPWRITE_PROJECT_ID!) // Your project ID
    .setKey(API_KEY!); // Your secret API key

export const database = new sdk.Databases(client);