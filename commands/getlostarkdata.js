
const playwright = require('playwright');
const jsdom = require("jsdom");
const Discord = require('discord.js')

async function getData(charactername){
  for (const browserType of [playwright.chromium]) {
    const browser = await browserType.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(`https://lostark.game.onstove.com/Profile/Character/${charactername}`)
    
    const content = await page.content();
    //console.log(content);
    
    const dom = new jsdom.JSDOM(content);
    
     // Click [aria-label="Next slide"]
    //await page.click('[aria-label="Next slide"]');
    
    characterData={}
    characterData["Character_Name"]=charactername

    engravearr=[]
    
    dom.window.document.querySelectorAll("ul[class^='swiper-slide'] > li > span").forEach(element => {
        engravearr.push(element.textContent)
    });
    characterData["Engrave"]=engravearr
    

    // 직업 로고
    
    temp = dom.window.document.querySelector("#lostark-wrapper > div > main > div > div.profile-character-info > img")
    classlogo=temp.src
    
    characterData['Class_Logo']=classlogo
    
    // 아이템 레벨
    
    level =getdata_bypath(dom,"#lostark-wrapper > div > main > div > div.profile-ingame > div.profile-info > div.level-info2 > div.level-info2__expedition > span:nth-child(2)")
    characterData['Level']=level
    // 전투특성
    
    combat_Traits ={}
    combat_Traits_names=["치명","특화","제압","신속","인내","숙련"]
    for (let index = 0; index < 6; index++) {
        temp= dom.window.document.querySelector(`#profile-ability > div.profile-ability-battle > ul > li:nth-child(${index+1}) > span:nth-child(2)`).textContent
        combat_Traits[combat_Traits_names[index]]=temp
    }
    
    characterData["Combat_Traits"]=combat_Traits

    await browser.close();

    return characterData
  }
};

module.exports = {
  name: '로아검색',
  description: '로아 캐릭터 검색 명령어',
  async execute(message, charactername) {
   
    message.editReply(`${charactername} 검색 중`)
    characterData=await getData(charactername)
    if (!characterData['Level']) return message.editReply("캐릭터를 찾지 못했습니다.")
    const Embed = new Discord.MessageEmbed().setTitle("로아 검색").setColor("0x00438a").setDescription(`${charactername} 를 검색합니다.`).setURL("https://lostark.game.onstove.com/Profile/Character")
    .setAuthor(`${characterData["Level"]} ${charactername}`,"https://i.pinimg.com/474x/4b/a9/23/4ba923b6ad206a2562d4af7dc02e7652.jpg",`https://lostark.game.onstove.com/Profile/Character/${charactername}`).setThumbnail(characterData['Class_Logo'])
    
    Embed.addField("특성","Traits",inline=false)
    sumTrait=0
    for (const [key, value] of Object.entries(characterData["Combat_Traits"])) {
      Embed.addField(`${key}`,`${value}`,inline=true)
      if(key=='치명'||key=='특화'||key=='신속')
        sumTrait+=parseInt(value)
    }
    count_engrave=0
    counthaveengrave_perlev=[0,0,0]
    Embed.addField("각인","Engrave",inline=false)
    characterData["Engrave"].forEach(element => {

      Embed.addField(`${element}`,"--",inline=true)
      if(!element.includes("감소")){
        if(element.includes("3")) {
          count_engrave+=3
          counthaveengrave_perlev[0]+=1
        }
        else if(element.includes('2')) {
          count_engrave+=2
          counthaveengrave_perlev[1]+=1
        }
        else{
          count_engrave+=1
          counthaveengrave_perlev[2]+=1
        }

      }
    
      
    });

    summary="저렙"
    
    isNalmukEngrave=false
    isNalmukTraits=false
    
    lvint=parseInt(characterData["Level"].substring(3).replace(',',''))
    if (lvint>=1370 && lvint<1415){
      summary="알고 따리"

      if(count_engrave<9){
        summary +=', 날먹 각인'
      }
    }else if(lvint >= 1415  && lvint<1460){
      summary="발비노"
      if(count_engrave<12){
        summary +=',날먹 각인'
      }
      if(sumTrait <2100){
        summary += ", 날먹 특성"
      }

    }else if (lvint>=1460 && lvint<1475){
      summary='발비하'
      if(count_engrave<12){
        summary +='날먹 각인'
      }
      if(sumTrait <2100){
        summary += ", 날먹 특성"
      }
    }else if (lvint >= 1475  && lvint<1490){
      summary='발비쿠'
      if(count_engrave<12){
        summary +='날먹 각인'
      }
      if(sumTrait <2100){
        summary += ", 날먹 특성"
      }
    }else if (lvint >= 1490){
      summary='아브렐'
      if(count_engrave<15){
        summary +=', 날먹 각인'
      }
      if(sumTrait <2270){
        summary += ", 날먹 특성"
      }
    }
    if(count_engrave >16){
      summary += ", 333331 어캐했ㄴ"
    }
    if(sumTrait >2340){
      summary += ", 특성 어캐했ㄴ"
    }
    Embed.setFooter(text=summary)
    try {
      message.editReply({ embeds : [Embed]})
      
    } catch (error) {
      message.editReply("죄송해요 오류가 발생했습니다.")
    }

      

  }
}

function getdata_bypath(dom,path){
    return dom.window.document.querySelector(path).textContent
}
