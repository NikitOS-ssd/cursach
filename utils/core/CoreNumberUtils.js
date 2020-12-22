class CoreNumberUtils {

    /**
     * @return {number} return number with five digitalis after comma
     */
    static toFixedFiveDigitsAfterComma(number) {
        return parseFloat(parseFloat(number).toFixed(5))
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
}