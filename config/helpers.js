module.exports = {
    timeSince(date) {
    // Get the difference in milliseconds
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = seconds / 31536000; // Seconds in a year
    let floorInterval;

    if (interval >= 1) { // Check for >= 1 to handle fractions just over 1
        floorInterval = Math.floor(interval);
        // Ternary check: If floorInterval is 1, use "year", otherwise "years"
        return floorInterval + (floorInterval === 1 ? " year ago" : " years ago");
    }

    interval = seconds / 2592000; // Seconds in a month
    if (interval >= 1) {
        floorInterval = Math.floor(interval);
        return floorInterval + (floorInterval === 1 ? " month ago" : " months ago");
    }

    interval = seconds / 86400; // Seconds in a day
    if (interval >= 1) {
        floorInterval = Math.floor(interval);
        return floorInterval + (floorInterval === 1 ? " day ago" : " days ago");
    }

    interval = seconds / 3600; // Seconds in an hour
    if (interval >= 1) {
        floorInterval = Math.floor(interval);
        return floorInterval + (floorInterval === 1 ? " hour ago" : " hours ago");
    }

    interval = seconds / 60; // Seconds in a minute
    if (interval >= 1) {
        floorInterval = Math.floor(interval);
        return floorInterval + (floorInterval === 1 ? " minute ago" : " minutes ago");
    }

    // Default to seconds (must be >= 0)
    floorInterval = Math.floor(seconds);
    return floorInterval + (floorInterval === 1 ? " second ago" : " seconds ago");
}
}