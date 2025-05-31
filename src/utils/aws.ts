import AWS from "aws-sdk";

const spaceEndpoint = new AWS.Endpoint("ams3.digitaloceanspaces.com");

AWS.config.update({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRETE_KEY
});

const S3 = new AWS.S3({ endpoint: spaceEndpoint });

const generateUniqueFileName = (originalFileName: string) => {
  const [name, extension] = originalFileName.split(/\.(?=[^.]+$)/);
  const sanitizedName = name.replace(/[^\w\s]/g, "").replace(/\s+/g, "_");
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}-${sanitizedName}${extension ? `.${extension}` : ""}`;
};

export async function uploadFile(
  fileData: Blob,
  fileName: string,
  fileType: string
) {
  const params: AWS.S3.PutObjectRequest = {
    Bucket: `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}`,
    Key: generateUniqueFileName(fileName),
    Body: fileData,
    ContentType: fileType,
    ACL: "public-read"
  };

  try {
    const response = await S3.upload(params).promise();
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

export async function downloadFile(fileName: string) {
  const params: AWS.S3.GetObjectRequest = {
    Bucket: `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}`,
    Key: fileName
  };

  try {
    const response = await S3.getObject(params).promise();
    console.log("File downloaded successfully:", response);
    return response;
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
}

export async function deleteFile(fileName: string) {
  const params: AWS.S3.DeleteObjectRequest = {
    Bucket: `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}`,
    Key: fileName
  };

  try {
    const response = await S3.deleteObject(params).promise();
    console.log("File deleted successfully:", response);
    return response;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}
