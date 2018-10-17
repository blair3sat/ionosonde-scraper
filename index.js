const cheerio = require("cheerio");
const request = require("request");
const moment = require("moment")
const btoa=require("btoa");
now = new moment();
sma=now.subtract(6,"months");
allSelects=[['at138', 'Athens'], ['rl052', 'Chilton'], ['db049', 'Dourbes'], ['ea036', 'El Arenosillo'], ['gm037', 'Gibilmanna'], ['jr055', 'Juliusruh'], ['le061', 'Lerwick'], ['lg178', 'Longyearbyen'],
['ly164', 'Lycksele'], ['mo155', 'Moscow'], ['pq052', 'Pruhonice'], ['ro041', 'Rome'], ['sd266', 'Salekhard'], ['psj5j', 'Stanley'], ['thj77', 'Thule (Qanaq)'],
['eb040', 'Tortosa'], ['tr169', 'Tromso'], ['mz152', 'Warsaw']];
info={method:"post",url:"https://www.ukssdc.ac.uk/cgi-bin/digisondes/cost_database.pl",headers:{ 'Authorization': 'Basic ' + btoa('ryan.tse@blair3sat.com:') },body:{ 'retrieve': 'Retrieve data', 'ursi': 'at138', 'datetype': 'range', 'syear': sma.get("year").toString(), 'smonth': sma.get("month").toString(),
'sday': sma.get("month").toString(), 'shour': sma.get("hour").toString(), 'sminute': sma.get("minute").toString(), 'ssecond': sma.get("second").toString(), 'eyear': now.get("year").toString(), 'emonth': now.get("month").toString(), 'eday': now.get("date").toString(),
 'ehour': now.get("hour").toString(), 'eminute': now.get("minute").toString(), 'esecond': now.get("second").toString(), 'repeat': 'no', 'offset': '0', 'type': 'NHPC_Profiles', 'sort': 'Time', 'destination': 'File' },json:true}
all_urls=[]
console.log(info.body);
for (i in allSelects) {
    info.body.ursi=allSelects[i][0];
    console.log(info.body.ursi);
    request(info,(err,response,html)=>{
      if(!err){
      // let $=cheerio.load(html);
      // console.log(html);
      // let thePre=$("pre").eq(0);
      // console.log(thePre.html());
      // let ftpLink=$("pre").children("a").attr("href");
      // all_urls.push([allSelects[i][1],ftpLink]);
      // if(all_urls.length==allSelects.length){
      //   console.log(all_urls);
      // }
    }
    else{console.error(err)}
    });
}
