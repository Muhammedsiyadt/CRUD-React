const cloudinaryUploadImage = async (fileToUpload) => {
    try {
      const data = await cloudinary.uploader.upload(fileToUpload, {
        resource_type: "auto",
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error (cloudinary)");
    }
  };

  const cloudinaryRemoveImage = async (imagePublicId) => {
    try {
      const result = await cloudinary.uploader.destroy(imagePublicId);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error (cloudinary)");
    }
  };

  module.exports = {
    cloudinaryUploadImage,
    cloudinaryRemoveImage,
  };