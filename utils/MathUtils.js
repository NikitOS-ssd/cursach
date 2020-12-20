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
     * @return {number} number that  `>= 0` and `<= 1`
     */
    static getRandomNumberFromZeroToOne() {
        return parseFloat(Math.random().toFixed(2))
    }

    /**
     * @return {number} random number that   `>= startBarrier` and `<= endBarrier`
     */
    static generateRandomNumberBetween(startBarrier, endBarrier) {
        let programProcessingTime = (startBarrier - endBarrier) * MathUtils.getRandomNumberFromZeroToOne() + endBarrier
        programProcessingTime = +programProcessingTime.toFixed(2)
        return programProcessingTime;
    }

    /**
     * @return {number} mean count of requests in integer
     */
    static calculateMeanAdmissionRequestsInHour(minTimeSec, maxTimeSec, hours) {

        if (minTimeSec > maxTimeSec || hours === 0) throw new CalculateMeanRequestHourError

        const meanTimeInSec = (minTimeSec + maxTimeSec) / 2
        const meanTimeInHours = this.secondsToHours(meanTimeInSec)
        return Math.floor(hours / meanTimeInHours)
    }

    /**
     * @return {number} mean frequency processing
     */
    static calculateFrequencyRequestsProcessingInHour(minTimeSec, maxTimeSec, hours) {

        if (minTimeSec > maxTimeSec || hours === 0) throw new CalculateMeanRequestHourError

        const meanTimeInSec = (minTimeSec + maxTimeSec) / 2
        const meanTimeInMinutes = this.secondsToMinutes(meanTimeInSec)

        return this.toFixedFiveDigitsAfterComma(meanTimeInMinutes / 60 * hours)
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
    static probabilityThatChannelIsFree(serviceFlowRate, amoundOfChannels) {
        let result = 0;

        for(let i = 0; i <= amoundOfChannels; i++) {
            result += Math.pow(serviceFlowRate, i) / this.factorial(i);
        }

        return this.toFixedFiveDigitsAfterComma(1 / result)
    }

    /**
     * @return {number} probability from 0 to 1
     */
    static probabilityOfReject(serviceFlowRate, amoundOfChannels, probabilityThatChannelIsFree) {
        let firstMultiply = Math.pow(serviceFlowRate, amoundOfChannels) / this.factorial(amoundOfChannels)
        let result = firstMultiply * probabilityThatChannelIsFree
        return this.toFixedFiveDigitsAfterComma(result)
    }

    /**
     * @return {number} integer of count of processed request
     */
    static countOfProcessedRequests(minTimeSec, maxTimeSec, hours) {
        const frequencyRequestsProcessingInHour = (minTimeSec + maxTimeSec) / 2;
        const result = 3600 / frequencyRequestsProcessingInHour
        return parseInt(result)
    }

    static secondsToHours(seconds) {
        return this.toFixedFiveDigitsAfterComma(seconds / 3600)
    }

    static secondsToMinutes(seconds) {
        return this.toFixedFiveDigitsAfterComma(seconds / 60)
    }

    static toFixedFiveDigitsAfterComma(number) {
        return parseFloat(parseFloat(number).toFixed(5))
    }
}

class FactorialError extends Error {
}

class CalculateMeanRequestHourError extends Error {
}