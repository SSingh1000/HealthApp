exports.gmtToEst = function(timeStampGmt){
    const offset = -240;
    let timeStamp = new Date(timeStampGmt);
    timeStamp.setTime(timeStamp.getTime() + offset*60*1000);

    return timeStamp.toLocaleTimeString();
}

exports.estToGmt = function(timeStampEst){
    const offset = 240;
    let timeStamp = new Date(timeStampEst);
    timeStamp.setTime(timeStamp.getTime + offset*60*1000);

    return timeStamp.toLocaleTimeString();
}