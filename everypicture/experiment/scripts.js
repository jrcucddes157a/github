(function () {
    'use strict'

    console.log('reading JS')

    const everyDiv = document.querySelectorAll('div')
    const mainZeroOneSelection = document.querySelector('#topper')
    const xButton = document.querySelector('.cross')
    const rotationImage = document.querySelector('.rotationimage')

    for (const divs of everyDiv) {
        if (divs.classList.contains('hidden')) {
            divs.style.display = 'none'
        }
        else {
            divs.style.display = 'block'
        }
    }

    mainZeroOneSelection.addEventListener('mouseover', function (e) {
        console.log('mouse is over zero one')
    })

    mainZeroOneSelection.addEventListener('pointerdown', function () {
        console.log('zero one got clicked')

        for (const divs of everyDiv) {
            // divs.style.animation = 'fadeInY 1s forwards'
            divs.style.display = 'block'
        }

        mainZeroOneSelection.style.display = 'none'
    })

    xButton.addEventListener('pointerdown', function () {
        for (const divs of everyDiv) {
            setTimeout(function () {
                // divs.style.animation = 'fadeOutY 1s backwards'
                setTimeout(function () {
                    divs.style.display = 'none'
                    mainZeroOneSelection.style.display = 'block'
                }, 950)
            }, 200)
        }
    })

    function reflection(e) {
        let mouseX = e.clientX
        let mouseY = e.clientY
        const windowX = window.innerWidth
        const windowY = window.innerHeight

        let reflectX = Math.floor((mouseX - windowX / 2) / (windowX / 2) * 35)
        let reflectY = Math.floor((mouseY - windowY / 2) / (windowY / 2) * 35)

        const rotationContainer = document.querySelector('.rotationimage')

        rotationContainer.style.transform = `rotateY(${reflectX}deg) rotateX(${reflectY}deg)`
    }

    document.addEventListener('mousemove', reflection)
})()