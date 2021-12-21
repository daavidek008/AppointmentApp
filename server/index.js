const express = require("express");
const mySql = require("mySql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const app = express();

const port = process.env.PORT || 3001;
const www = process.env.WWW || "./";

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"], // dodaj druge metode, ko boš rabil
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe", //spremeni v nekaj močnega
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24, //preveri, kako dolgo naj bo cookie veljaven
    },
  })
);

const db = mySql.createConnection({
  user: "root",
  host: "localhost",
  password: "slowin06",
  database: "appointmentApp",
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.get("/login", (req, res) => {
    if(req.session.user) {
        res.send({loggedIn: true, user: req.session.user});
    } else {
        res.send({loggedIn: false});
    }
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if(!token) {
    res.send("Yo, we need a token!")
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if(err) {
        res.json({auth: false, message: "U failed to authenticated!"});
      } else {
        req.userId = decoded.id;
        next();
      }
    })
  }
}

app.get('/isUserAuth', verifyJWT, (req, res) => {
  res.send("Yo, you are authenticated.");
})

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            const id = result[0].id;
            const token = jwt.sign({id}, "jwtSecret", {
              expiresIn: 300
            }); //zamenjaj skrivnost -> poglej kaj je najboljše
            req.session.user = result;

            res.json({auth: true, token: token, result: result}); //zdaj se pošilja tudi geslo, to se ne sme poslati na frontend
          } else {
            res.json({auth: false, message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.json({auth: false, message: "User doesn't exist!" });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
