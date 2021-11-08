
const playwright = require('playwright');
const jsdom = require("jsdom");

async function getData(charactername){
  for (const browserType of [playwright.chromium]) {
    const browser = await browserType.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(`https://lostark.game.onstove.com/Profile/Character/${charactername}`)
    
    const content = await page.content();
    //console.log(content);
    await browser.close();
    
    const dom = new jsdom.JSDOM(content);

     // Click [aria-label="Next slide"]
    //await page.click('[aria-label="Next slide"]');
    
    engravearr=[]
    
    dom.window.document.querySelectorAll("ul[class^='swiper-slide'] > li > span").forEach(element => {
        engravearr.push(element.textContent)
    });

    console.log("=======================\n")
    console.log(engravearr)


    

    // 직업 로고
    /*
    temp = dom.window.document.querySelector("#lostark-wrapper > div > main > div > div.profile-character-info > img")
    temp=temp.src
    console.log(temp)
    */
    // 아이템 레벨
    /*
    temp =getdata_bypath(dom,"#lostark-wrapper > div > main > div > div.profile-ingame > div.profile-info > div.level-info2 > div.level-info2__expedition > span:nth-child(2)")
    console.log(temp) */
    // 전투특성
    /* 
    combat_Traits =[]
    combat_Traits_names=["치명","특화","제압","신속","인내","숙련"]
    for (let index = 0; index < 5; index++) {
        temp= dom.window.document.querySelector(`#profile-ability > div.profile-ability-battle > ul > li:nth-child(${index+1}) > span:nth-child(2)`).textContent
        combat_Traits.push(temp)
    }
    for (let index = 0 ; index<5; index++){
        console.log(`${combat_Traits_names[index]} : ${combat_Traits[index]}`)
    }
    */

  }
};

function getdata_bypath(dom,path){
    return dom.window.document.querySelector(path).textContent
}

getData("용카리나")
