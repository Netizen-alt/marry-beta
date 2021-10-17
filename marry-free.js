const { model, Schema, connect } = require("mongoose");
const Discord = require("discord.js");

const mongoDB = 'mongodb+srv://';

let Cx = model("Nx", new Schema({ //สร้างดาต้า
    name: String,
    userID: String,
    mateID: String,
    age: String,
    img: String,
}))



const findUserOne = async ({ id }) => { //ค้นหาไอดีที่ต้องการ จะรีเทอไอดีที่เจอ
    return new Promise((resolve, reject) => {
        Cx.findOne({ userID: id }, async (err, data) => {
            if (data) {
                resolve(data)
            } else {
                reject(false)
            }
        })
    })
}


module.exports = {
    name: 'marry',
    description: 'marryday',
    async execute(client, message, args) {
        switch (args[0]) {
            case "start":
            case "st":
                Cx.create({ name: 'ยังไม่พบข้อมูล', userID: message.author.id, age: 'ยังไม่พบข้อมูล', mateID: 'ยังไม่พบข้อมูล', img: 'https://cdn.discordapp.com/attachments/879421194145767485/887172124110884874/f0e085aa335ae8d0.png' })
                message.channel.send('เริ่มโปรโมทตัวเอง')
                break;
            case 'profile':
            case 'pf':
                findUserOne({ id: message.author.id })
                    .then((data) => {
                        let undefind = data.mateID;

                        let circles = {
                            single: "โสด",
                            mate: "แต่งงาน",
                            uss: "ไม่สมควรมีคู่"
                        }

                        const embed = new Discord.MessageEmbed()
                            .setAuthor('โปรไฟล์')
                            .setDescription(`**ชื่อ:** ${data.name}\n**อายุ:** ${data.age}\n**สถานะ:** ${undefind == 'ยังไม่พบข้อมูล' ? circles.single : undefind !== 'ยังไม่พบข้อมูล' ? circles.mate : circles.uss}`)
                            .setThumbnail(`${data.img}`)
                            .setColor('#2F3136')
                            .setFooter('Power By: LynnTeam')
                        message.channel.send(embed)
                        
                    })
                    .catch(err => {
                        message.channel.send('ไม่พบผู้ใช้งาน')
                    })
                break;
            case "edit":
            case "ed":
                findUserOne({ id: message.author.id })
                    .then((data) => {
                        const user = data
                        user.name = args[1]
                        user.age = args[2]
                        user.url = args[2]
                        user.save()

                        const embed1 = new Discord.MessageEmbed()
                            .setAuthor('แก้ไขชื่อโปรไฟล์')
                            .setDescription(`\n**ชื่อ:** ${user.name}\n**อายุ:** ${user.age}`)
                            .setThumbnail(`${data.img}`)
                            .setColor('#2F3136')
                            .setFooter('Power By: LynnTeam')
                        message.channel.send(embed1).then(msg => { msg.delete({ timeout: 2000 }) })
                        message.delete({ timeout: 2000 })
                    })
                break;
            case "edit-img":
                findUserOne({ id: message.author.id })
                    .then((data) => {
                        const image = data
                        image.img = args[1]
                        image.save()

                        const embed2 = new Discord.MessageEmbed()
                            .setAuthor('แก้ไขรูปโปรไฟล์')
                            .setDescription(`\n**ชื่อ:** ${data.name}\n**อายุ:** ${data.age}`)
                            .setThumbnail(`${image.img}`)
                            .setColor('#2F3136')
                            .setFooter('Power By: LynnTeam')
                        message.channel.send(embed2).then(msg => { msg.delete({ timeout: 2000 }) })
                        message.delete({ timeout: 2000 })
                    })
                break;
            case "mate":
                findUserOne({ id: message.author.id, mateID: message.mentions.id })
                    .then((data) => {

                        let marryMentions = message.mentions.members.first().id;
                        if (!marryMentions) return message.reply('คุณยังไม่ได้แท็ก')

                        let marryMember = message.member;
                        if (marryMember == marryMentions) return message.reply('คุณไม่สามารถแต่งกับตัวเองได้')

                        const matemarry = data;

                        matemarry.mateID = marryMentions;

                        matemarry.save()
                        message.channel.send('คุณได้แต่งงานแล้ว')
                    })
                break;
        }
    }
}

/**
  * @INFO
  * @github github.com/jktheripperth
  * @discord discord.gg/YFvPG8tHav
  * @author 𝐀𝐥𝐨𝐧𝐞#8475 & Solart#6590 & [SEVEN]#6218 & KvFunction#1449
  * Thank for code by : Lynn Team
  * แก้ไขเอาเอง ขี้เกียจทำต่อเพราะของฟรีไอ้โง่!!
  */
