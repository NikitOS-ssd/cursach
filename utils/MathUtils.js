class MathUtils {

    /**
     * @throws {FactorialError}
     */
    static factorial(number) {
        if (number % 1 !== 0) throw new FactorialError("number is not integer")
        if (number < 0) throw new FactorialError("number is less then 0")
        return (number > 1) ? number * this.factorial(number - 1) : 1
    }

    /**
     * @return number that  `>= 0` and `<= 1`
     */
    static getRandomNumberFromZeroToOne() {
        return parseFloat(Math.random().toFixed(2))
    }

    /**
     * @return random number that   `>= startBarrier` and `<= endBarrier`
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
    static calculateFrequencyRequestsInHour(minTimeSec, maxTimeSec, hours) {

        if (minTimeSec > maxTimeSec || hours === 0) throw new CalculateMeanRequestHourError

        const meanTimeInSec = (minTimeSec + maxTimeSec) / 2
        const meanTimeInMinutes = this.secondsToMinutes(meanTimeInSec)

        return this.toFixedFiveDigitsAfterComma(meanTimeInMinutes / 60 * hours)
    }

    static secondsToHours(seconds) {
        return this.toFixedFiveDigitsAfterComma(seconds / 3600)
    }

    static secondsToMinutes(seconds) {
        return this.toFixedFiveDigitsAfterComma(seconds / 60)
    }

    static toFixedFiveDigitsAfterComma(number){
        return parseFloat(parseFloat(number).toFixed(5))
    }
}

class FactorialError extends Error {
}

class CalculateMeanRequestHourError extends Error {
}