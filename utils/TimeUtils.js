/**
 * @requires(CoreNumberUtils)
 */
class TimeUtils {

    static secondsToHours(seconds) {
        return CoreNumberUtils.toFixedFiveDigitsAfterComma(seconds / 3600)
    }

    static secondsToMinutes(seconds) {
        return CoreNumberUtils.toFixedFiveDigitsAfterComma(seconds / 60)
    }
}