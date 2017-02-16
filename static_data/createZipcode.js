var XLSX = require('xlsx');
var stringFormat = require('stringformat');
var fs = require('fs');
var csv = require('csvtojson');

var workbook = XLSX.readFile('loan-limit-table.xls')
var first_sheet_name = workbook.SheetNames[1];
var worksheet = workbook.Sheets[first_sheet_name];
var  limit = {};
for (var i = 2; i < 3235; i++) {
    var countyCode = 'C' + i;
    var countyLimit1 = 'G' + i;
    var countyLimit2 = 'H' + i;
    var countyLimit3 = 'I' + i;
    var countyLimit4 = 'J' + i;
    var code = worksheet[countyCode].v.replace(/\b0+/g, '');
    limit[code] = {limit1: worksheet[countyLimit1].v, limit2: worksheet[countyLimit2].v, limit3: worksheet[countyLimit3].v, limit4: worksheet[countyLimit4].v};
}

var zipCountyMap = JSON.parse(fs.readFileSync('zip-county-map.txt', 'utf8'));
var limitZipMap = {};
for (var key in zipCountyMap) {
    var countyLimit = limit[zipCountyMap[key]] || {};
    limitZipMap[key] = {code: key, limit1: countyLimit.limit1, limit2: countyLimit.limit2, limit3: countyLimit.limit3, limit4: countyLimit.limit4}

}
stringFormat.extendString();

var zipStateCityMap = {};
csv({noheader:true})
    .fromFile('zipcodes.csv', 'utf8')
    .on('csv',function (csvRow) {
        zipStateCityMap[csvRow[0]] = {city: csvRow[1], state: csvRow[2]};
    })
    .on('done',function() {
        var toFile = [];
        for (var key in limitZipMap) {
            toFile.push('INSERT INTO Zipcode(code, city, state, limit1, limit2, limit3, limit4) VALUES ({0}, \'{1}\', \'{2}\', {3}, {4}, {5}, {6});'.format(key, zipStateCityMap[key].city, zipStateCityMap[key].state,
                limitZipMap[key].limit1, limitZipMap[key].limit2, limitZipMap[key].limit3, limitZipMap[key].limit4))

        }

        var file = fs.createWriteStream('../sql/zipcodeTable.sql');
        file.on('error', function(err) {});
        toFile.forEach(function(v) { file.write(v + '\n'); });
        file.end();
    });
