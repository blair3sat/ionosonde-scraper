const cheerio = require("cheerio");
const request = require("request");
const moment = require("moment")
const btoa = require("btoa");
now = new moment();
const cubesatURL = "https://www.ukssdc.ac.uk/cgi-bin/digisondes/cost_database.pl"
const postbinURL = "http://postb.in/BZWZlXK5"

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

sma = now.subtract(6, "months");
allSelects = [
  ['at138', 'Athens'],
  ['rl052', 'Chilton'],
  ['db049', 'Dourbes'],
  ['ea036', 'El Arenosillo'],
  ['gm037', 'Gibilmanna'],
  ['jr055', 'Juliusruh'],
  ['le061', 'Lerwick'],
  ['lg178', 'Longyearbyen'],
  ['ly164', 'Lycksele'],
  ['mo155', 'Moscow'],
  ['pq052', 'Pruhonice'],
  ['ro041', 'Rome'],
  ['sd266', 'Salekhard'],
  ['psj5j', 'Stanley'],
  ['thj77', 'Thule (Qanaq)'],
  ['eb040', 'Tortosa'],
  ['tr169', 'Tromso'],
  ['mz152', 'Warsaw']
];
info = {
  method: "post",
  url: cubesatURL,
  headers: {
    'Authorization': 'Basic ' + btoa('ryan.tse@blair3sat.com:'),
    'content-type': 'application/x-www-form-urlencoded',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'user-agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0',
    'connection': 'close'
  },
  form: {
    'retrieve': 'Retrieve data',
    'ursi': 'at138',
    'datetype': 'range',
    'syear': sma.get("year") /*.toString()*/ ,
    'smonth': sma.get("month") /*.toString()*/ ,
    'sday': sma.get("month") /*.toString()*/ ,
    'shour': sma.get("hour") /*.toString()*/ ,
    'sminute': sma.get("minute") /*.toString()*/ ,
    'ssecond': sma.get("second") /*.toString()*/ ,
    'eyear': now.get("year") /*.toString()*/ ,
    'emonth': now.get("month") /*.toString()*/ ,
    'eday': now.get("date") /*.toString()*/ ,
    'ehour': now.get("hour") /*.toString()*/ ,
    'eminute': now.get("minute") /*.toString()*/ ,
    'esecond': now.get("second") /*.toString()*/ ,
    'repeat': 'no',
    'offset': '0',
    'type': 'NHPC_Profiles',
    'sort': 'Time',
    'destination': 'File'
  },
  json: true
}
all_urls = []
count = 0;
console.log(allSelects.length);
for (i in allSelects) {
  info.form.ursi = allSelects[i][0];
  let name = allSelects[i][1];
  request.post(info, (err, response, html) => {
    if (!err) {
      let $ = cheerio.load(html);
      let thePre = $("pre").eq(0);
      let ftpLink = $("pre").children("a").attr("href");
      all_urls.push([name, (ftpLink ? ftpLink.substr(-5) : undefined)]);
      console.log(count);
      count++;
      if (all_urls.length == allSelects.length) {
        console.log(all_urls);
        queryURLs(() => {
          console.log(all_urls);

        }, 0);
      }
    } else {
      console.error(err)
    }
  });
}
// } else {
//   queryURLs(() => {
//     console.log(all_urls)
//   }, 0);
// }

function queryURLs(callback, countThing) {
  if (countThing < all_urls.length) {
    if (all_urls[countThing][1] == undefined) {
      rl.question(all_urls[countThing][0] + ": ", (ans) => {
        all_urls[countThing][1] = ans;

        queryURLs(callback, countThing + 1);
      })
    } else {
      queryURLs(callback, countThing + 1);
    }
  } else {
    callback();
    rl.close();
  }
}