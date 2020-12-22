describe('CoreNumberUtils', function () {

    describe('toFixedFiveDigitsAfterComma(number)', function () {
        it('should return 0.00043 when passed 0.0004333333333333334', function () {
            assert.strictEqual(MathUtils.toFixedFiveDigitsAfterComma(0.0004333333333333334), 0.00043)
        })
    })

    describe('getRandomNumberFromZeroToOne()', function () {
        it('should return number between 0 and 1', function () {
            for (let i = 0; i < 1000; i++) {
                let generatedNumber = MathUtils.getRandomNumberFromZeroToOne()
                assert.isTrue(generatedNumber >= 0 && generatedNumber <= 1)
            }
        })
    })

    describe('generateRandomNumberBetween(startBarrier, endBarrier)', function () {
        it('should return number between startBarrier and endBarrier', function () {
            let startBarrier = 0
            let endBarrier = 100

            for (let i = 0; i < 1000; i++) {
                let generatedNumber = MathUtils.generateRandomNumberBetween(startBarrier, endBarrier)
                assert.isTrue(generatedNumber >= startBarrier && generatedNumber <= endBarrier)
            }
        })
    })
})
