var Xray = require('x-ray')
var _ = require("lodash")
var x = Xray()
function fetchJobs () {
    console.log ("inside from fetch jobs")
    return fetchFromWeb3()

    
}

function fetchFromWeb3 () {
    console.log ("inside from web3")
    let jobs = []
//     x('http://google.com', 'title')(function(err, title) {
//   console.log(title) // Google
// })
    x('https://web3.career/product-manager-jobs', {
        items: x(['.table_row'])
    })(function (err, content) {
        _.map(content.items, function (o) {
            // o = o.replace(/\s+/g, ' ')
            o = o.split(/\s{2,}/)
            var obj = {
                role: o[1],
                company: o[2],
                location: o[4],
                salary_range: o[5]
            }
            jobs.push(obj)
        })
        return jobs
    })

    
}


module.exports = {
    fetchJobs
};