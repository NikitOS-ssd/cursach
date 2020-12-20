class MathUtils {

    /**
     * @throws {FactorialError}
     */
    static factorial(number) {
        if (number < 0) throw new FactorialError()
        return (number > 1) ? number * this.factorial(number - 1) : 1;
    }

    static getRandomNumberFromZeroToOne() {
        return Math.random().toFixed(2)
    }
}

class FactorialError extends Error {
}