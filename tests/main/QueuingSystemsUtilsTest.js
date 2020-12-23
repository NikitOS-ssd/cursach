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
        it('should return 0.0008333333333333334 when passed minTimeSec= 1, maxTimeSec=5, hours=1', function () {
            assert.strictEqual(QueuingSystemsUtils.calculateFrequencyRequestsProcessingInHour(
                1,
                5,
                1
            ), 0.0008333333333333334)
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
        it('should return 0.5 when passed probabilityThatChannelIsFree=0.5', function () {
            assert.strictEqual(QueuingSystemsUtils.probabilityThatChannelIsWork(0.5), 0.5)
        })

        it('should return 0.74773 when passed probabilityThatChannelIsFree=0.25227', function () {
            assert.strictEqual(QueuingSystemsUtils.probabilityThatChannelIsWork(0.25227), 0.74773)
        })
    })

    describe('probabilityThatChannelIsFree(loadIntencity, channelSize, bufferSize)', function () {
        it('should return 0.0027472527472527475 when passed loadIntencity=3, channelSize=1, bufferSize=4', function () {
            assert.strictEqual(QueuingSystemsUtils.probabilityThatChannelIsFree(3, 1, 4), 0.0027472527472527475)
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
        it('should return 0.33199999999999996 when passed probabilityOfReject=0.668', function () {
            assert.strictEqual(QueuingSystemsUtils.probabilityOfServiced(0.668), 0.33199999999999996)
        })
    })

    describe('absoluteBandWidth(probabilityOfServiced, meanAdmissionRequestsInHour)', function () {
        it('should return 1195.2 when passed probabilityOfServiced=0.332, meanAdmissionRequestsInHour=3600', function () {
            assert.strictEqual(QueuingSystemsUtils.absoluteBandWidth(0.332, 3600), 1195.2)
        })
    })

    describe('calculateMeanTimeOfRequestInSystem(meanNumberOfRequestsInSystem, absoluteBandWidth)', function () {
        it('should return 0.0037717536813922353 when passed probabilityOfServiced=4.508, meanAdmissionRequestsInHour=1195.2', function () {
            assert.strictEqual(QueuingSystemsUtils.calculateMeanTimeOfRequestInSystem(4.508, 1195.2), 0.0037717536813922353)
        })
    })

    describe('calculateMeanTimeOfRequestInQueue(meanRequestsInSystem, absoluteBandwidth, timeForProcessingOneRequest)', function () {
        it('should return 0.0029370165446230183 when passed meanRequestsInSystem=4.508, absoluteBandwidth=1196.703, timeForProcessingOneRequest=0.00083', function () {
            assert.strictEqual(QueuingSystemsUtils.calculateMeanTimeOfRequestInQueue(4.508, 1196.703, 0.00083), 0.0029370165446230183)
        })
    })

    describe('calculateMeanNumberOfRequestInQueue(loadIntencity, amountOfChannels, bufferSize, probabilityThatChannelIsFree)', function () {
        it('should return 3.5145 when passed loadIntencity=3, amountOfChannels=1, bufferSize=4, probabilityThatChannelIsFree=0.00275', function () {
            assert.strictEqual(QueuingSystemsUtils.calculateMeanNumberOfRequestInQueue(3, 1, 4, 0.00275), 3.5145)
        })
    })

    describe('calculateProbabilityOfLastP(bufferSize, amountOfChannels, loadIntensity)', function () {
        it('should return 0.6675824175824175 when passed bufferSize=4, amountOfChannels=1, loadIntensity=3', function () {
            assert.strictEqual(QueuingSystemsUtils.calculateProbabilityOfLastP(4, 1, 3), 0.6675824175824175)
        })
    })

    describe('calculateProbabilitiesOfPsFromOneForPreLast(bufferSize, amountOfChannels, lastP)', function () {
        it('should return [0.66906, 0.22302, 0.07434, 0.02478, 0.00826] when passed bufferSize=4, amountOfChannels=1, loadIntensity=3', function () {
            assert.deepEqual(QueuingSystemsUtils.calculateProbabilitiesOfPsFromOneForLast(
                4,
                1,
                3
            ), [0.002747252747252746,
                0.00824175824175824,
                0.024725274725274717,
                0.07417582417582416,
                0.22252747252747251,
                0.6675824175824175,])
        })
    })
})
