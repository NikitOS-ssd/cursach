class QueuingSystemsUtils {

    /**
     * @return {number} mean count of requests in integer
     */
    static calculateMeanAdmissionRequestsInHour(minTimeSec, maxTimeSec, hours) {

        if (minTimeSec > maxTimeSec || hours === 0) throw new CalculateMeanRequestHourError

        const meanTimeInSec = (minTimeSec + maxTimeSec) / 2
        return Math.floor(3600 * hours / meanTimeInSec)
    }

    /**
     * @return {number} mean frequency processing
     */
    static calculateFrequencyRequestsProcessingInHour(minTimeSec, maxTimeSec, hours) {

        if (minTimeSec > maxTimeSec || hours === 0) throw new CalculateMeanRequestHourError

        const meanTimeInSec = (minTimeSec + maxTimeSec) / 2
        const meanTimeInMinutes = TimeUtils.secondsToMinutes(meanTimeInSec)

        return CoreNumberUtils.toFixedDigitsAfterComma(meanTimeInMinutes / 60 * hours)
    }

    /**
     * @return {number} service flow rate
     */
    static serviceFlowRate(admissionRequestsInHour, frequencyRequestsProcessingInHour) {
        return admissionRequestsInHour * frequencyRequestsProcessingInHour
    }

    /**
     * @return {number} probability from 0 to 1
     */
    static probabilityOfReject(loadIntensity, channelSize, bufferSize, probabilityThatChannelIsFree) {
        let result = 0
        let firstMultiplier = Math.pow(loadIntensity, channelSize + bufferSize)
            / (Math.pow(channelSize, bufferSize) * MathUtils.factorial(channelSize))
        result = firstMultiplier * probabilityThatChannelIsFree
        return CoreNumberUtils.toFixedDigitsAfterComma(result)
    }

    /**
     * @return {number} integer of count of processed request
     */
    static countOfProcessedRequests(minTimeSec, maxTimeSec, hours) {
        const frequencyRequestsProcessingInHour = (minTimeSec + maxTimeSec) / 2;
        return (3600 * hours) / frequencyRequestsProcessingInHour
    }

    static loadIntencity(loadIntencityRequests, loadIntencityService) {
        return loadIntencityRequests / loadIntencityService;
    }

    static probabilityThatChannelIsWork(probabilityThatChannelIsFree) {
        return CoreNumberUtils.toFixedDigitsAfterComma(1 - probabilityThatChannelIsFree)
    }

    static probabilityThatChannelIsFree(loadIntencity, channelSize, bufferSize) {

        let firstSummResult = 0
        for (let i = 0; i <= channelSize; i++) {
            firstSummResult += Math.pow(loadIntencity, i) / MathUtils.factorial(i)
        }

        let secondSumMultiplayer = Math.pow(loadIntencity, channelSize)

        let secondSummResult = 0
        for (let i = 1; i <= bufferSize; i++) {
            secondSummResult += Math.pow((loadIntencity / channelSize), i)
        }

        let result = 1 / (firstSummResult + secondSumMultiplayer * secondSummResult)
        return CoreNumberUtils.toFixedDigitsAfterComma(result)
    }

    static probabilityThatOneChannelIsWork(loadIntencity, probabilityThatChannelIsFree) {
        let result =
            (Math.pow(loadIntencity, 1) / CoreNumberUtils.toFixedDigitsAfterComma(1)) * probabilityThatChannelIsFree
        return CoreNumberUtils.toFixedDigitsAfterComma(result)
    }

    static calculateMeanNumberOfRequestsInSystem(numberOfRequestsInQueue, numberOfRequestsInServed) {
        const result = numberOfRequestsInQueue + numberOfRequestsInServed;
        return CoreNumberUtils.toFixedDigitsAfterComma(result);
    }

    static calculateMeanNumberOfRequestsInServed(loadIntencity, probabilityOfService) {
        const result = loadIntencity * probabilityOfService;
        return CoreNumberUtils.toFixedDigitsAfterComma(result);
    }

    static probabilityOfServiced(probabilityOfReject) {
        const result = 1 - probabilityOfReject;
        return CoreNumberUtils.toFixedDigitsAfterComma(result);
    }

    static absoluteBandWidth(probabilityOfServiced, meanAdmissionRequestsInHour) {
        const result = probabilityOfServiced * meanAdmissionRequestsInHour;
        return CoreNumberUtils.toFixedDigitsAfterComma(result);
    }

    static calculateMeanTimeOfRequestInSystem(meanNumberOfRequestsInSystem, absoluteBandWidth) {
        const result = meanNumberOfRequestsInSystem / absoluteBandWidth;
        return CoreNumberUtils.toFixedDigitsAfterComma(result);
    }

    static calculateMeanTimeOfRequestInQueue(meanRequestsInSystem, absoluteBandwidth, timeForProcessingOneRequest) {
        let result = (meanRequestsInSystem / absoluteBandwidth) - timeForProcessingOneRequest
        return CoreNumberUtils.toFixedDigitsAfterComma(result)
    }

    static calculateProbabilityOfLastP(bufferSize, amountOfChannels, loadIntensity) {
        let revertedLoadIntensity = Math.pow(loadIntensity, -1)
        let result = 0
        let denominator = 0
        for (let k = 0; k <= bufferSize + amountOfChannels; k++) {
            denominator += Math.pow(revertedLoadIntensity, k)
        }
        result = 1 / denominator
        return CoreNumberUtils.toFixedDigitsAfterComma(result)
    }

    static calculateProbabilitiesOfPsFromOneForLast(bufferSize, amountOfChannels, loadIntensity) {
        let revertedLoadIntensity = Math.pow(loadIntensity, -1)

        let result = []
        let lastP = this.calculateProbabilityOfLastP(
            bufferSize,
            amountOfChannels,
            loadIntensity
        )
        console.log(lastP)

        for (let i = 0; i <= bufferSize + amountOfChannels; i++) {
            let firstMultiplier = Math.pow(revertedLoadIntensity, bufferSize + amountOfChannels - i)
            let pFromI = firstMultiplier * lastP
            result.push(CoreNumberUtils.toFixedDigitsAfterComma(pFromI))
        }
        console.log(result)

        let tempResult = 0;
        result.forEach((value => {
            tempResult += value
        }))
        console.log(tempResult)

        return result
    }

    static calculateMeanNumberOfRequestInQueue(loadIntencity, amountOfChannels, bufferSize, probabilityThatChannelIsFree) {
        const allAddictionInNumerator = Math.pow(loadIntencity, amountOfChannels + 1) *
            (1 - Math.pow(loadIntencity / amountOfChannels, bufferSize) * (bufferSize + 1 - bufferSize * loadIntencity / amountOfChannels));
        const allAddictionInDominator = MathUtils.factorial(amountOfChannels * amountOfChannels) *
            Math.pow((1 - (loadIntencity / amountOfChannels)), 2);

        const result = allAddictionInNumerator / allAddictionInDominator * probabilityThatChannelIsFree;
        return CoreNumberUtils.toFixedDigitsAfterComma(result)
    }
}

class CalculateMeanRequestHourError extends Error {
}
