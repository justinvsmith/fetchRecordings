require('dotenv').config();

let fs = require('fs');
let writeStream = fs.createWriteStream(`${__dirname}/recordings.csv`);


const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

async function recordingInfo() {
    let info = [["Date Created", "Call Sid", "Media Url"]];
    await client.recordings
                                .list({dateCreatedAfter: '2022-01-01', 
                                        dateCreatedBefore: '2022-02-01'})
                                .then(recordings => recordings.forEach(r => {
                                    info.push([r.dateCreated, r.callSid, r.mediaUrl])
                                }))
                    return info.join('\n');
}

async function writetofile(newLine){
    writeStream.write(newLine, () => {
        // a line was written to stream
    })
}

async function makeCsv() {
    let rowInfo = await recordingInfo();
    writetofile(rowInfo);
}

makeCsv();
