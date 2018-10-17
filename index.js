const cheerio = require("cheerio");
const request = require("request-promise");
const moment = require("moment")
now = new moment();
allSelects=[['at138', 'Athens'], ['rl052', 'Chilton'], ['db049', 'Dourbes'], ['ea036', 'El Arenosillo'], ['gm037', 'Gibilmanna'], ['jr055', 'Juliusruh'], ['le061', 'Lerwick'], ['lg178', 'Longyearbyen'],
['ly164', 'Lycksele'], ['mo155', 'Moscow'], ['pq052', 'Pruhonice'], ['ro041', 'Rome'], ['sd266', 'Salekhard'], ['psj5j', 'Stanley'], ['thj77', 'Thule (Qanaq)'],
['eb040', 'Tortosa'], ['tr169', 'Tromso'], ['mz152', 'Warsaw']];
sixMonthsBack = now.subtract(6, "months");
info={method:"post",uri:"https://www.ukssdc.ac.uk/cgi-bin/digisondes/cost_database.pl",headers:{ 'Authorization': 'Basic ' + btoa('ryan.tse@blair3sat.com:') },body:{ 'retrieve': 'Retrieve data', 'ursi': 'at138', 'datetype': 'range', 'syear': sma.get("year"), 'smonth': sma.get("month"),
'sday': sma.get("month"), 'shour': sma.get("hour"), 'sminute': sma.get("minute"), 'ssecond': sma.get("second"), 'eyear': now.get("year"), 'emonth': now.get("month"), 'eday': now.get("date"),
 'ehour': now.get("hour"), 'eminute': now.get("minute"), 'esecond': now.get("second"), 'repeat': 'no', 'offset': '0', 'type': 'NHPC_Profiles', 'sort': 'Time', 'destination': 'File' }}
all_urls=[]
for (i in allSelects) {
    info.body.ursi=allSelects[i];

    request(info).then((err,response,html)=>{
      let $=cheerio.load(html);
      let ftpLink=$("pre a").attr("href");
      all_urls.push([allSelects[i],ftpLink]);
      if(all_urls.length==allSelects.length){
        console.log(all_urls);
      }
    })
}
