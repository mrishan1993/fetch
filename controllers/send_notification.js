



function sendNotification () {
    fetch('https://ntfy.sh/fetchmepmjobs', {
        method: 'POST', // PUT works too
        body: 'Notification successfully sent'
    })
}

module.exports = {
    sendNotification
}