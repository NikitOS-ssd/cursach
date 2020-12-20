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

    describe('calculateMeanAdmissionRequestsInHour(minTimeSec, maxTimeSec, hours)', function () {
        it('should return 3571 when passed minTimeSec= 0.5, maxTimeSec=1.5, hours=1', function () {
            assert.strictEqual(MathUtils.calculateMeanAdmissionRequestsInHour(
                0.5,
                1.5,
                1
            ), 3571)
        })
        it('should return 1204 when passed minTimeSec= 1, maxTimeSec=5, hours=1', function () {
            assert.strictEqual(MathUtils.calculateMeanAdmissionRequestsInHour(
                1,
                5,
                1
            ), 1204)
        })
        it('should return 2409 when passed minTimeSec= 2, maxTimeSec=4, hours=2', function () {
            assert.strictEqual(MathUtils.calculateMeanAdmissionRequestsInHour(
                2,
                4,
                2
            ), 2409)
        })
        it('should throw CalculateMeanRequestHourError when minTimeSec > maxTimeSec', function () {
            assert.throws(() => {
                    MathUtils.calculateMeanAdmissionRequestsInHour(4, 2, 1)
                },
                CalculateMeanRequestHourError
            )
        })
        it('should throw CalculateMeanRequestHourError when hours is 0', function () {
            assert.throws(() => {
                    MathUtils.calculateMeanAdmissionRequestsInHour(4, 2, 0)
                },
                CalculateMeanRequestHourError
            )
        })
    })

    describe('secondsToMinutes(seconds)', function () {
        it('should return 1 when passed 60', function () {
            assert.strictEqual(MathUtils.secondsToMinutes(60), 1)
        })
        it('should return 3 when passed 180', function () {
            assert.strictEqual(MathUtils.secondsToMinutes(180), 3)
        })
        it('should return 0.5 when passed 30', function () {
            assert.strictEqual(MathUtils.secondsToMinutes(30), 0.5)
        })
    })

    describe('toFixedFiveDigitsAfterComma(number)', function () {
        it('should return 0.00083 when passed 0.0008333333333333334', function () {
            assert.strictEqual(MathUtils.toFixedFiveDigitsAfterComma(0.0008333333333333334), 0.00083)
        })
    })

    describe('calculateFrequencyRequestsProcessingInHour(minTimeSec, maxTimeSec, hours)', function () {
        it('should return 0.05 when passed minTimeSec= 180, maxTimeSec=180, hours=1', function () {
            assert.strictEqual(MathUtils.calculateFrequencyRequestsProcessingInHour(
                180,
                180,
                1
            ), 0.05)
        })
        it('should return 0.00083 when passed minTimeSec= 1, maxTimeSec=5, hours=1', function () {
            assert.strictEqual(MathUtils.calculateFrequencyRequestsProcessingInHour(
                1,
                5,
                1
            ), 0.00083)
        })
    })

    describe('serviceFlowRate(admissionRequestsInHour, frequencyRequestsProcessingInHour)', function () {
        it('should return 4 when passed admissionRequestsInHour= 80, frequencyRequestsProcessingInHour= 0.05', function () {
            assert.strictEqual(MathUtils.serviceFlowRate(80, 0.05), 4)
        })

        it('should return 4 when passed admissionRequestsInHour= 3571, frequencyRequestsProcessingInHour= 0.00083', function () {
            assert.strictEqual(
                MathUtils.serviceFlowRate(
                    3571,
                    0.00083
                ), 2.96393
            )
        })
    })

    describe('probabilityThatChannelIsFree(serviceFlowRate)', function () {
        it('should return 0.0769 when passed serviceFlowRate= 4', function () {
            assert.strictEqual(MathUtils.probabilityThatChannelIsFree(4), 0.0769)
        })
    })
})
