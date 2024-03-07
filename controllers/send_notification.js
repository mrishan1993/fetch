const { fetchJobs } = require("./fetch_jobs")
const _ = require("lodash")




async function sendNotification () {
    
    const resolve = Promise.resolve(fetchJobs())
    resolve.then ( (jobs) => {
        console.log("notifiation sending")
        _.forEach(jobs, function (o) {
            fetch('https://ntfy.sh/fetchmepmjobs', {
                method: 'POST', // PUT works too
                body: o.company + " - " + o.role
            })
        })
    }).catch(error => {
        // console.log(error); 
    });  
}

module.exports = {
    sendNotification
}