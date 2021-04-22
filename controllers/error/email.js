const path = require('path')
const nodemailer = require('nodemailer')
const { pugEngine } = require('nodemailer-pug-engine')

const transporter = nodemailer.createTransport({
    service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
        user: '1289368061@qq.com',
        pass: 'kesddzsfyafrbabi', // 这里密码不是qq密码，是你设置的smtp授权码
    },
})

// format object first level value to string
const formatObjectFirstLevelValueToString = (arg) => {
    if (!arg || !Object.keys(arg).length) return {}

    const obj = {}
    Object.getOwnPropertyNames(arg).forEach(key => {
        obj[key] = typeof arg[key] === 'object' ? JSON.stringify(arg[key]) : arg[key]
    })

    return obj
} 

// use pug template
transporter.use('compile',
    pugEngine({
        templateDir: path.join(__dirname + '../../../views'),
    })
)

// send mail with defined transport object
const sendEmail = function(info) {
    const mailOptions = {
        from: '"Bruce yff" <1289368061@qq.com>', // sender address
        to: 'shijunzi@fanhaoyue.com', // list of receivers
        subject: info.title || '错误告警', // Subject line
        // 发送text、html格式或使用模版
        template: 'email',
        ctx: formatObjectFirstLevelValueToString(info.dataValues),
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error)

        console.log('Message sent: %s', info.messageId)
    })
}

module.exports = sendEmail;
