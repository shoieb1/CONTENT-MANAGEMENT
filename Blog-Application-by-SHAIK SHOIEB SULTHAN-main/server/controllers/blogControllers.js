const mysql = require("mysql");
const { search } = require("../routes/blogg");


const pool = mysql.createPool({
  connectionLimit: 200,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});


exports.home = (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) {
      console.log("connection failed");
    } else {
      console.log("connection is built");
    }
    //    use the connection
    connection.query("select *from  posts", (err, rows) => {
      // when done with the connection release it
      connection.release();
      if (!err) {
        res.render("index", { rows });
        console.log("the data from the table", rows);
      } else {
        console.log(err);
      }
    });
  });
};


exports.posts = (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) {
      console.log("connection failed");
    } else {
      console.log("connection is built");
      connection.query(
        "select *from user ",
        (err, rows) => {
          if (!err) {
            if(rows.length==0){
              res.redirect('/')
            }else{
              res.render('create')
            }
                
              }
            });
          } 


  });  
 
};





exports.post = (req, res) => {
  const { title, username, description, content, image } = req.body;
  pool.getConnection((error, connection) => {
    if (error) {
      console.log("connection failed");
    } 
    else {
      console.log("connection is built");
      connection.query(
        "insert into posts set title =?, description=?, content =?, image =? ,username= ? ",
        [title, description, content, image,  username ],
        (err, rows) => {
          if (!err) {
            res.redirect('/')
            connection.query("delete from user", (err, r)=>{
              connection.release();
})
             }
             else {
            console.log(err);
          }
        }
      );
    }
  })
}


exports.register = (req, res) => {
  res.render('register')
 };


 
exports.registerPost = (req, res) => {
  const {username, email, password } = req.body;
  pool.getConnection((error, connection) => {
    if (error) {
      console.log("connection failed");
    } else {
      connection.query(
        "insert into user set username =?, email=?, password =?",
        [  username, email, password ],
        (err, rows) => {
          if (!err) {
            res.redirect('/')
          } else {
            console.log(err);
          }
        }
      );
    
    }
})
};


exports.login = (req, res) => {
  res.render('login')
 };


 exports.loginPost = (req, res) => {
  const {username, email, password } = req.body;
  pool.getConnection((error, connection) => {
    if (error) {
      console.log("connection failed");
    } else {
      console.log("connection is built")
        connection.query("select *from  user_details where username=? and email =? and password =?",[username,email, password], (err, rows) => {
          // when done with the connection release it
          if (!err) {
            if(rows.length ==0){
              res.render("register", { alert: "You are a new user please register" })
            }
            else{
              if (!err) {
                connection.query("insert into user  set username=? , email=? ,  password=?",[username, email, password], (err, ro)=>{
                  if(!err){
                    res.redirect('/')
                  }
                  
                } )
                  
              }
          }
        }else{
          res.send("something went wrong")
        }}
      );
}
  });
};

// // edit user
// exports.edit = (req, res) => {
//   pool.getConnection((error, connection) => {
//     if (error) {
//       console.log("connection failed");
//     } else {
//       console.log("connection is built");
//     }
//     //    use the connection
//     connection.query(
//       "select *from  newuser1 where id= ?",
//       [req.params.id],
//       (err, rows) => {
//         // when done with the connection release it
//         connection.release();
//         if (!err) {
//           res.render("edit-user", { rows });
//           console.log("the data from the table", rows);
//         } else {
//           console.log(err);
//         }
//       }
//     );
//   });
// };

// // update user
// exports.update = (req, res) => {
//   pool.getConnection((error, connection) => {
//     if (error) {
//       console.log("connection failed");
//     } else {
//       console.log("connection is built");
//     }
//     const { first_name, last_name, email, phone, message } = req.body;
//     //    use the connection
//     connection.query(
//       "update newuser1 set first_name =?, last_name=?, email =?, phone =? ,message= ? , action=? where id= ? ",
//       [first_name, last_name, email, phone, message, "1", req.params.id],
//       (err, rows) => {
//         // when done with the connection release it
//         connection.release();
//         if (!err) {
//           pool.getConnection((error, connection) => {
//             if (error) {
//               console.log("connection failed");
//             } else {
//               console.log("connection is built");
//             }
//             //    use the connection
//             connection.query(
//               "select *from  newuser1 where id= ?",
//               [req.params.id],
//               (err, rows) => {
//                 // when done with the connection release it
//                 connection.release();
//                 if (!err) {
//                   res.render("edit-user", {
//                     rows,
//                     alert: "updation successful",
//                   });
//                   console.log("the data from the table", rows);
//                 } else {
//                   console.log(err);
//                 }
//               }
//             );
//           });
//         } else {
//           console.log(err);
//         }
//       }
//     );
//   });
// };

// //delete user
// exports.delete = (req, res) => {
//   pool.getConnection((error, connection) => {
//     if (error) {
//       console.log("connection failed");
//     } else {
//       console.log("connection is built");
//     }
//     //    use the connection
//     connection.query(
//       "delete from  newuser1 where id= ?",
//       [req.params.id],
//       (err, rows) => {
//         // when done with the connection release it
//         connection.release();
//         if (!err) {
//           res.redirect("/");
//           console.log("the data from the table", rows);
//         } else {
//           console.log(err);
//         }
//       }
//     );
//   });
// };


// // to view a particular user
// exports.viewall = (req, res) => {
//   pool.getConnection((error, connection) => {
//     if (error) {
//       console.log("connection failed");
//     } else {
//       console.log("connection is built");
//     }
//     //    use the connection
//     connection.query(
//       "select *from  newuser1 where id=?",
//       [req.params.id],
//       (err, rows) => {
//         // when done with the connection release it
//         connection.release();
//         if (!err) {
//           res.render("viewall", { rows });
//           console.log("the data from the table", rows);
//         } else {
//           console.log(err);
//         }
//       }
//     );
//   });
// };
