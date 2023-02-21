require('dotenv').config();

let fs = require('fs');
// let writeStream = fs.createWriteStream(`${__dirname}/recordings.csv`);
let fileCount = Math.floor(10 + Math.random() * 90);

let startDate = process.env.START_DATE;
let endDate = process.env.END_DATE;


const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

async function recordingInfo() {
    let info = [["Date Created", "Call Sid", "Media Url"]];
    await client.recordings
                                .list({dateCreatedAfter: startDate, 
                                        dateCreatedBefore: endDate})
                                .then(recordings => recordings.forEach(r => {
                                    info.push([r.dateCreated, r.callSid, r.mediaUrl])
                                }))
                    return info.join('\n');
}

async function writetofile(newLine){



    if(fs.existsSync(`${__dirname}/${startDate}_recordings_${fileCount}.csv`)) {
        fileCount++;
        fs.createWriteStream(`${__dirname}/${startDate}_recordings_${fileCount}.csv`).write(newLine, () => {
            // a line was written to stream
        })


    } else {fs.createWriteStream(`${__dirname}/${startDate}_recordings_${fileCount}.csv`).write(newLine, () => {
        // a line was written to stream
    })



    
}
}

async function makeCsv() {
    let rowInfo = await recordingInfo();
    writetofile(rowInfo);
}

makeCsv();
