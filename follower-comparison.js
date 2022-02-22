const { Console, time } = require('console');
const fs = require('fs');
const csv = require('csv-parser');
console.log("Script created by: Cerbion (cerbion.net)");
console.log("=====================");
console.log("Available commands: compare <fileA> <fileB> | quit");

// Instance readline
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ''
});


// Console Logic
readline.on('line', (line) => {
    var cmd = line.split(` `);
    switch (cmd[0]) {
        case 'compare':
            if(cmd[1] && cmd[1].length > 0 && cmd[2] && cmd[2].length > 0)
            {
                CompareFiles(cmd[1], cmd[2]);
            }
            else
                console.log(`Please specify two files like this: compare path\\to\\file.csv path\\to\\file.csv (relative paths can be used)`);
            break;
        case 'quit':
        case 'stop':
        case 'exit':
        case 'q':
            console.log(`> Twitch Follower Comparison Script terminated.`);
            process.exit();
            break;
        default:
            console.log(`> No command found called "${cmd[0]}"`);
    }
});


async function CompareFiles(fileA, fileB)
{
    console.log("=====================");
    if (!fs.existsSync(fileA) || !fs.existsSync(fileB))
    {
        console.log("ERROR: One or both files are missing!");
        return;
    }

    // Collect uniques
    console.log("Checking " + fileA + "...");
    const csvDataA = await GetCSVData(fileA);
    console.log("Checking " + fileB + "...");
    const csvDataB = await GetCSVData(fileB);

    var listA = [], listB = [], listShared = [], diffA = [], diffB = [], renames = [];
    var nameDict = {};

    console.log("=====================");
    csvDataA.forEach(element => {
        listA.push(element.userID);
        if(!(element.userID in nameDict))
            nameDict[element.userID] = element.userName;
    });
    csvDataB.forEach(element => {
        listB.push(element.userID);
        if (!(element.userID in nameDict))
            nameDict[element.userID] = element.userName;
        else if(nameDict[element.userID] != element.userName)
            renames.push(nameDict[element.userID] + " -> " + element.userName);
    });

    listA.forEach(element => {
        if(listB.includes(element))
            listShared.push(element);
        else
            diffA.push(element);
    });

    listB.forEach(element => {
        if(!listA.includes(element))
        {
            diffB.push(element);
        }
    });

    console.log(`Follower difference: +${diffB.length} | -${diffA.length} | unchanged: ${listShared.length}`);
    console.log("Renames:");
    renames.forEach(element => {
        console.log("    " + element);
    })
    console.log("\nLost Followers:");
    diffA.forEach(element => {
        console.log("    " + nameDict[element]);
    })
    console.log("\nNew Followers:");
    diffB.forEach(element => {
        console.log("    " + nameDict[element]);
    })

}

function GetCSVData(path)
{
    // Retrieve CSV Data from File
    return new Promise(resolve => {
        const records = [];
        fs.createReadStream(path)
            .pipe(csv())
            .on('data', (row) => {
                records.push(row);
            })
            .on('end', () => {
                console.log(records.length + " entries parsed!");
                resolve(records);
            });
    });
}