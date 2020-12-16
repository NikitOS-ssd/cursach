class MathUtils {

    static factorial(n) {
        return (n !== 1) ? n * fac(n - 1) : 1;
    }

    static getRandomNumberFromZeroToOne() {
        return Math.random().toFixed(2)
    }

}

export default MathUtils
