const fs = require('fs');
const pathM = require('path');
const puppeteer = require('puppeteer');

class QuotesPhotosGenerator {
  start({ imageUrl, color, quote, specialWords = [], font = 'Russo One', author = '', path = './image.png', blur = 0, backgroundColorActivate = true, width = 720, height = 1280 }) {
    return new Promise(async next => {
      const htmlCode = this.createHTMLCode({ imageUrl, color, quote, specialWords, font, author, backgroundColorActivate, blur });
      this.writeHTMLCode({ htmlCode, path });
      await this.saveImage({ path, height, width });
      this.removeHTMLCode({ path });
      next();
    });
  }

  createHTMLCode({ imageUrl, color, quote, specialWords, font, author, blur, backgroundColorActivate }) {
    const quoteSpanHTML = this.createQuoteSpanHTML({ quote, specialWords });

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            html {
              height: 100%;
            }

            body, .image {
              width: 100%;
              height: 100%;
              margin: 0;
            }

            .image {
              background-image: url(${imageUrl});
              background-size: cover;
              background-position: center;
              filter: blur(${blur}px);
            }

            .colorShadow, .darkShadow {
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .colorShadow {
              background-color: ${ backgroundColorActivate ? `#${color}40` : `transparent`};
              position: absolute;
              top: 0;
            }

            .darkShadow {
              background-color: #000000DB;
            }

            .content {
              padding: 12px;
              margin: 16px;
              border: 6px solid white;
              width: calc(100% - 68px);
              height: calc(100% - 68px);
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
            }

            .content span {
              color: white;
              font-family: ${font};
              font-size: 45px;
              text-align: center;
            }

            .content span .specialWord {
              color: #${color};
            }

            .content .author {
              color: #${color};
              font-family: ${font};
              font-size: 38px;
              position: absolute;
              bottom: 8px;
              width: 100%;
              filter: brightness(0.8);
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="image"></div>
          <div class="colorShadow">
            <div class="darkShadow">
              <div class="content">
                <span>${quoteSpanHTML}</span>
                <div class="author">
                  ${author}
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    return html;
  }

  writeHTMLCode({ htmlCode, path }) {
    fs.writeFileSync(`${pathM.join(__dirname, `../../${path}`)}.html`, htmlCode);
  }

  async saveImage({ path, width, height }) {
    const browser = await puppeteer.launch({
      args: [`--window-size=${width},${height}`]
    });
    const page = await browser.newPage();
    await page.setViewport({ width, height });
    await page.goto(`file://${pathM.join(__dirname, `../../${path}`)}.html`);            
    await page.screenshot({ path });
    await browser.close();
  }

  removeHTMLCode({ path }) {
    fs.unlinkSync(`${pathM.join(__dirname, `../../${path}`)}.html`);
  }

  createQuoteSpanHTML({ quote, specialWords }) {
    let quoteSpanHTML = quote;
    specialWords.forEach(specialWord => quoteSpanHTML = quoteSpanHTML.replaceAll(specialWord, `<span class="specialWord">${specialWord}</span>`));
    return quoteSpanHTML;
  }
}

String.prototype.replaceAll = function(search, replacement) {
  return this.split(search).join(replacement);
};

module.exports = QuotesPhotosGenerator;
