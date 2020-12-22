class QueuingSystemsUtils {

    /**
     * @return {number} mean count of requests in integer
     */
    static calculateMeanAdmissionRequestsInHour(minTimeSec, maxTimeSec, hours) {

        if (minTimeSec > maxTimeSec || hours === 0) throw new CalculateMeanRequestHourError

        const meanTimeInSec = (minTimeSec + maxTimeSec) / 2
        return Math.floor(3600 * hours / meanTimeInSec)
    }

    /**
     * @return {number} mean frequency processing
     */
    static calculateFrequencyRequestsProcessingInHour(minTimeSec, maxTimeSec, hours) {

        if (minTimeSec > maxTimeSec || hours === 0) throw new CalculateMeanRequestHourError

        const meanTimeInSec = (minTimeSec + maxTimeSec) / 2
        const meanTimeInMinutes = TimeUtils.secondsToMinutes(meanTimeInSec)

        return CoreNumberUtils.toFixedFiveDigitsAfterComma(meanTimeInMinutes / 60 * hours)
    }

    /**
     * @return {number} service flow rate
     */
    static serviceFlowRate(admissionRequestsInHour, frequencyRequestsProcessingInHour) {
        return admissionRequestsInHour * frequencyRequestsProcessingInHour
    }

    /**
     * @return {number} probability from 0 to 1
     */
    static probabilityOfReject(loadIntensity, channelSize, bufferSize, probabilityThatChannelIsFree) {
        let result = 0
        let firstMultiplier = Math.pow(loadIntensity, channelSize + bufferSize)
            / (Math.pow(channelSize, bufferSize) * MathUtils.factorial(channelSize))
        result = firstMultiplier * probabilityThatChannelIsFree
        return CoreNumberUtils.toFixedFiveDigitsAfterComma(result)
    }

    /**
     * @return {number} integer of count of processed request
     */
    static countOfProcessedRequests(minTimeSec, maxTimeSec, hours) {
        const frequencyRequestsProcessingInHour = (minTimeSec + maxTimeSec) / 2;
        return (3600 * hours) / frequencyRequestsProcessingInHour
    }

    static loadIntencity(loadIntencityRequests, loadIntencityService) {
        return loadIntencityRequests / loadIntencityService;
    }

    static probabilityThatChannelIsWork(probabilityThatChannelIsFree) {
        return CoreNumberUtils.toFixedFiveDigitsAfterComma(1 - probabilityThatChannelIsFree)
    }

    static probabilityThatChannelIsFree(loadIntencity, channelSize, bufferSize) {
        let firstSummResult = 0
        for (let i = 0; i <= channelSize; i++) {
            firstSummResult += Math.pow(loadIntencity, i) / MathUtils.factorial(i)
        }

        let secondSumMultiplayer = Math.pow(loadIntencity, channelSize)

        let secondSummResult = 0
        for (let i = 1; i <= bufferSize; i++) {
            secondSummResult += Math.pow((loadIntencity / channelSize), i)
        }

        let result = 1 / (firstSummResult + secondSumMultiplayer * secondSummResult)
        return CoreNumberUtils.toFixedFiveDigitsAfterComma(result)
    }

    static probabilityThatOneChannelIsWork(loadIntencity, probabilityThatChannelIsFree) {
        let result =
            (Math.pow(loadIntencity, 1) / CoreNumberUtils.toFixedFiveDigitsAfterComma(1)) * probabilityThatChannelIsFree
        return CoreNumberUtils.toFixedFiveDigitsAfterComma(result)
    }

    static calculateMeanNumberOfRequestsInSystem(numberOfRequestsInQueue, numberOfRequestsInServed) {
        const result = numberOfRequestsInQueue + numberOfRequestsInServed;
        return CoreNumberUtils.toFixedFiveDigitsAfterComma(result);
    }

    static calculateMeanNumberOfRequestsInServed(loadIntencity, probabilityOfService) {
        const result = loadIntencity * probabilityOfService;
        return CoreNumberUtils.toFixedFiveDigitsAfterComma(result);
    }

    static probabilityOfServiced(probabilityOfReject) {
        const result = 1 - probabilityOfReject;
        return CoreNumberUtils.toFixedFiveDigitsAfterComma(result);
    }

    static absoluteBandWidth(probabilityOfServiced, meanAdmissionRequestsInHour) {
        const result = probabilityOfServiced * meanAdmissionRequestsInHour;
        return CoreNumberUtils.toFixedFiveDigitsAfterComma(result);
    }

    static calculateMeanTimeOfRequestInSystem(meanNumberOfRequestsInSystem, absoluteBandWidth) {
        const result = meanNumberOfRequestsInSystem / absoluteBandWidth;
        return CoreNumberUtils.toFixedFiveDigitsAfterComma(result);
    }

    static calculateMeanTimeOfRequestInQueue(meanRequestsInSystem, absoluteBandwidth, timeForProcessingOneRequest) {
        let result = (meanRequestsInSystem/absoluteBandwidth) - timeForProcessingOneRequest
        return CoreNumberUtils.toFixedFiveDigitsAfterComma(result)
    }
}

class CalculateMeanRequestHourError extends Error {
}
