var express = require('express');
const mysql = require('mysql');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash')
const cookie = require('cookie-parser')
const PORT = process.env.PORT || 5000;
const MySQLStore = require('express-mysql-session')(session);
var ReactDOMServer = require("react-dom/server");
var react = require('react');
var fs = require('fs');






var app = express();



var db = mysql.createConnection({
  host: "35.240.31.20",
  port: 3306,
  user: 'rasl',
  password: 'rasl',
  database: 'Bloggers',
  ssl      : {
        ca   : fs.readFileSync('./ssl/server-ca.pem'), // should be enough for AWS
        key  : fs.readFileSync('./ssl/client-key.pem'), // required for google mysql cloud db
        cert : fs.readFileSync('./ssl/client-cert.pem'), // required for google mysql cloud db
  }
});

var RedisStore = require('connect-redis')(session);
 









app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var options = {
    host: 'ec2-52-204-102-201.compute-1.amazonaws.com',
    port: 6399,
    user: 'h',
    password: 'pb9daa367ea19292e272ac06ff38ad908e6474b71cf89f38a78850a0a1db525e8',
    url: 'redis://h:pb9daa367ea19292e272ac06ff38ad908e6474b71cf89f38a78850a0a1db525e8@ec2-52-204-102-201.compute-1.amazonaws.com:6399',
};

// var sessionStore = new MySQLStore(options);

// app.use(session({
//   secret: 'asduasfhdsfnds',
//   name: 'robzcookie',
//   resave: false,
//   //store: sessionStore,
//   saveUninitialized: false,
//   proxy: true,
//   cookie: {
//     httpOnly: true,
//     secure: true
//   }
// }))



app.set('trust proxy', 1)
app.use(session({
  store: new RedisStore(options),
  secret: 'asduasfhdsfnds',
  name: 'robzcookie',
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    httpOnly: false,
    secure: false,
  }

}))







app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'https://mysterious-island-83177.herokuapp.com/');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

// app.use(function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", 'https://infinite-shore-24194.herokuapp.com');
// //     res.header("Access-Control-Allow-Credentials", true);
// //     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
// //     res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,  Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method,   Access-Control-Request-Headers');
// //     next();
// });

// app.use(cors( {
  
//   origin: "https://infinite-shore-24194.herokuapp.com",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS",
//   "preflightContinue": false,
//   "Access-Control-Allow-Credentials": true,
//   "optionsSuccessStatus": 204,
//   credentials: true,
//   origin: true
//   "Access-Control-Allow-Origin": "https://infinite-shore-24194.herokuapp.com"

// }))

// app.use (function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'https://infinite-shore-24194.herokuapp.com');
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS, POST,DELETE');
//     res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
      
//     // intercept OPTIONS method
//     if ('OPTIONS' == req.method) {
//       res.send(200);
//     }
//     else {
//       next();
//     }
// });







passport.use(new LocalStrategy(
       

  function(username, password, done) {

      const sql = `SELECT * FROM Bloggers.login WHERE Email = '${username}' AND Password = '${password}' `;
      db.query(sql, (error, results, fields) => {
        
        if(results.length === 0) {
          done(null, false)
        } else {
          var userId = results[0]
          return done(null, userId);
        }

      })
      
    }));



app.get('api/react', (req, res, err) => {
 res.sendFile(path.join(__dirname+'/index.html'));
 
})



app.get ('api/profile/:id', (req, res, err) => {
  req.isAuthenticated()
    console.log(req.user)
    res.send(req.user)
  
})








app.get('/api/', (req, res, next) => {
      var origin = req.get('origin'); 

  res.send('We are live' + origin)
})

app.get('/api/blogs', (req, res, next) => {


  let sql = `SELECT * FROM Bloggers.blogs`;

  db.query(sql, function(err, blogs, fields) {
    if(err) {
      console.log('not good')
      res.sendStatus(err)
    } else {
      res.json(blogs)
    }
})
})

app.get('/api/profile/:id/myblogs', (req, res, next) => {
  let sql = `SELECT * FROM Bloggers.blogs WHERE userId = ?`;
  var id = req.user.id
  var values = [id];


  db.query(sql, values, function(err, myblogs, fields) {
    if(err) {
      res.sendStatus(400)
      console.log('not good')
    } else {
      res.send(myblogs)
    }
})
})

app.get('/api/profile/:id/myblogs/:id', (req, res, next) => {
  let sql = `SELECT * FROM Bloggers.blogs WHERE id = ?`;
  var id = req.params.id
  var values = [id];


  db.query(sql, values, function(err, myblogs, fields) {
    if(err) {
      res.sendStatus(400)
      console.log('not good')
    } else {
      res.send(myblogs)
    }
})
})

