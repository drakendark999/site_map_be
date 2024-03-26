require("dotenv").config();

const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const { Readable } = require("stream");

const CLIENT_ID = process.env.CLIENT_ID 
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN =process.env.REFRESH_TOKEN

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

var that = (module.exports = {
  setFilePublic: async (fileId) => {
    try {
      await drive.permissions.create({
        fileId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });

      const getUrl = await drive.files.get({
        fileId,
        fields: "webViewLink, webContentLink",
      });

      return getUrl;
    } catch (error) {
      console.error(error);
    }
  },
  uploadFile: async (fileShare) => {
    try {
      const readableStream = Readable.from([fileShare.buffer]);
      const createFile = await drive.files.create({
        requestBody: {
          name: fileShare.originalname,
          mimeType: "image/jpg",
          parents: ["1QWknTCI42-RhEOgZSFPCgWYvsT9cg_mh"],
        },
        media: {
          mimeType: "image/jpg",
          body: readableStream,
        },
      });
      const fileId = createFile.data.id;
      console.log(createFile.data);
      const getUrl = await that.setFilePublic(fileId);

      console.log("test", getUrl.data);
      const urlId = getUrl.data.webContentLink.split('id=')[1].split('&')[0]

      console.log('urlId', urlId);
      return urlId ;
    } catch (error) {
      console.error(error);
    }
  },
  deleteFile: async (fileId) => {
    try {
      console.log("Delete File:::", fileId);
      const deleteFile = await drive.files.delete({
        fileId: fileId,
      });
      console.log(deleteFile.data, deleteFile.status);
    } catch (error) {
      console.error(error);
    }
  },
});
