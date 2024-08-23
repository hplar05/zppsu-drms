import { createUploadthing } from "uploadthing/next";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);

     },
     
),
  PdfDocsOrImageUploader: f({ pdf: { maxFileCount: 1 } }).onUploadComplete(
  async ({ metadata, file }) => {
    console.log("file url", file.url);

   },
   
),
} 