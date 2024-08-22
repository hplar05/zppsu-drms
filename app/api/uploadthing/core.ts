import { createUploadthing } from "uploadthing/next";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);

     },
     
),
  PdfDocsOrImageUploader: f(["image", "pdf"]).onUploadComplete(
  async ({ metadata, file }) => {
    console.log("file url", file.url);

   },
   
),
} 