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

    describe('getRandomNumberFromZeroToOne()', function () {
        it('should return number between 0 and 1', function () {
            for (let i = 0; i < 1000; i++) {
                let generatedNumber = MathUtils.getRandomNumberFromZeroToOne()
                assert.isTrue(generatedNumber >= 0 && generatedNumber <= 1)
            }
        })
    })

    describe('secondsToHours()', function () {
        it('should return 1 when passed 3600', function () {
            assert.strictEqual(MathUtils.secondsToHours(3600), 1)
        })
        it('should return 0.00028 when passed 1', function () {
            assert.strictEqual(MathUtils.secondsToHours(1), 0.00028)
        })
    })

    describe('calculateMeanRequestsInHour(minAdmissionTimeSec, maxAdmissionTimeSec, hours)', function () {
        it('should return 3571 when passed minAdmissionTimeSec= 0.5, maxAdmissionTimeSec=1.5, hours=1', function () {
            assert.strictEqual(MathUtils.calculateMeanRequestsInHour(
                0.5,
                1.5,
                1
            ), 3571)
        })
        it('should return 2409 when passed minAdmissionTimeSec= 2, maxAdmissionTimeSec=4, hours=2', function () {
            assert.strictEqual(MathUtils.calculateMeanRequestsInHour(
                2,
                4,
                2
            ), 2409)
        })
        it('should throw CalculateMeanRequestHourError when minAdmissionTimeSec > maxAdmissionTimeSec', function () {
            assert.throws(() => {
                    MathUtils.calculateMeanRequestsInHour(4, 2, 1)
                },
                CalculateMeanRequestHourError
            )
        })
        it('should throw CalculateMeanRequestHourError when hours is 0', function () {
            assert.throws(() => {
                    MathUtils.calculateMeanRequestsInHour(4, 2, 0)
                },
                CalculateMeanRequestHourError
            )
        })
    })
})
