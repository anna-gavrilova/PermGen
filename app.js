const express = require('express')
var fs = require('fs');
const {shell,BrowserWindow,remote} = require('electron');
const url=require('url');
//const generator=require('./generator.js')
//var Combinatorics = require('./node_modules/js-combinatorics');
const test=require('./test.js')
const app = express()
var path    = require("path");
const port = 3030;
var windowsHandler=require('./main.js');

app.use(express.static(path.join(__dirname, 'public')));
app.get('/index', function (req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')});
});
app.get('/wait.html', function (req, res) {
  res.sendFile('wait.html', {root: path.join(__dirname, 'public')});
});


app.get('/generate', function(req, res) {


  
    var theUrl = 'file://' + __dirname + '/public/wait.html'
    //win.loadURL(theUrl);
    // asdads.asdasd( result => test.calculate(data,input,fs,path,out))
    windowsHandler.urlLoad(theUrl,callback);

  function callback(){
    console.log('ready');
    var query=req.query;
  //res.json(query);
  var data=getData(1,query);//multidimensional array of data from the table
  var input=test.getInput(req.query.numInput);
  
  //Is there any way you could create a buffer and write to buffer
  //instead of writeFileSync?
  var out = path.join(__dirname,'/res/output.txt');
  fs.writeFileSync(out, '');
  test.calculate(data,input,fs,path,out, function(){
    //console.log(test.calculate(data,input,Combinatorics));
    //res.write(JSON.stringify(test.calculate(data,input)));
    res.redirect('result.html');

    //win.hide();
    
    //win.hide();
    console.log('complete');
    res.on('finish',function(){
      shell.openItem(path.join(__dirname,"/res/output.txt"));
      windowsHandler.winHide();
    })
    res.end("Success");
  });

  }
   

    
      
     
  
    
	
  

 
	

   
   
  function getData(groupAmt,query){

            var groupData=[];
            var groupsAmt=groupAmt;
            for(i=0;i<groupsAmt;i++){
            	var tempe="even"+i;
            	var tempo="odd"+i;
                var even=query[tempe];
                var odd=query[tempo];
                groupData.push([even,odd]);
            }
            
            return groupData;
        }

});



app.get('/result.html',function(req,res){
 
  res.sendFile(path.join(__dirname+'/result.html'));


});
// app.post('/generate', function(req, res) {
//   res.write(req.tryme.value);
//   res.end();
// });

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})




