describe('TimeUtils', function () {

    describe('secondsToHours()', function () {
        it('should return 1 when passed 3600', function () {
            assert.strictEqual(TimeUtils.secondsToHours(3600), 1)
        })
        it('should return 0.00028 when passed 1', function () {
            assert.strictEqual(TimeUtils.secondsToHours(1), 0.00028)
        })
    })

    describe('secondsToMinutes(seconds)', function () {
        it('should return 1 when passed 60', function () {
            assert.strictEqual(TimeUtils.secondsToMinutes(60), 1)
        })
        it('should return 3 when passed 180', function () {
            assert.strictEqual(TimeUtils.secondsToMinutes(180), 3)
        })
        it('should return 0.5 when passed 30', function () {
            assert.strictEqual(TimeUtils.secondsToMinutes(30), 0.5)
        })
    })
})
