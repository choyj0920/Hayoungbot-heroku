# ๐LostARK search bot (+HayoungBot)
####  ***Discord bot for search LOSTARK Character ***



๋ก์์ ์ ์ ์ค์์ data ๊ฐ์ ธ์์ ๋์ฝ์ ๋์ฐ๊ธฐ -

์บ๋ฆญํฐ์ ์ ๋ณด์ ๋๋ ๊ทธ๋ฅ html๋ง์ผ๋ก ๊ฐ์ ธ์ฌ์์์ง๋ง ์์ ๋ ์ ๋ณด๋ ์์ดํ ํธํฌ ์ํ ๋ฑ์ ๊ฒฝ์ฐ ๋์ ์ผ๋ก ๊ฐ์ ธ์์ผํด์ PlayWright ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ฌ์ฉ



```javascript
const playwright = require('playwright');
const jsdom = require("jsdom");
const Discord = require('discord.js')

async function getData(charactername){
  for (const browserType of [playwright.chromium]) { // ํฌ๋ก๋์์ผ๋ก ์ด๊ธฐ
    const browser = await browserType.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(`https://lostark.game.onstove.com/Profile/Character/${charactername}`)//์ฌ์ดํธ
    
    const content = await page.content(); //content ๊ฐ์ ธ์ค๊ธฐ

    // html ๋ฆฌ๋
    const dom = new jsdom.JSDOM(content);

    characterData={}
    characterData["Character_Name"]=charactername

    engravearr=[]
    dom.window.document.querySelectorAll("ul[class^='swiper-slide'] > li > span").forEach(element => {
        engravearr.push(element.textContent)
    });
    characterData["Engrave"]=engravearr
    // ์ง์ ๋ก๊ณ 
    class_Logo = dom.window.document.querySelector("#lostark-wrapper > div > main > div > div.profile-character-info > img")
    characterData['Class_Logo']=class_Logo.src

    await browser.close();

    return characterData
  }
};
```





## Bot +Heroku 

1. heroku ๊ฐ์ ํ ๊นํ๋ธ ์ฐ๊ฒฐ, ํ ํฐ๋ฑ ์ ๋ณด๋ฅผ ๊ฐ๋ฆฐํ

2. Procfile ๋ง๋ค๊ธฐ -heroku์์ ์คํ ๋ช๋ น์ด๋ฅผ ์ํด ๋ฃจํธ ํด๋์ ๋ฃ์ด๋๋ฉด๋จ -ํ์ฅ๋ช ์์ด

   ```
   worker: npm start
   
   ```

3.  git์ ์๋ก๋๊ฐ ๋๋ฉด ๋ฐ๋ก ์คํ

   <img src="README.assets/image-20211109153238232.png" alt="image-20211102093937334" width="800" /> 

4.  PlayWright ์ค๋ฅ, ์ฌํ ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ค๋ฅ

   1.  ์ฌ์ฉํ๋ ๋ชจ๋  ๋ผ์ด๋ธ๋ฌ๋ฆฌ package.json ์ ์ ๋ฆฌ

   2. playWright์ ๊ฒฝ์ฐ ์ถ๊ฐ์ ์ธ ์์ ํ์ 

      1. buildpack์ ์ถ๊ฐ <img src="README.assets/image-20211109153747420.png" alt="buildpack" width="800" />

      2. ์ฌ๋ฌ ๋ธ๋ผ์ฐ์ ๊ฐ ํฌํจ๋์ด์๋ playwright์์ ๊ฐ์ํํ์ฌ  ํ๋์ ๋ธ๋ผ์ฐ์ ๋ก ํฌํจ๋์ด ์๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ์ฌ์ฉ

      3. ๊ทธ์ ๋ฐ๋ฅธ package.json ์ ๋ฆฌ

      4. ```json
         "dependencies": {
             "playwright-chromium": "^1.9.0",
         }
         ```

      PlayWright์ heroku  ๊ฐ๋จํ๊ฒ ์ผ์ง๋ง ํ๋ฃจ์ข์ผ ๊ณ ์ํ๋ค .

5.  ๋ค์ ์คํ ์ฑ๊ณต! 

   

   

   ## ----------------------------

   ์ ์ ๋ฒ์ฃผ ์ฃผ๋ง๋ถํฐ? ์์์ฌ์ ๋ด ๋ง๋ค๊ณ  ์ด๋ฒ์ฃผ์๋ LOSTARK ์บ๋ฆญํฐ ์ ๋ณด๋ฅผ ๊ฐ์ ธ์์ ๋ณด์ฌ์ฃผ๋ ๋ด์ ๊ธฐ๋ฅ์ ๊ตฌํํ๋๋ฐ ์น๊ตฌ๋ค์ด ๋ด๊ฐ ํด๊ทผํด์ ๋ด์ ๋๋ฉด ์๊พธ ๋ด๋ด์ด ์๋๋ค๊ณ  ๋จธ๋ผ๋จธ๋ผ ํด์ ์๋ฒ์ ๋์ฐ๋๊ฑธ ์ฐพ์์ ๋์๋ณด์๋ค. 

   ์ด์  ๋ด์ผ์ ์๋ง ํ์ฌ์์ด์ ๋ฐ์ ํ๋ ๋ชจ๋ ? ๋ถํฐ๋ ๋ณธ๊ฒฉ์ ์ผ๋ก ๋์ ์ผ๋ก ์น ๋ฐ์ดํฐ๋ฅผ ๊ฐ์ ธ์ค๋๊ฑธ ํด๋ด์ผ๊ฒ ๋ค.

   ๊ทธ๋ฆฌ๊ณ  discord Bot ๋ง๊ณ  ์นด์นด์คํก ์๋ต ๋ด? ์๋ต๊ธฐ?๋ก๋ ํด๋ณผ ๊ณํ .. ์ค๋ ๋ค

   
