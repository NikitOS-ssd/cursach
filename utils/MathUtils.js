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
    static calculateMeanRequestsInHour(minAdmissionTimeSec, maxAdmissionTimeSec, hours) {

        if (minAdmissionTimeSec > maxAdmissionTimeSec || hours === 0) throw new CalculateMeanRequestHourError

        const meanTimeInSec = (minAdmissionTimeSec + maxAdmissionTimeSec) / 2
        const meanTimeInHours = this.secondsToHours(meanTimeInSec)
        return Math.floor(hours / meanTimeInHours)
    }

    static secondsToHours(seconds) {
        return parseFloat((seconds / 3600).toFixed(5))
    }
}

class FactorialError extends Error {
}

class CalculateMeanRequestHourError extends Error {
}