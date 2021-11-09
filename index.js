const { Client, Intents, DiscordAPIError} = require('discord.js');
const {Collection}=require('discord.js')
const { token } = require('./config.json');
const Discord = require('discord.js')

const fs=require('fs');
var myIntents =new Intents()
myIntents.add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES);
const client = new Client({ intents:myIntents });


client.commands=new Collection()
const commandFiles=fs.readdirSync('./commands').filter(file=>file.endsWith('.js'))

for(const file of commandFiles){ // 
	console.log(file)
	const command=require(`./commands/${file}`)
	client.commands.set(command.name,command)
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
	await interaction.reply(`수행 중`);


	try {

		if (commandName === 'ping') {
			await interaction.editReply('Pong!');
		} else if (commandName === 'server') {
			await interaction.editReply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
		} else if (commandName === 'user') {
			await interaction.editReply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
		}else if (commandName ==='도움말'){

			const myembed = new Discord.MessageEmbed().setTitle("😋 도움말 😝").setDescription("나의 단축키를 알려주겠따!😝").setColor("#33ff73")
			myembed.addField('/노래 재생 제목 : ',' 해당 제목의 노래를 플레이리스트에 담고 재생중이 아니라면 재생합니다.')
			myembed.addField('/노래 루프 : ',' 다음곡 재생부터 루프형식으로 바꿉니다.')
			myembed.addField('/노래 플레이리스트 : ',' 현재 노래의 플레이리스트를 출력합니다.')
			myembed.addField('/노래 플레이리스트 삭제 n : ',' n번 노래를 플레이리스트에서 삭제합니다.')
			myembed.addField('/노래 건너뛰기 : ',' 다음곡으로 ㄱㄱ')
			myembed.addField('/노래 종료 : ',' 노래 정지')


			await interaction.editReply("빠 밤!");
			interaction.editReply({ embeds : [myembed]})

		}

		else if(commandName ==='노래'){
			await interaction.editReply(`${interaction.options.get("옵션").value}`);

			const command = client.commands.get(interaction.commandName);
			console.log(interaction.options.get("옵션").value.split(" "))
			await command.execute(interaction,interaction.options.get("옵션").value.split(" "));
			
		}else if(commandName === '로아검색'){
			const command = client.commands.get(interaction.commandName);
			characterName= interaction.options.get("캐릭터명").value.trim()
			await interaction.editReply(`캐릭터명 : ${characterName} 검색`);
			await command.execute(interaction,characterName);

			
		}else{
			await interaction.editReply(`해당 명령어를 찾지못함`);

		}
	} catch (error) {
		console.error(error);
		await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});

const { chromium } = require("playwright-chromium");

(async () => {
  const browser = await chromium.launch({ chromiumSandbox: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://whatsmyuseragent.org/');
  await page.screenshot({ path: `chromium.png` });
  await browser.close();
})();



client.login(process.env.TOKEN);

