module.exports = {

    // google: {
    //     clientID: '631519036537-42orp2s8ekk5om5ea9irthcgp0e3nkn0.apps.googleusercontent.com',
    //     clientSecret: 'rJPGMjFg4BcpIHAvN6jDnsQZ'
    // },

    // facebook:{
    //     clientID: '204352224097340',
    //     clientSecret: 'c9a9ffa3c7c2fb774b3cf87e94fef281'
    // },

    jwtSecret: process.env.JWT_SECRET || 'secret code'
}