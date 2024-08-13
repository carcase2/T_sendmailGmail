const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const port = 3001;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // JSON 본문 파싱
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'coaddoor12@gmail.com',  // 본인의 Gmail 주소
        pass: 'utlj qpsf ktwc pbfl'
    }
  });

app.get('/', (req, res) => {
    res.render('index'); // ejs 파일을 렌더링
});

app.post('/sendEmail', (req, res) => {
    const { email, title, options, files } = req.body;
  
    // 첨부 파일 구성
  
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: title,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('이메일 전송에 실패했습니다.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('이메일이 성공적으로 전송되었습니다.');
        }
    });
  });