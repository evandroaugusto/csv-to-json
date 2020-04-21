const fs = require('fs');

/**
 * Create an array of objects from CSV structure
 * 
 * @param {array} rows
 */
const createJson = (rows) => {
    const header = rows.shift().split(',');

    // convert rows to json
    jsonArray = rows.map((line) => {
        let obj = {};
        let row = line.split(',');

        header.forEach((attr, index) => {
            obj[attr] = row[index];
        });

        return obj;
    });

    return jsonArray;
}

/**
 * Convert CSV file to Json asynchronously
 * 
 * @param {string} fileName 
 * @param {string} convertCallback 
 */
const CSVtoJSON = ((fileName, convertCallback) => {
  const readCSV = (fileName, readCallback) => {
      fs.readFile(fileName, (error, data) => {
          if(error) return console.error('Got error:', error);
          readCallback(data.toString());
      });
  }

  // read CSV file
  readCSV(fileName, (content) => {
      const csvRows = content.split(/\r?\n/); 

      jsonArray = createJson(csvRows);
      
      convertCallback(jsonArray);
  })
});

/**
 * Convert CSV file to Json synchronously
 * 
 * @param {string} fileName 
 */
const CSVtoJSONSync = (fileName => {
    const csvFile = fs.readFileSync(fileName).toString();
    let jsonArray = [];

    const csvRows = csvFile.split(/\r?\n/); 
    
    // convert csv rows to json object
    jsonArray = createJson(csvRows);

    return jsonArray;
});


exports.CSVtoJSON = CSVtoJSON;
exports.CSVtoJSONSync = CSVtoJSONSync;
