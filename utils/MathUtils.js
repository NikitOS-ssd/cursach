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
}

class FactorialError extends Error {
}
