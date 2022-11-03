// 네이버 검색 API 예제 - 블로그 검색
var express = require('express');
const path = require('path')
var app = express();
var client_id = '1s86fM5jcJ6PbWHDdblu';
var client_secret = 'nD_YhAtXg7';

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');

app.use(express.json()) // body-parser효과
app.use(express.urlencoded({extended:false}))

 app.get('/map',(req,res)=> {
    res.render('map.ejs')

})

app.get('/search', (req,res)=> {
    res.render('search.ejs')
})

app.post('/search',(req,res)=> {
    const title = req.body.title
    console.log(title)
    //let data;
    var api_url = 'https://openapi.naver.com/v1/search/local?query=' + encodeURI(title) + '&display=5&start=1'; // JSON 결과
    var request = require('request');
    var options = {
       url: api_url,
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const bodys = JSON.parse(body)
            console.log(bodys)
            
            res.render('map.ejs', {data: bodys})
        } else {
          res.status(response.statusCode).end();
          console.log('error = ' + response.statusCode);
        }
    });
})
 app.listen(3000, function () {
   console.log('http://127.0.0.1:3000/search app listening on port 3000!');
 });
//https://openapi.naver.com/v1/search/local.json

// search.ejs에서 검색을 서울 갈비 이렇게 검색하면 일단 url로 보내야하나? 
//-> 그리고 거기서 주소만 가져와서 map.ejs에 전달
// 그 후 map.ejs는 그 부분을 핑으로 보여주기

/**
 * 
 app.get('/search/local', function (req, res) {
   var api_url = 'https://openapi.naver.com/v1/search/local?query=' + encodeURI(req.query.query); // JSON 결과
//   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // XML 결과
   var request = require('request');
   var options = {
       url: api_url,
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
   request.get(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
 });
 * 
 */