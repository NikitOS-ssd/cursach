/**
 * @requires(CoreNumberUtils)
 */
class TimeUtils {

    static secondsToHours(seconds) {
        return CoreNumberUtils.toFixedDigitsAfterComma(seconds / 3600)
    }

    static secondsToMinutes(seconds) {
        return CoreNumberUtils.toFixedDigitsAfterComma(seconds / 60)
    }
}