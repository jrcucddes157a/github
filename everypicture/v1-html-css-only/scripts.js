(function () {
    'use strict'

    console.log('reading JS')

    const allXButtons = document.querySelectorAll('.cross')
    const allPopUps = document.querySelectorAll('.popup')

    const decadeHitbox = document.querySelector('#decadeoverlay')
    const kabutoHitbox = document.querySelector('#kabutooverlay')
    const driveHitbox = document.querySelector('#driveoverlay')
    const h1 = document.querySelector('h1')
    const period = document.querySelector('#period')
    const riderHitboxContainer = document.querySelector('.riderselect')
    const catchphrases = document.querySelectorAll('.catchphrase')

    for (let current of allPopUps) {
        current.style.display = 'none'
    }

    driveHitbox.addEventListener('pointerdown', function () {
        //Makes Sure to Close Other Windows if Any Other Are Open
        
        allPopUps[2].style.display = 'flex'
        
        centerHitboxes()
    })

    kabutoHitbox.addEventListener('pointerdown', function () {
        allPopUps[1].style.display = 'flex'

        centerHitboxes()
    })

    decadeHitbox.addEventListener('pointerdown', function () {
        allPopUps[0].style.display = 'flex'

        centerHitboxes()
    })

    for (let i = 0; i < allXButtons.length; i++) {
        allXButtons[i].addEventListener('pointerdown', function () {
            allPopUps[i].style.display = 'none'

            resetHitboxes()
        })
    }

    // setTimeout(function () {
    //     h1.innerHTML = "Transform"
    //     period.innerHTML = "."
    //     period.style.animation = "blinking 1s ease"
    //     setTimeout(function () {
    //         h1.innerHTML = "変身"
    //         period.innerHTML = "。"
    //         clearTimeout(3000)
    //     }, 3000)
    // }, 3000)

    for (let i = 0; i < catchphrases.length; i++) {
        catchphrases[i].addEventListener('mouseover', function() {
            switch (i) {
                case 0:
                    catchphrases[0].innerHTML = '通りすがりの仮面ライダーだ。覚えておけ！'
                    break
                case 1:
                    catchphrases[1].innerHTML = "おばあちゃんこの言ってた。。。"
                    break
                case 2:
                    catchphrases[2].innerHTML = "ひとっ走り付き合えよ！"
            }
        })

        catchphrases[i].addEventListener('mouseout', function() {
            switch (i) {
                case 0:
                    catchphrases[0].innerHTML = "I'm Just a Passing-Through Kamen Rider. Remember that!"
                    break
                case 1:
                    catchphrases[1].innerHTML = "Grandmother Said This..."
                    break
                case 2:
                    catchphrases[2].innerHTML = "Let's Go For a Ride!"
            }
        }) 
    }

    function centerHitboxes() {
        riderHitboxContainer.style.position = 'absolute'
        riderHitboxContainer.style.top = '50%'
        riderHitboxContainer.style.left = '50%'
        riderHitboxContainer.style.transform = 'translate(-50%, -50%)'
    }

    function resetHitboxes() {
        riderHitboxContainer.style.position = ''
        riderHitboxContainer.style.top = ''
        riderHitboxContainer.style.left = ''
        riderHitboxContainer.style.transform = ''
    }

})()