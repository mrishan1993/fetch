var Xray = require('x-ray')
var _ = require("lodash")
var async = require("async");

var x = Xray()
function fetchJobs () {

    const allJobs = Promise.all([fetchFromWeb3(), fetchFromGreenhouse()]);
    allJobs.then(values => {
        console.log("values", _.flatten(values)); // [resolvedValue1, resolvedValue2]
    }).catch(error => {
        console.log(error); // rejectReason of any first rejected promise
    });

    // })
    // return allJobs

    
}

const fetchFromWeb3 = (url) => {
    return new Promise(function(resolve, reject) {
        let jobs = [];
        x("https://web3.career/product-manager-jobs", '.table_row') // Selecting elements to scrape
        .paginate('li.next > a.page-link@href') // Pagination selector
        .limit(30) // Limiting to 3 pages but it returns only 3 items. so changed it to 30 items. // TODO
        ((err, content) => {
            if (err) {
                reject(err);
            } else {
                content.forEach(item => {
                    let o = item.split(/\s{2,}/);
                    let obj = {
                        role: o[1],
                        company: o[2],
                        location: o[4],
                        salary_range: o[5]
                    };
                    if ((obj.salary_range && obj.salary_range.slice(-4, -1) > 140) &&
                        (obj.role.includes("Product Manager") || obj.role.includes("Senior Product Manager"))) {
                        jobs.push(obj);
                    }
                });
                console.log("Inside web3", jobs)
                resolve(jobs);
            }
        });
    });
};

async function fetchFromGreenhouse () {
    let greenhouseLinks = ["https://boards.greenhouse.io/remotecom", "https://boards.greenhouse.io/perplexityai"]
    return new Promise(function(resolve, reject) {
        let jobs = [];
        for (let i=0;i<greenhouseLinks.length;i++) {
            x(greenhouseLinks[i], ['.opening a']) // Selecting elements to scrape
            ((err, content) => {
                if (err) {
                    console.log("error ", err)
                } else {
                    content.forEach(item => {
                        let obj = {
                            role: item,
                            company: greenhouseLinks[i].slice(29)
                        };
    
                        if (obj.role.includes("Product Manager") || obj.role.includes("Senior Product Manager") || obj.role.includes("Software Engineer")) {
                            jobs.push(obj);
                        }
                    });
                    
                }
            });    
        }
        console.log("Inside greenhouse", jobs)
        resolve(jobs);
        
    });
    
}

module.exports = {
    fetchJobs
};