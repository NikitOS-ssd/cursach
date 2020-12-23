class CoreNumberUtils {

    /**
     * @return {number} return number with fixed digitalis after comma
     */
    static toFixedDigitsAfterComma(number) {
        return number
    }

    /**
     * @return {number} number that  `>= 0` and `<= 1`
     */
    static getRandomNumberFromZeroToOne() {
        return CoreNumberUtils.toFixedDigitsAfterComma(Math.random())
    }

    /**
     * @return {number} random number that   `>= startBarrier` and `<= endBarrier`
     */
    static generateRandomNumberBetween(startBarrier, endBarrier) {
        let programProcessingTime = (startBarrier - endBarrier) * this.getRandomNumberFromZeroToOne() + endBarrier
        return CoreNumberUtils.toFixedDigitsAfterComma(programProcessingTime)
    }
}
