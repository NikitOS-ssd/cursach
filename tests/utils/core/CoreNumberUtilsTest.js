describe('CoreNumberUtils', function () {

    describe('toFixedDigitsAfterComma(number)', function () {
        it('should return 0.0004333333333333334 when passed 0.0004333333333333334', function () {
            assert.strictEqual(CoreNumberUtils.toFixedDigitsAfterComma(0.0004333333333333334), 0.0004333333333333334)
        })
    })

    describe('getRandomNumberFromZeroToOne()', function () {
        it('should return number between 0 and 1', function () {
            for (let i = 0; i < 1000; i++) {
                let generatedNumber = CoreNumberUtils.getRandomNumberFromZeroToOne()
                assert.isTrue(generatedNumber >= 0 && generatedNumber <= 1)
            }
        })
    })

    describe('generateRandomNumberBetween(startBarrier, endBarrier)', function () {
        it('should return number between startBarrier and endBarrier', function () {
            let startBarrier = 0
            let endBarrier = 100

            for (let i = 0; i < 1000; i++) {
                let generatedNumber = CoreNumberUtils.generateRandomNumberBetween(startBarrier, endBarrier)
                assert.isTrue(generatedNumber >= startBarrier && generatedNumber <= endBarrier)
            }
        })
    })
})
