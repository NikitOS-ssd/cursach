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

    describe('calculateMeanAdmissionRequestsInHour(minTimeSec, maxTimeSec, hours)', function () {
        it('should return 3600 when passed minTimeSec= 0.5, maxTimeSec=1.5, hours=1', function () {
            assert.strictEqual(MathUtils.calculateMeanAdmissionRequestsInHour(
                0.5,
                1.5,
                1
            ), 3600)
        })
        it('should return 1200 when passed minTimeSec= 1, maxTimeSec=5, hours=1', function () {
            assert.strictEqual(MathUtils.calculateMeanAdmissionRequestsInHour(
                1,
                5,
                1
            ), 1200)
        })
        it('should return 2409 when passed minTimeSec= 2, maxTimeSec=4, hours=2', function () {
            assert.strictEqual(MathUtils.calculateMeanAdmissionRequestsInHour(
                2,
                4,
                2
            ), 2400)
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

        it('should return 2.96393 when passed admissionRequestsInHour= 3571, frequencyRequestsProcessingInHour= 0.00083', function () {
            assert.strictEqual(
                MathUtils.serviceFlowRate(
                    3571,
                    0.00083
                ), 2.96393
            )
        })
    })

    describe('loadIntencity(loadIntencityRequests, loadIntencityService)', function () {
        it('should return 3 when passed loadIntencityRequests=3600, loadIntencityService=1200', function () {
            assert.strictEqual(MathUtils.loadIntencity(3600, 1200), 3)
        })
    })

    describe('probabilityOfReject(serviceFlowRate, amoundOfChannels, probabilityThatChannelIsFree)', function () {
        it('should return 0.61536 when passed serviceFlowRate=4, amoundOfChannels=2, probabilityThatChannelIsFree=0.07692', function () {
            assert.strictEqual(MathUtils.probabilityOfReject(4, 2, 0.07692), 0.61536)
        })

        it('should return 0.74771 when passed serviceFlowRate=2.96393, amoundOfChannels=1, probabilityThatChannelIsFree=0.25227', function () {
            assert.strictEqual(MathUtils.probabilityOfReject(2.96393, 1, 0.25227), 0.74771)
        })
    })

    describe('countOfProcessedRequests(minTimeSec, maxTimeSec, hours)', function () {
        it('should return 1200 when passed minTimeSec=1, maxTimeSec=5, hours=1', function () {
            assert.strictEqual(MathUtils.countOfProcessedRequests(1, 5, 1), 1200)
        })
    })
    
    describe('probabilityThatChannelIsWork(probabilityThatChannelIsFree)', function () {
        it('should return 0.2 when passed probabilityThatChannelIsFree=0.8', function () {
            assert.strictEqual(MathUtils.probabilityThatChannelIsWork(0.8), 0.2)
        })
        
        it('should return 0.74773 when passed probabilityThatChannelIsFree=0.25227', function () {
            assert.strictEqual(MathUtils.probabilityThatChannelIsWork(0.25227), 0.74773)
        })
    })

    describe('probabilityThatChannelIsFree(loadIntencity, channelSize, bufferSize)', function () {
        it('should return 0.00275 when passed loadIntencity=3, channelSize=1, bufferSize=4', function () {
            assert.strictEqual(MathUtils.probabilityThatChannelIsFree(3, 1, 4), 0.00275)
        })
    })

    describe('probabilityThatOneChannelIsWork(loadIntencity, probabilityThatChannelIsFree)', function () {
        it('should return 0.00824 when passed loadIntencity=3, probabilityThatChannelIsFree=0.00275', function () {
            assert.strictEqual(MathUtils.probabilityThatOneChannelIsWork(3, 0.00275), 0.00825)
        })
    })
})
