module.exports.withTimeout = (promise, ms) => new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
        reject(new Error(`MongoDB connection timed out after ${ms} ms`));
    }, ms);

    promise
        .then((res) => {
            clearTimeout(timer);
            resolve(res);
        })
        .catch((err) => {
            clearTimeout(timer);
            reject(err);
        });
})