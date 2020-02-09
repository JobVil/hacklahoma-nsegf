const { Connection, Request } = require("tedious");
var express = require('express');
var router = express.Router();


var jsonArray = [];
var projectJsonArray = [];

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "hacklahoma", // update me
      password: "nP3u0FEEpeyo" // update me
    },
    type: "default"
  },
  server: "hacklahoma-nsegf-sql-server.database.windows.net", // update me
  options: {
    database: "nsegf-db", //update me
    encrypt: true
  }
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    queryDatabase();
  }
});

async function queryDatabase(sqlString) {
  console.log("Reading rows from the Table...");

  // Read all rows from table
  const request = new Request(
    sqlString,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`${rowCount} row(s) returned`);
      }
    }
  );
  
  const x = request.on("row", columns => {
      const rowObject = {};
    columns.forEach(column => {
        rowObject[column.metadata.colName] = column.value;
        console.log("%s\t%s", column.metadata.colName, column.value);
    });
    projectJsonArray.push(rowObject);
  });

  request.on('doneProc', function(rowCount, more, returnStatus, rows) {
      console.log(rows)
  })
  connection.execSql(x);

  return projectJsonArray;
}


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("test");
    queryDatabase(`SELECT * FROM Users`)
      .then(function(value) {
      console.log('Async success!', value);
      res.json((value));
      jsonArray = [];
      })
      .catch(function(err) {
      console.log('Caught an error!', err);
    });
});

/* GET home page. */
router.get('/GET/allReports', function(req, res, next) {
/*
  queryDatabase("SELECT Project.pid, Project.pname, Project.majortag, Project.short_desc, Project.logo_url FROM Project")
  .then(function(value) {
  console.log('Async success!', value);
  res.json((value));
  projectJsonArray = [];
  })
  .catch(function(err) {
  console.log('Caught an error!', err);
});*/

let desc = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo"+
  "ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et"+
  "magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,"+
  "ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa"+
  "quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,"+
  "arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."+
  "Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras"+
  "dapibus.";
  let logo_url = 'https://react.semantic-ui.com/images/wireframe/image.png';
  let ext_url = 'github.com';
  let owner = 'jobv';
  res.json(
    [ 
      { 
        "pid":"1",
        "pname":"Project1",
        "short_desc":""+desc+"",
        "logo_url":""+logo_url+"",
        "main_cat":"Web Dev",
      },
      { 
        "pid":"2",
        "pname":"Project2",
        "short_desc":""+desc+"",
        "logo_url":""+logo_url+"",
        "main_cat":"Web Dev"
      },
      { 
        "pid":"3",
        "pname":"Project3",
        "short_desc":""+desc+"",
        "logo_url":""+logo_url+"",
        "main_cat":"Web Dev"
      },
      { 
        "pid":"4",
        "pname":"Project4",
        "short_desc":""+desc+"",
        "logo_url":""+logo_url+"",
        "main_cat":"Web Dev"
      },
      { 
        "pid":"5",
        "pname":"Project5",
        "short_desc":""+desc+"",
        "logo_url":""+logo_url+"",
        "main_cat":"Web Dev"
      },
      { 
        "pid":"6",
        "pname":"Project6",
        "short_desc":""+desc+"",
        "logo_url":""+logo_url+"",
        "main_cat":"Web Dev"
      },
      { 
        "pid":"7",
        "pname":"Project7",
        "short_desc":""+desc+"",
        "logo_url":""+logo_url+"",
        "main_cat":"Web Dev"
      },
    ])
  //res.json('[,{"pid
  
  //res.json('[,{"pid":"1","pname":"Project1","short_desc":"'+desc+'","logo_url":"'+logo_url+'"},{"pid":"1","pname":"Project1","short_desc":"'+desc+'","logo_url":"'+logo_url+'"},{"pid":"1","pname":"Project1","short_desc":"'+desc+'","logo_url":"'+logo_url+'"},{"pid":"1","pname":"Project1","short_desc":"'+desc+'","logo_url":"'+logo_url+'"},{"pid":"1","pname":"Project1","short_desc":"'+desc+'","logo_url":"'+logo_url+'"},{"pid":"1","pname":"Project1","short_desc":"'+desc+'","logo_url":"'+logo_url+'"}]');
});

/* GET home page. */
router.get('/GET/reportsWithFilters/:filters', function(req, res, next) {
  console.log("test");
  res.json(req.params);
});

