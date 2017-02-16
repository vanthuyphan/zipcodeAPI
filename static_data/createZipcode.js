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

var countyCodeMap = JSON.parse(fs.readFileSync('county-code-map.txt', 'utf8'));
var lines = fs.readFileSync('FHA-limit.txt').toString().split("\n");
var fhaLimits = {};
for (var i = 0 ; i < lines.length; i++) {
    var line = lines[i];
    var code = line.substring(103, 106);
    var state = line.substring(106, 132).trim();
    var countyCode = countyCodeMap[code + state];
    var limit1 = line.substring(74, 80);
    var limit2 = line.substring(81, 87);
    var limit3 = line.substring(88, 94);
    var limit4 = line.substring(95, 101);
    fhaLimits[countyCode] = {limit1: limit1,  limit2: limit2, limit3: limit3, limit4: limit4}

}
for (var key in zipCountyMap) {
    var countyLimit = limit[zipCountyMap[key]] || {};
    var FHALImit = fhaLimits[zipCountyMap[key]] || {};
    limitZipMap[key] = {code: key, limit1: countyLimit.limit1, limit2: countyLimit.limit2, limit3: countyLimit.limit3, limit4: countyLimit.limit4,
    FHALimit1: FHALImit.limit1, FHALimit2: FHALImit.limit2, FHALimit3: FHALImit.limit3, FHALimit4: FHALImit.limit4}

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
            var limitZipMap2 = limitZipMap[key];
            toFile.push('INSERT INTO Zipcode(code, city, state, limit1, limit2, limit3, limit4, FHALimit1, FHALimit2, FHALimit3, FHALimit4) VALUES ({0}, \'{1}\', \'{2}\', {3}, {4}, {5}, {6}, {7}, {8}, {9}, {10});'.format(key, zipStateCityMap[key].city, zipStateCityMap[key].state,
                limitZipMap2.limit1, limitZipMap2.limit2, limitZipMap2.limit3, limitZipMap2.limit4,
                limitZipMap2.FHALimit1, limitZipMap2.FHALimit2, limitZipMap2.FHALimit3, limitZipMap2.FHALimit4))
        }

        var file = fs.createWriteStream('../sql/zipcodeTable.sql');
        file.on('error', function(err) {});
        toFile.forEach(function(v) { file.write(v + '\n'); });
        file.end();
    });
