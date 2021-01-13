
var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser')
var session = require('express-session')
const port = process.env.PORT || 3000;

// var redisStore= require('connect-redis')(session);
// var redis = require('redis')
// var client = redis.createClient();

// var usersJson = require('./../users.json');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    secret:'alihisham',
    resave:false,
    saveUninitialized:true

}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
    
res.render('login',{message:""})}
);
app.get('/home',function(req,res){
    if(req.session.user==null){
        res.redirect('/')
    }else{
    res.render('home')}
    });
app.get('/registration',function(req,res){
    
        res.render('registration',{message:""})
        });
app.get('/leaves',function(req,res){
    if(req.session.user==null){
        res.redirect('/')
    }else{
    res.render('leaves',{message:""})}
    });
app.get('/dune',function(req,res){
    if(req.session.user==null){
        res.redirect('/')
    }else{
        res.render('dune',{message:""})}
    });
app.get('/fiction',function(req,res){
    if(req.session.user==null){
        res.redirect('/')
    }else{
        res.render('fiction')}
        });    
app.get('/flies',function(req,res){
    if(req.session.user==null){
        res.redirect('/')
    }else{
        res.render('flies',{message:""})}
        });        
app.get('/grapes',function(req,res){
    if(req.session.user==null){
        res.redirect('/')
    }else{
            res.render('grapes',{message:""})}
            });
app.get('/index',function(req,res){
         res.render('index')
});
app.get('/mockingbird',function(req,res){
    if(req.session.user==null){
        res.redirect('/')
    }else{
    res.render('mockingbird',{message:""})}
});
app.get('/novel',function(req,res){
    if(req.session.user==null){
        res.redirect('/')
    }else{
    res.render('novel')}
});
app.get('/poetry',function(req,res){
    if(req.session.user==null){
        res.redirect('/')
    }else{
    res.render('poetry')}
});
app.get('/sun',function(req,res){
    if(req.session.user==null){
        res.redirect('/')
    }else{
    res.render('sun',{message:""})}
});
app.get('/searchresults',function(req,res){
    if(req.session.user==null){
        res.redirect('/')
    }else{
    res.render('searchresults')}
});



app.get('/readlist',function(req,res){
    if(req.session.user==null){
        res.redirect('/')
    }else{
    var array= req.session.user.toReadList;
    res.render('readlist',{array})}
});



app.post('/register',function(req,res){
    var name = req.body.username;
    var pass = req.body.password;
    if(addUser(name,pass)){
        res.render('login',{message:"Your account has been successfully registered to our website!"})
    }else{
        res.render('registration',{message:"This username has already been used, Please try a different username"})
    }
    });
app.post('/login',function(req,res){
    var name = req.body.username;
    var pass = req.body.password;
    var flag = false;
    var user
    const users=loadUsers()
    {
        for(var i=0;i<users.length;i++){
            if(users[i].username===name&&users[i].password===pass){
                user=users[i];
                flag=true;
            }
        }
        if(flag){
            res.redirect('home')
            req.session.user=user
            req.session.save();
        }else{
        res.render('login',{message:"Invalid Username or password"})

        }
        
     }     
})

// app.post('/readlist',function(req,res){
//     array = req.session.user.list

// })


app.post('/search',function(req,res){
    var x= req.body.Search
    var books = [{name:'Grapes of Wrath',link:'./grapes.jpg',href:'/grapes'}
    ,{name:'The sun and her flowers',link:'./sun.jpg',href:'/sun'}
    ,{name:'To kill a mockingbird',link:'./mockingbird.jpg',href:'/mockingbird'}
    ,{name:'Leaves of grass',link:'./leaves.jpg',href:'/leaves'}
    ,{name:'Lord of the flies',link:'./flies.jpg',href:'/flies'}
    ,{name:'Dune',link:'./dune.jpg',href:'/dune'}]
    var result=[]
    for(var i=0;i<books.length;i++){
        if(books[i].name.includes(x)){
            result.push(books[i])
        }
    }
   
    res.render('searchresults',{result})
    
})  

app.post('/addDune',function(req,res){
    var found = false;
    for(var i=0;i<req.session.user.toReadList.length;i++){
        console.log(req.session.user.toReadList[i])
    if(req.session.user.toReadList[i].name==='Dune'){
        console.log(req.session.user.toReadList[i].name)
        found =true;
    }
    }
    if(found){
        var message = "Book is already on your to read list"
        res.render('dune',{message})
    }else{
        req.session.user.toReadList.push({name:'Dune',link:'./dune.jpg',href:'/dune'})
        const users = loadUsers()
        for(var i=0;i<users.length;i++){
            if(users[i].username===req.session.user.username){
                users[i].toReadList.push({name:'Dune',link:'./dune.jpg',href:'/dune'})
            }
        }
        saveUsers(users)
        var message= "Book added successfully"
        res.render('dune',{message})
    }
}
)


