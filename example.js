const fs = require('fs');
const path = require('path');
const { CSVtoJSON, CSVtoJSONSync } = require('./src/csv-to-json');

//
// Functions
//

/**
 * Create file with content
 */
const writeFile = (fileName, content) => {
    fs.writeFile(path.join(__dirname, fileName), content, (error, data) => {
        if(error) return console.error('Got error:', error);
        console.log('File created successfully!')
    });
}

/**
 * Convert CSV to JSON asynchronously and export to a file
 */
const convertToJsonFile = (inputFile, outputFile) => {
    CSVtoJSON(path.join(__dirname, inputFile), (jsonArray) => {
        writeFile(outputFile, JSON.stringify(jsonArray));
    });
}

/**
 * Convert CSV to JSON synchronously and export to a file
 */
const convertToJsonFileSync = (inputFile, outputFile) => {
    const jsonData = JSON.stringify(CSVtoJSONSync(path.join(__dirname, inputFile)));
    writeFile(outputFile, jsonData);
}

//
// Run
//
convertToJsonFile('customer-data.xls', 'output/customer-data-async.json');

convertToJsonFileSync('customer-data.xls', 'output/customer-data-sync.json');
