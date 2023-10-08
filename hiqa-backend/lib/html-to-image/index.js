const Email = require("email-templates");
const path = require("path");
const logger = require("../../src/utils/logger");
const nodeHtmlToImage = require("node-html-to-image");
const fs = require("fs");

const templateRenderer = new Email({
  views: {
    root: path.join(__dirname, "templates"),
    options: {
      extension: "ejs",
    },
  },
});

const convertHTMLToImage = async (template, emailData) => {
  try {
    //return "sent";
    console.log(template);
    const locals = { custom: emailData };
    locals.site_title = process.env.SITE_TITLE || "";
    locals.email_logo = process.env.LOGO_PATH || "";

    let date = new Date();
    locals.current_year = date.getFullYear();
    const renderedTemplate = await templateRenderer.render(template, locals);

    // Convert the HTML code into an image.
    const image = await nodeHtmlToImage({
      output: "./image.png",
      html: renderedTemplate,
    });

    // Save the image file.
    fs.writeFileSync("./image.png", image);
  } catch (error) {
    console.log(error);
    logger.error(`${500} - [ 'Mail' ] - [ Mail Error ] - ${error}`);
    return error;
  }
};

module.exports = { convertHTMLToImage };
