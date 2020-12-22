describe('MathUtils', function () {
    describe('factorial(number)', function () {
        it('should return 1 when passed 1', function () {
            assert.strictEqual(MathUtils.factorial(1), 1)
        })
        it('should return 120 when passed 5', function () {
            assert.strictEqual(MathUtils.factorial(5), 120)
        })
        it('should return 1 when passed 0', function () {
            assert.strictEqual(MathUtils.factorial(0), 1)
        })
        it('should throw error when passed 1.5', function () {
            assert.throws(() => {
                MathUtils.factorial(1.5)
            }, FactorialError, "number is not integer")
        })
        it('should throw error when passed 0.5', function () {
            assert.throws(() => {
                MathUtils.factorial(0.5)
            }, FactorialError, "number is not integer")
        })
        it('should throw error when passed less then 0', function () {
            assert.throws(() => {
                MathUtils.factorial(-100)
            }, FactorialError, "number is less then 0")
        })
    })

})
