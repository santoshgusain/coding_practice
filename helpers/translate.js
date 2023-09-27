const AWS = require("aws-sdk");

// Set your AWS credentials and region
AWS.config.update({
  accessKeyId: "AKIAZ7EUBGBI6ANND7EH",
  secretAccessKey: "f2DCchxn0gPWu6LOXfDx6++E78YKn5JBkUTo9xob",
  region: "us-west-2",
});

// Create an instance of the Amazon Translate service
const translate = new AWS.Translate();

const translateText = (text, targetLanguage) => {
  const params = {
    Text: text,
    SourceLanguageCode: "auto", // Automatic language detection
    TargetLanguageCode: targetLanguage,
  };

  return new Promise((resolve, reject) => {
    translate.translateText(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.TranslatedText);
      }
    });
  });
};

module.exports = { translateText };

// // Example usage
// const sourceText = "Hello, how are you?";
// const targetLanguageCode = "fr"; // French (you can use any supported language code)

// translateText(sourceText, targetLanguageCode)
//   .then((translatedText) => {
//     console.log(translatedText);
//   })
//   .catch((err) => {
//     console.error("Error:", err);
//   });
