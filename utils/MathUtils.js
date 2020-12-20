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
}

class FactorialError extends Error {
}