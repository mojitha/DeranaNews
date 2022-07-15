const { randomUUID } = require("crypto");
const path = require("path");
const publicUrl = path.join(__dirname, "../public");
const filesUrl = path.join(publicUrl, "/uploads");

const uploadFiles = async (req, res) => {
  try {
    const isMultiple = req.params.isMultiple;
    const uploadedFileNamesArray = [];

    if (isMultiple === "true") {
      const formFilesArray = req.files.fileUploadControlInput;
      formFilesArray.forEach(async (formFile) => {
        const uploadFileExtension = formFile.name.split(".")[1];
        const uploadFileName = `${randomUUID()}.${uploadFileExtension}`;
        const uploadFilePath = `${filesUrl}/${uploadFileName}`;

        uploadedFileNamesArray.push(uploadFileName);

        await formFile.mv(uploadFilePath, (error) => {
          if (error) {
            return;
          }
        });
      });
    } else if (isMultiple === "false") {
      const formFile = req.files.fileUploadControlInput;
      const uploadFileExtension = formFile.name.split(".")[1];
      const uploadFileName = `${randomUUID()}.${uploadFileExtension}`;
      const uploadFilePath = `${filesUrl}/${uploadFileName}`;

      uploadedFileNamesArray.push(uploadFileName);

      await formFile.mv(uploadFilePath, (error) => {
        if (error) {
          return;
        }
      });
    }
    res.status(201).json({ success: true, data: uploadedFileNamesArray });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, errors: error });
  }
};

module.exports = {
  uploadFiles,
};
