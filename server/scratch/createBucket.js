import { S3Client, CreateBucketCommand, PutPublicAccessBlockCommand, PutBucketPolicyCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const bucketName = 'jbc-india-images-' + Math.random().toString(36).substring(2, 8);

async function createS3Bucket() {
  try {
    console.log(`Creating bucket: ${bucketName}...`);
    await s3Client.send(new CreateBucketCommand({
      Bucket: bucketName,
      CreateBucketConfiguration: {
        LocationConstraint: process.env.AWS_REGION || 'ap-south-1'
      }
    }));
    console.log("Bucket created successfully.");

    console.log("Removing public access blocks...");
    await s3Client.send(new PutPublicAccessBlockCommand({
      Bucket: bucketName,
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: false,
        IgnorePublicAcls: false,
        BlockPublicPolicy: false,
        RestrictPublicBuckets: false
      }
    }));
    console.log("Public access blocks removed.");

    console.log("Applying public read bucket policy...");
    const policy = {
      Version: "2012-10-17",
      Statement: [
        {
          Sid: "PublicReadGetObject",
          Effect: "Allow",
          Principal: "*",
          Action: "s3:GetObject",
          Resource: `arn:aws:s3:::${bucketName}/*`
        }
      ]
    };

    await s3Client.send(new PutBucketPolicyCommand({
      Bucket: bucketName,
      Policy: JSON.stringify(policy)
    }));
    console.log("Bucket policy applied.");

    console.log(`\nSUCCESS! Bucket Name: ${bucketName}`);
  } catch (error) {
    console.error("Error creating bucket:", error);
  }
}

createS3Bucket();
