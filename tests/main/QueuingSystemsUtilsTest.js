describe('QueuingSystemsUtils', function () {

    describe('calculateMeanAdmissionRequestsInHour(minTimeSec, maxTimeSec, hours)', function () {
        it('should return 3600 when passed minTimeSec= 0.5, maxTimeSec=1.5, hours=1', function () {
            assert.strictEqual(QueuingSystemsUtils.calculateMeanAdmissionRequestsInHour(
                0.5,
                1.5,
                1
            ), 3600)
        })
        it('should return 2409 when passed minTimeSec= 2, maxTimeSec=4, hours=2', function () {
            assert.strictEqual(QueuingSystemsUtils.calculateMeanAdmissionRequestsInHour(
                2,
                4,
                2
            ), 2400)
        })
        it('should throw CalculateMeanRequestHourError when minTimeSec > maxTimeSec', function () {
            assert.throws(() => {
                    QueuingSystemsUtils.calculateMeanAdmissionRequestsInHour(4, 2, 1)
                },
                CalculateMeanRequestHourError
            )
        })
        it('should throw CalculateMeanRequestHourError when hours is 0', function () {
            assert.throws(() => {
                    QueuingSystemsUtils.calculateMeanAdmissionRequestsInHour(4, 2, 0)
                },
                CalculateMeanRequestHourError
            )
        })
    })

    describe('calculateFrequencyRequestsProcessingInHour(minTimeSec, maxTimeSec, hours)', function () {
        it('should return 0.05 when passed minTimeSec= 180, maxTimeSec=180, hours=1', function () {
            assert.strictEqual(QueuingSystemsUtils.calculateFrequencyRequestsProcessingInHour(
                180,
                180,
                1
            ), 0.05)
        })
        it('should return 0.00083 when passed minTimeSec= 1, maxTimeSec=5, hours=1', function () {
            assert.strictEqual(QueuingSystemsUtils.calculateFrequencyRequestsProcessingInHour(
                1,
                5,
                1
            ), 0.00083)
        })
    })

    describe('serviceFlowRate(admissionRequestsInHour, frequencyRequestsProcessingInHour)', function () {
        it('should return 4 when passed admissionRequestsInHour= 80, frequencyRequestsProcessingInHour= 0.05', function () {
            assert.strictEqual(QueuingSystemsUtils.serviceFlowRate(80, 0.05), 4)
        })

        it('should return 2.96393 when passed admissionRequestsInHour= 3571, frequencyRequestsProcessingInHour= 0.00083', function () {
            assert.strictEqual(
                QueuingSystemsUtils.serviceFlowRate(
                    3571,
                    0.00083
                ), 2.96393
            )
        })
    })

    describe('probabilityOfReject(loadIntensity, channelSize, bufferSize, probabilityThatChannelIsFree)', function () {
        it('should return 0.66825 when passed loadIntensity=3, channelSize=1, bufferSize=4, probabilityThatChannelIsFree=0.00275', function () {
            assert.strictEqual(QueuingSystemsUtils.probabilityOfReject(3, 1, 4, 0.00275), 0.66825)
        })
    })

    describe('countOfProcessedRequests(minTimeSec, maxTimeSec, hours)', function () {
        it('should return 1200 when passed minTimeSec=1, maxTimeSec=5, hours=1', function () {
            assert.strictEqual(QueuingSystemsUtils.countOfProcessedRequests(1, 5, 1), 1200)
        })
    })

    describe('loadIntencity(loadIntencityRequests, loadIntencityService)', function () {
        it('should return 3 when passed loadIntencityRequests=3600, loadIntencityService=1200', function () {
            assert.strictEqual(QueuingSystemsUtils.loadIntencity(3600, 1200), 3)
        })
    })

    describe('probabilityThatChannelIsWork(probabilityThatChannelIsFree)', function () {
        it('should return 0.2 when passed probabilityThatChannelIsFree=0.8', function () {
            assert.strictEqual(QueuingSystemsUtils.probabilityThatChannelIsWork(0.8), 0.2)
        })

        it('should return 0.74773 when passed probabilityThatChannelIsFree=0.25227', function () {
            assert.strictEqual(QueuingSystemsUtils.probabilityThatChannelIsWork(0.25227), 0.74773)
        })
    })

    describe('probabilityThatChannelIsFree(loadIntencity, channelSize, bufferSize)', function () {
        it('should return 0.00275 when passed loadIntencity=3, channelSize=1, bufferSize=4', function () {
            assert.strictEqual(QueuingSystemsUtils.probabilityThatChannelIsFree(3, 1, 4), 0.00275)
        })
    })

    describe('probabilityThatOneChannelIsWork(loadIntencity, probabilityThatChannelIsFree)', function () {
        it('should return 0.00824 when passed loadIntencity=3, probabilityThatChannelIsFree=0.00275', function () {
            assert.strictEqual(QueuingSystemsUtils.probabilityThatOneChannelIsWork(3, 0.00275), 0.00825)
        })
    })

    describe('calculateMeanNumberOfRequestsInSystem(numberOfRequestsInQueue, numberOfRequestsInServed)', function () {
        it('should return 4.508 when passed numberOfRequestsInQueue=3.511, numberOfRequestsInServed=0.997', function () {
            assert.strictEqual(QueuingSystemsUtils.calculateMeanNumberOfRequestsInSystem(3.511, 0.997), 4.508)
        })
    })

    describe('calculateMeanNumberOfRequestsInServed(loadIntencity, probabilityOfServiced)', function () {
        it('should return 0.996 when passed loadIntencity=3, probabilityOfService=0.332', function () {
            assert.strictEqual(QueuingSystemsUtils.calculateMeanNumberOfRequestsInServed(3, 0.332), 0.996)
        })
    })

    describe('probabilityOfServiced(probabilityOfReject)', function () {
        it('should return 0.332 when passed probabilityOfReject=0.668', function () {
            assert.strictEqual(QueuingSystemsUtils.probabilityOfServiced(0.668), 0.332)
        })
    })

    describe('calculateMeanTimeOfRequestInQueue(meanRequestsInSystem, absoluteBandwidth, timeForProcessingOneRequest)', function () {
        it('should return 0.00294 when passed meanRequestsInSystem=4.508, absoluteBandwidth=1196.703, timeForProcessingOneRequest=0.00083', function () {
            assert.strictEqual(QueuingSystemsUtils.calculateMeanTimeOfRequestInQueue(4.508, 1196.703, 0.00083), 0.00294)
        })
    })
})