/* GET home page. */
router.get('/GET/singleReport/:pid', function(req, res, next) {
  let desc = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo"+
  "ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et"+
  "magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,"+
  "ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa"+
  "quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,"+
  "arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."+
  "Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras"+
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo"+
  "ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et"+
  "magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,"+
  "ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa"+
  "quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,"+
  "arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."+
  "Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras\n\n\n"+
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo"+
  "ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et"+
  "magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,"+
  "ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa"+
  "quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,"+
  "arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."+
  "Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras"+
  "dapibus.";
  let logo_url = '/images/api.png';
  let ext_url = 'github.com';
  let pname = 'Web Based ASP.net';
  let owner = 'mathew';
  let catigories = ["Web Dev","beginner","c#"];
  let memberSize = '3';
  let members = ['matt', 'nan', 'jenny'];
  let ownerRating = '4';
  res.json(
    {
      "pid":req.params.pid,
      "desc":desc,
      "logo_url":logo_url,
      "ext_url":ext_url,
      "owner":owner,
      "pname":pname,
      "catigories":catigories,
      "member_size":memberSize,
      "members":members,
      "ownerRating":ownerRating
    }
  );
});

router.get('/GET/singleReportComments/:pid', function(req, res, next) {

  let userName = 'JobV';
  let userName1 = 'Lucas B';
  let userName2 = 'Alan lee';
  let userName3 = 'Grant S';
  let userName4 = 'Eric M';
  let dateCreated = 'Yesterday at 10:30 AM';
  let dateCreated1 = 'Yesterday at 1:40 PM';
  let dateCreated2 = 'Today at 1:00 AM';
  let dateCreated3 = 'Today at 2:00 AM';
  let dateCreated4 = 'Less Then an Hour Ago';
  let commentText = 'This Is a great Idea';
  let commentText1 = 'I like the way you think';
  let commentText2 = 'Could I be apart of this';
  let commentText3 = 'Looking forwad to seeing in in action!!';
  let commentText4 = 'Woot Woot !!';
  let user_url = 'https://react.semantic-ui.com/images/avatar/small/matt.jpg';
  let user_url1 = 'https://react.semantic-ui.com/images/avatar/small/joe.jpg';
  let user_url2 = 'https://react.semantic-ui.com/images/avatar/small/nan.jpg';
  let user_url3 = 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg';
  let user_url4 = 'https://react.semantic-ui.com/images/avatar/small/ade.jpg';
  res.json([
    {
      "userName":userName,
      "dateCreated":dateCreated,
      "commentText":commentText,
      "user_url":user_url
    },
    {
      "userName":userName1,
      "dateCreated":dateCreated2,
      "commentText":commentText1,
      "user_url":user_url1
    },
    {
      "userName":userName2,
      "dateCreated":dateCreated3,
      "commentText":commentText2,
      "user_url":user_url2
    },
    {
      "userName":userName3,
      "dateCreated":dateCreated4,
      "commentText":commentText3,
      "user_url":user_url3
    },
    {
      "userName":userName4,
      "dateCreated":dateCreated1,
      "commentText":commentText4,
      "user_url":user_url4
    }
  ]
  );
});

module.exports = router;



// ---------------------------------------------------
// const { Connection, Request } = require("tedious");
// var express = require('express');
// var router = express.Router();


// var jsonArray = [];

// // Create connection to database
// const config = {
//   authentication: {
//     options: {
//       userName: "hacklahoma", // update me
//       password: "nP3u0FEEpeyo" // update me
//     },
//     type: "default"
//   },
//   server: "hacklahoma-nsegf-sql-server.database.windows.net", // update me
//   options: {
//     database: "nsegf-db", //update me
//     encrypt: true
//   }
// };

// const connection = new Connection(config);

// // Attempt to connect and execute queries if connection goes through
// connection.on("connect", err => {
//   if (err) {
//     console.error(err.message);
//   } else {
//     queryDatabase();
//   }
// });

// async function queryDatabase() {
//   console.log("Reading rows from the Table...");

//   // Read all rows from table
//   const request = new Request(
//     `SELECT * FROM Users`,
//     (err, rowCount) => {
//       if (err) {
//         console.error(err.message);
//       } else {
//         console.log(`${rowCount} row(s) returned`);
//       }
//     }
//   );

//   request.on("row", columns => {
//     const rowObject = {};
//     columns.forEach(column => {
//         rowObject[column.metadata.colName] = column.value;
//         console.log("%s\t%s", column.metadata.colName, column.value);
//     });
//     jsonArray.push(rowObject);
//     console.log(jsonArray);
//   });

//   return jsonArray;
// }

// router.use('/', function(req, res, next) {
//     console.log("used .... well used");
//     queryDatabase()
//       .then(function(value) {
//       console.log('Async success!', value);
//       })
//       .catch(function(err) {
//       console.log('Caught an error!', err);
//     });
//     next();
// });

// /* GET home page. */
// router.get('/', function(req, res, next) {
//     console.log("test");
//     console.log(jsonArray)
//     res.render('index', { title: jsonArray });
// });

// module.exports = router;