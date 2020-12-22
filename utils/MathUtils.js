/**
 * @requires(CoreNumberUtils, TimeUtils)
 */
class MathUtils {

    /**
     * @throws {FactorialError}
     * @return {number}
     */
    static factorial(number) {
        if (number % 1 !== 0) throw new FactorialError("number is not integer")
        if (number < 0) throw new FactorialError("number is less then 0")
        return (number > 1) ? number * this.factorial(number - 1) : 1
    }


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
        const meanTimeInMinutes = this.secondsToMinutes(meanTimeInSec)

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
    static probabilityOfReject(serviceFlowRate, amoundOfChannels, probabilityThatChannelIsFree) {
        let firstMultiply = Math.pow(serviceFlowRate, amoundOfChannels) / this.factorial(amoundOfChannels)
        let result = firstMultiply * probabilityThatChannelIsFree
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
            firstSummResult += Math.pow(loadIntencity, i) / this.factorial(i)
        }
        console.log(firstSummResult)

        let secondSumMultiplayer = Math.pow(loadIntencity, channelSize)
        console.log(secondSumMultiplayer)

        let secondSummResult = 0
        for (let i = 1; i <= bufferSize; i++) {
            secondSummResult += Math.pow((loadIntencity / channelSize), i)
        }
        console.log(secondSummResult)

        let result = 1 / (firstSummResult + secondSumMultiplayer * secondSummResult)
        return CoreNumberUtils.toFixedFiveDigitsAfterComma(result)
    }

    static probabilityThatOneChannelIsWork(loadIntencity, probabilityThatChannelIsFree) {

        let result =
            (Math.pow(loadIntencity, 1) / CoreNumberUtils.toFixedFiveDigitsAfterComma(1)) * probabilityThatChannelIsFree
        return CoreNumberUtils.toFixedFiveDigitsAfterComma(result)
    }
}

class FactorialError extends Error {
}

class CalculateMeanRequestHourError extends Error {
}