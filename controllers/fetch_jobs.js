var Xray = require('x-ray')
var _ = require("lodash")
const { sub } = require("date-fns");
require("dotenv").config()

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      port : 3306,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : 'fetch'
    }
  });


var x = Xray()
function fetchJobs () {
    return new Promise(function(resolve, reject) {
        console.log("staring call")
        const allJobs = Promise.all([fetchFromWeb3(), fetchFromGreenhouse(), fetchFromLever()]);
        allJobs.then(async values => {
            values = _.flatten(values)
            
            values = values.map(obj => ({
                ...obj, // Copy existing properties
                created_at: new Date(), // Add created_at field with current date and time
                updated_at: new Date()  // Add updated_at field with current date and time
            }));
            try {
                console.log("query started")
                const fetchedDate = sub(new Date(), {days: 7})
                let lastSevenDaysJobs = await knex('jobs').where("active", 1).where('created_at', '>=', fetchedDate).select('id', 'role', 'company', 'salary_range', 'location', 'url', 'created_at')
                console.log("query started 1 ")
                lastSevenDaysJobs = Object.values(JSON.parse(JSON.stringify(lastSevenDaysJobs)));
                const uniqueCombinations = _.map(lastSevenDaysJobs, obj => _.pick(obj, ['role', 'company']));
                const filteredArray = _.filter(values, obj => {
                    const { role, company } = obj;
                    return !_.some(uniqueCombinations, { role, company });
                });
                // console.log("final result ", filteredArray)
                if (filteredArray.length > 0) {
                    console.log("query started 2 ")
                    await knex('jobs').insert(filteredArray)
                    console.log("query started 3 ")
                    resolve(filteredArray)
                } else {
                    reject("No new jobs")
                }
                
            } catch (e) {
                console.log("SQL Error: ", e)
                reject(e)
            }
            
            
        }).catch(error => {
            // console.log(error); // rejectReason of any first rejected promise
            reject(error)
        });    
    })
    
}

const fetchFromWeb3 = (url) => {
    return new Promise(function(resolve, reject) {
        let jobs = [];
        console.log("call to web3")
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
                        salary_range: o[5],
                        source: "web3jobs.com"
                    };
                    if ((obj.salary_range && obj.salary_range.slice(-4, -1) > 140) &&
                        (obj.role.includes("Product Manager") || obj.role.includes("Senior Product Manager"))) {
                        jobs.push(obj);
                    }
                });
                console.log("web3 jobs ", jobs)
                resolve(jobs);
            }
        });
    });
};

async function fetchFromGreenhouse () {
    let greenhouseLinks = ["https://boards.greenhouse.io/remotecom", "https://boards.greenhouse.io/perplexityai"]
    return new Promise(function(resolve, reject) {
        let jobs = [];
        console.log("call to greenhouse")
        for (let i=0;i<greenhouseLinks.length;i++) {
            x(greenhouseLinks[i], ['.opening a']) // Selecting elements to scrape
            ((err, content) => {
                if (err) {
                    console.log("error ", err)
                } else {
                    content.forEach(item => {
                        let obj = {
                            role: item,
                            company: greenhouseLinks[i].slice(29),
                            source: "greenhouse"
                        };
    
                        if (obj.role.includes("Product Manager") || obj.role.includes("Senior Product Manager")) {
                            jobs.push(obj);
                        }
                    });
                    console.log("greenhouse jobs ", jobs)
                    resolve(jobs);                    
                }
            });    
        }
        
        
    });   
}

async function fetchFromLever () {
    let leverLinks = ["https://jobs.lever.co/Anthropic", "https://jobs.lever.co/moxionpower"]
    return new Promise(function(resolve, reject) {
        let jobs = [];
        console.log("call to lever")
        for (let i=0;i<leverLinks.length;i++) {
            x(leverLinks[i], ['.posting-title h5']) // Selecting elements to scrape
            ((err, content) => {
                if (err) {
                } else {
                    content.forEach(item => {
                        let obj = {
                            role: item,
                            company: leverLinks[i].slice(22),
                            source: "lever"
                        };
    
                        if (obj.role.includes("Product Manager") || obj.role.includes("Senior Product Manager")) {
                            jobs.push(obj);
                        }
                    });
                    console.log("level jobs ", jobs)
                    resolve(jobs);
                }
            });    
        }
        
    });   
}

module.exports = {
    fetchJobs
};