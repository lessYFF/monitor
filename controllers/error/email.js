const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
        user: '1289368061@qq.com',
        pass: 'kesddzsfyafrbabi', // 这里密码不是qq密码，是你设置的smtp授权码
    },
})

// send mail with defined transport object
const sendEmail = function(info) {
    let mailOptions = {
        from: '"Bruce yff" <1289368061@qq.com>', // sender address
        to: 'shijunzi@fanhaoyue.com', // list of receivers
        subject: info.title || '错误告警', // Subject line
        // 发送text或者html格式
        html: info.body || '<b>Hello world?</b>', // html body
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
        }
        console.log('Message sent: %s', info.messageId)
    })
}

module.exports = sendEmail;
