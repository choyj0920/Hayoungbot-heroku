# 😀LostARK search bot (+HayoungBot)
####  ***Discord bot for search LOSTARK Character ***



로아의 전정실에서 data 가져와서 디코에 띄우기 -

캐릭터의 정보정도는 그냥 html만으로 가져올수있지만 원정대 정보나 아이템 트포 상태 등의 경우 동적으로 가져와야해서 PlayWright 라이브러리 사용



```javascript
const playwright = require('playwright');
const jsdom = require("jsdom");
const Discord = require('discord.js')

async function getData(charactername){
  for (const browserType of [playwright.chromium]) { // 크로니움으로 열기
    const browser = await browserType.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(`https://lostark.game.onstove.com/Profile/Character/${charactername}`)//사이트
    
    const content = await page.content(); //content 가져오기

    // html 리더
    const dom = new jsdom.JSDOM(content);

    characterData={}
    characterData["Character_Name"]=charactername

    engravearr=[]
    dom.window.document.querySelectorAll("ul[class^='swiper-slide'] > li > span").forEach(element => {
        engravearr.push(element.textContent)
    });
    characterData["Engrave"]=engravearr
    // 직업 로고
    class_Logo = dom.window.document.querySelector("#lostark-wrapper > div > main > div > div.profile-character-info > img")
    characterData['Class_Logo']=class_Logo.src

    await browser.close();

    return characterData
  }
};
```