app.post('/addGrapes',function(req,res){
    var found = false;
    for(var i=0;i<req.session.user.toReadList.length;i++){
        console.log(req.session.user.toReadList[i])
    if(req.session.user.toReadList[i].name==='Grapes of Wrath'){
        console.log(req.session.user.toReadList[i].name)
        found =true;
    }
    }
    if(found){
        var message = "Book is already on your to read list"
        res.render('grapes',{message})
    }else{
        req.session.user.toReadList.push({name:'Grapes of Wrath',link:'./grapes.jpg',href:'/grapes'})
        const users = loadUsers()
        for(var i=0;i<users.length;i++){
            if(users[i].username===req.session.user.username){
                users[i].toReadList.push({name:'Grapes of Wrath',link:'./grapes.jpg',href:'/grapes'})
            }
        }
        saveUsers(users)
        var message= "Book added successfully"
        res.render('grapes',{message})
    }

}


)

app.post('/addSun',function(req,res){
    var found = false;
    for(var i=0;i<req.session.user.toReadList.length;i++){
        console.log(req.session.user.toReadList[i])
    if(req.session.user.toReadList[i].name==='The sun and her flowers'){
        console.log(req.session.user.toReadList[i].name)
        found =true;
    }
    }
    if(found){
        var message = "Book is already on your to read list"
        res.render('sun',{message})
    }else{
        req.session.user.toReadList.push({name:'The sun and her flowers',link:'./sun.jpg',href:'/sun'})
        const users = loadUsers()
        for(var i=0;i<users.length;i++){
            if(users[i].username===req.session.user.username){
                users[i].toReadList.push({name:'The sun and her flowers',link:'./sun.jpg',href:'/sun'})
            }
        }
        saveUsers(users)
        var message= "Book added successfully"
        res.render('sun',{message})
    }
}
)
app.post('/addBird',function(req,res){
    var found = false;
    for(var i=0;i<req.session.user.toReadList.length;i++){
        console.log(req.session.user.toReadList[i])
    if(req.session.user.toReadList[i].name==='To kill a mockingbird'){
        console.log(req.session.user.toReadList[i].name)
        found =true;
    }
    }
    if(found){
        var message = "Book is already on your to read list"
        res.render('mockingbird',{message})
    }else{
        req.session.user.toReadList.push({name:'To kill a mockingbird',link:'./mockingbird.jpg',href:'/mockingbird'})
        const users = loadUsers()
        for(var i=0;i<users.length;i++){
            if(users[i].username===req.session.user.username){
                users[i].toReadList.push({name:'To kill a mockingbird',link:'./mockingbird.jpg',href:'/mockingbird'})
            }
        }
        saveUsers(users)
        var message= "Book added successfully"
        res.render('mockingbird',{message})
    }
}
)
app.post('/addFlies',function(req,res){
    var found = false;
    for(var i=0;i<req.session.user.toReadList.length;i++){
        console.log(req.session.user.toReadList[i])
    if(req.session.user.toReadList[i].name==='Lord of the flies'){
        console.log(req.session.user.toReadList[i].name)
        found =true;
    }
    }
    if(found){
        var message = "Book is already on your to read list"
        res.render('flies',{message})
    }else{
        req.session.user.toReadList.push({name:'Lord of the flies',link:'./flies.jpg',href:'/flies'})
        const users = loadUsers()
        for(var i=0;i<users.length;i++){
            if(users[i].username===req.session.user.username){
                users[i].toReadList.push({name:'Lord of the flies',link:'./flies.jpg',href:'/flies'})
            }
        }
        saveUsers(users)
        var message= "Book added successfully"
        res.render('flies',{message})
    }
}
)
app.post('/addLeaves',function(req,res){
    var found = false;
    for(var i=0;i<req.session.user.toReadList.length;i++){
        console.log(req.session.user.toReadList[i])
    if(req.session.user.toReadList[i].name==='Leaves of grass'){
        console.log(req.session.user.toReadList[i].name)
        found =true;
    }
    }
    if(found){
        var message = "Book is already on your to read list"
        res.render('leaves',{message})
    }else{
        req.session.user.toReadList.push({name:'Leaves of grass',link:'./leaves.jpg',href:'/leaves'})
        const users = loadUsers()
        for(var i=0;i<users.length;i++){
            if(users[i].username===req.session.user.username){
                users[i].toReadList.push({name:'Leaves of grass',link:'./leaves.jpg',href:'/leaves'})
            }
        }
        saveUsers(users)
        var message= "Book added successfully"
        res.render('leaves',{message})
    }
}
)




const loadUsers = function(){
    try{
     const dataBuffer= fs.readFileSync('users.json')
     const dataJSON = dataBuffer.toString()
     return JSON.parse(dataJSON)
    }catch(e){
     return []
    }
 
 }
 const saveUsers = function(user){
    const dataJSON = JSON.stringify(user)
    fs.writeFileSync('users.json',dataJSON)
}

const addUser = function(userN,passW){
    const users= loadUsers()
    const duplicateUsers = users.filter(function(user){
    return user.username === userN;   
})

    if(duplicateUsers.length === 0){
        users.push({
            username: userN,
            password: passW,
            toReadList:[]
        })
        saveUsers(users)
        return true;
    }else{
        return false;
        }
 
}


// const books = ['flies','grapes','sun','leaves','mockingbird','dune']


// JSON.stringify();

// fs.writeFileSync("users.json",y);
// var data = fs.readFileSync("users.json");
app.listen(port);