app.put('/api/profile/:id/myblogs/:id', (req, res, next) => {
  const title = req.body.Title,
        content = req.body.Content,
        id = req.params.id
        

  if(!title || !content) {
    return res.sendStatus(400);
  }

  const sql = `UPDATE Bloggers.blogs SET ? WHERE id = ${id}`;
  const values = {Title: title, Content: content};


  db.query(sql, values, (error, result) => {
    if(error) {
      next(error);
    } else {
        console.log('User' + result.insertId + 'updated to database with ID: ')
          res.send('User' + result.insertId + 'updated to database with ID: ');
        }
    })
})





/*app.get('/profile', authenticatedMiddleware(), (req, res, next) => {

  var html = '<h1>Hello World!</h1>';
    response.send(html);
  /*userId = req.user.user_id


  let sql = `SELECT * FROM farmers.login WHERE id = ?`;
    db.query(sql, userId, (err, results, fields) => {
      if(err) {
        next(err)
      } else {
      res.send(results)
    }
    } )
    })*/


app.get('/farmers/:id', (req, res, next) => {
  let sql = `SELECT * FROM Bloggers.blogs WHERE id = ?`;
  var id = req.params.id
  var values = [id]

  db.query(sql, id, function(err, farmer, fields) {
    if(err) {
      res.sendStatus(400)
      console.log('not good')
    } else {
      res.json(farmer)
    }
})
})

app.post('/addfarmer', (req, res, next) => {
  const name = req.body.name,
        sport = req.body.sport;
        

  if(!name || !sport) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO farmers.farmers SET ?';
  const values = {Name: name, Occupation: sport};

  db.query(sql, values, function(error, result){
    if(error) {
      console.log('Help')
      next(error);
    } else {
        console.log('User added to database with ID: ' + result.insertId)
          res.send('User added to database with ID: ' + result.insertId);
        }
    })
})

app.put('/editplayer/:id', (req, res, next) => {
  const name = req.body.name,
        sport = req.body.sport,
        id = req.params.id
        

  if(!name || !sport) {
    return res.sendStatus(400);
  }

  const sql = `UPDATE farmers.farmers SET ? WHERE id = ${id}`;
  const values = {Name: name, Occupation: sport};


  db.query(sql, values, (error, result) => {
    if(error) {
      next(error);
    } else {
        console.log('User' + result.insertId + 'updated to database with ID: ')
          res.send('User' + result.insertId + 'updated to database with ID: ');
        }
    })
})


app.delete('/farmers/:id', (req, res, next) => {
  let sql = `DELETE FROM farmers.farmers WHERE id = ?`;
  var id = req.params.id
  var values = [id]
  db.query(sql, values, error => {
    if(error){
      next(error);
    } else {
        console.log('User deleted')
          res.send('User deleted');
    }
  });
});

app.delete('/api/profile/:id/myblogs/:num', (req, res, next) => {
  let sql = `DELETE FROM Bloggers.blogs WHERE id = ?`;
  var id = req.params.num
  var values = [id]
  db.query(sql, values, error => {
    if(error){
      next(error);
    } else {
        console.log('User deleted')
          res.send('User deleted');
    }
  });
});





app.post('/api/register', (req, res, next) => {
  const name = req.body.name,
        email = req.body.email,
        password = req.body.password;
        

  if(!name || !email || !password) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO Bloggers.login SET ?';
  const values = {Name: name, Email: email, Password: password};

  db.query(sql, values, function(error, result){
    if(error) {
      console.log('Help')
      next(error);
    } else {
        db.query('SELECT * FROM Bloggers.login ORDER BY ID DESC LIMIT 1', (error, results, fields) => {
          if(error) throw error
            const user = results[0]
            req.login(user, (err)=> {
              if(err) {
                throw error
              } 
              res.send(req.user)
              console.log(req.isAuthenticated())
            })
        })
        
      }
        
        })
    })

app.post('/api/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res, next) {

        userId = req.user
         res.send(userId)
          console.log(userId)

});


app.get('/api/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
  console.log('Successfuly logged out')
})


app.post('/api/addblog', (req, res, next) => {
  const title = req.body.Title,
        content = req.body.Content;
        userId = req.user.id
        

  if(!title || !content) {
    console.log('mistake')
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO Bloggers.blogs SET ?';
  const values = {Title: title, Content: content, userId: userId};

  db.query(sql, values, function(error, result){
    if(error) {
      console.log('Help')
      next(error);
    } else {
        console.log('blog added to database with ID: ' + result.insertId)
          res.send('blog added to database with ID: ' + result.insertId);
        }
    })
})



passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
  });






app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
});