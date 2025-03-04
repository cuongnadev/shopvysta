import { google } from 'googleapis';
import * as path from 'path';
import env from 'dotenv';
env.config();

const SCOPES = ['https://www.googleapis.com/auth/content'];

const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../../service-account.json'),
    scopes: SCOPES
});

export const merchantId = process.env.MERCHANT_ID;

if(!merchantId) {
    throw new Error('MERCHANT_ID is not defined in.env file');
};

export const contentApi = google.content({
    version: 'v2.1',
    auth
});
