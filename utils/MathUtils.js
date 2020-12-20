class MathUtils {

    static factorial(n) {
        return (n !== 1) ? n * this.factorial(n - 1) : 1;
    }

    static getRandomNumberFromZeroToOne() {
        return Math.random().toFixed(2)
    }
}
