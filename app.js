import {MathUtils} from './utils/MathUtils.js'

let linStart = document.getElementById('linStart')
let greenBar = document.querySelector('.green__done')

const maxLengthOfBuffer = 4;

function lin() {
    let minimumAdmissionTime = +document.getElementById('Tzmin').value / 1000
    minimumAdmissionTime = +minimumAdmissionTime.toFixed(2)
    let maximumAdmissionTime = +document.getElementById('Tzmax').value / 1000
    maximumAdmissionTime = +maximumAdmissionTime.toFixed(2)

    let minTimeOfProcessing = +document.getElementById('Tsmin').value / 1000
    minTimeOfProcessing = +minTimeOfProcessing.toFixed(2)
    let maxTimeOfProcessing = +document.getElementById('Tsmax').value / 1000
    maxTimeOfProcessing = +maxTimeOfProcessing.toFixed(2)

    let timeOfServerWork = +document.getElementById('Tall').value / 1000

    let server_1 = 0

    const buffer = []

    for (let timeFromStart = 0; timeFromStart <= timeOfServerWork + 1;) {
        let progressBarStatus = (timeFromStart * 100) / timeOfServerWork

        let admissionTime = (maximumAdmissionTime - minimumAdmissionTime) * MathUtils.getRandomNumberFromZeroToOne() + minimumAdmissionTime
        admissionTime = parseInt(admissionTime.toFixed(2))

        let programProcessingTime = (maxTimeOfProcessing - minTimeOfProcessing) * MathUtils.getRandomNumberFromZeroToOne() + minTimeOfProcessing
        programProcessingTime = +programProcessingTime.toFixed(2)

        console.log(programProcessingTime)

        if (buffer.length > 0 && buffer.length <= maxLengthOfBuffer) {
            if (server_1 <= 0) {
                server_1 = buffer[0]
                buffer.shift()
            } else {
                if (buffer.length < maxLengthOfBuffer) {
                    buffer.push(programProcessingTime)
                } else {
                    console.log("program was rejected")
                }
            }
        } else if (buffer.length === 0) {
            if (server_1 <= 0) {
                server_1 = programProcessingTime
            } else {
                buffer.push(programProcessingTime)
            }
        }

        if (server_1 > 0) {
            server_1 = server_1 - admissionTime
        }
        greenBar.style.width = progressBarStatus + '%'

        timeFromStart = admissionTime
    }
}

linStart.addEventListener('click', ev => {
    ev.preventDefault()
    greenBar.style.width = 0 + '%'
    lin()

})

