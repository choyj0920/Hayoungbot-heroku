
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
    
    combat_Traits =[]
    combat_Traits_names=["치명","특화","제압","신속","인내","숙련"]
    for (let index = 0; index < 5; index++) {
        temp= dom.window.document.querySelector(`#profile-ability > div.profile-ability-battle > ul > li:nth-child(${index+1}) > span:nth-child(2)`).textContent
        combat_Traits.push(temp)
    }
    for (let index = 0 ; index<5; index++){
        console.log(`${combat_Traits_names[index]} : ${combat_Traits[index]}`)
    }
    
  }
};

getData("슈사이어만키우는사람")
