const digitalocean = require('digitalocean');
const https = require('https');

const ipLookupUrl = 'https://ipinfo.io/ip';
const token = process.env.TOKEN;
const domainName = process.env.DOMAIN_NAME;
const aRecord = process.env.A_RECORD;

if (token == null) {
    throw "TOKEN environment variable not set"
}

if (domainName == null) {
    throw "DOMAIN_NAME environment variable not set"
}

if (aRecord == null) {
    throw "A_RECORD environment variable not set"
}

let client = digitalocean.client(token);

const getRecordAttributes = (publicIP) => {
    return {
        "type": "A",
        "name": aRecord,
        "data": publicIP,
        "priority": null,
        "port": null,
        "ttl": 1800,
        "weight": null,
        "flags": null,
        "tag": null
    };
};

const createRecord = (publicIP) => {
    const attributes = getRecordAttributes(publicIP);

    console.log(`Creating record with the following attributes for ${aRecord}:`, attributes);
    client.domains.createRecord(domainName, attributes, (err, success) => {
        if (err) {
            console.log("Error creating A record: ", err.message);
        }
        if (success) {
            console.log(success);
        }
    });
};

const updateRecord = (domainRecordId, publicIP) => {
    const attributes = getRecordAttributes(publicIP);

    console.log(`Updating record with the following attributes for ${aRecord}:`, attributes);
    client.domains.updateRecord(domainName, domainRecordId, attributes, (err, success) => {
        if (err) {
            console.log("Error updating A record: ", err.message);
        }
        if (success) {
            console.log(success);
        }
    });
};

const getPublicIP = (callback) => {
    https.get(ipLookupUrl, (resp) => {
        let ipAddress = '';

        resp.on('data', (chunk) => {
            ipAddress += chunk;
        });

        resp.on('end', () => {
            callback(ipAddress);
        });

    }).on('error', (err) => {
        throw err;
    });
};

const checkAndUpdateRecords = () => {
    client.domains.get(domainName, (err, domain) => {
        if (err) {
            throw err;
        }
        client.domains.listRecords(domain.name, (err, domainRecords) => {
            if (err) {
                throw err;
            }

            let targetRecord = domainRecords.find(dr => dr.type == 'A' && dr.name == aRecord);
            getPublicIP((publicIP) => {
                if (targetRecord == null) {
                    createRecord(publicIP);
                } else {
                    if (publicIP != targetRecord.data) {
                        updateRecord(targetRecord.id, publicIP);
                    }
                    else {
                        console.log("IP address is unchanged");
                    }
                }
            });
        });
    });
};

checkAndUpdateRecords();
setInterval(checkAndUpdateRecords, 300000);
