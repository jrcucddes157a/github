(function () {
    'use strict'

    console.log('reading JS')

    // Variable Defining
    const allXButtons = document.querySelectorAll('.cross')
    const allPopUps = document.querySelectorAll('.popup')

    const header = document.querySelector('header')
    const h1 = document.querySelector('h1')
    const bg = document.querySelector('#bg')
    const period = document.querySelector('#period')
    const riderHitboxContainer = document.querySelector('.riderselect')
    const allHitboxes = document.querySelectorAll('.riderselect svg g path')
    const catchphrases = document.querySelectorAll('.catchphrase')
    const henshinSoundFiles = document.querySelectorAll('#henshinsounds audio')

    //Makes sure all popups are closed on load
    function allClosed() {
        for (let current of allPopUps) {
            current.style.display = 'none'
        }
    }

    allClosed()

    // Hitbox Clicking to Open Popups
    function hitBoxClick() {
        const kabutoHitbox = document.querySelector('#kabutooverlay')
        const decadeHitbox = document.querySelector('#decadeoverlay')
        const driveHitbox = document.querySelector('#driveoverlay')

        for (let greens of allHitboxes) {
            greens.classList.add('overlay-on')
        }

        kabutoHitbox.addEventListener('pointerdown', function () {
            henshinSoundFiles[1].play()

            for (let greens of allHitboxes) {
                greens.classList.remove('overlay-on')
                greens.classList.add('clicked')
            }

            allClosed()

            bg.style.transform = 'scale(3) translate(500px, -250px)'

            allPopUps[1].style.display = 'flex'
        })

        decadeHitbox.addEventListener('pointerdown', function () {
            henshinSoundFiles[0].play()

            for (let greens of allHitboxes) {
                greens.classList.remove('overlay-on')
                greens.classList.add('clicked')
            }

            allClosed()

            bg.style.transform = 'scale(3.25) translate(-600px, -25px)'

            allPopUps[0].style.display = 'flex'
        })

        driveHitbox.addEventListener('pointerdown', function () {
            henshinSoundFiles[2].play()

            for (let greens of allHitboxes) {
                greens.classList.remove('overlay-on')
                greens.classList.add('clicked')
            }

            allClosed()

            bg.style.transform = 'scale(3.75) translate(100px, -25px'

            allPopUps[2].style.display = 'flex'
        })
    }

    hitBoxClick()

    // Close Button Function
    function closeButton() {
        for (let i = 0; i < allXButtons.length; i++) {
            allXButtons[i].addEventListener('pointerdown', function () {
                allPopUps[i].style.display = 'none'
                bg.style.transform = 'scale(1) translate(0,0)'

                setTimeout(function () {
                    for (let greens of allHitboxes) {
                        greens.classList.remove('clicked')
                        greens.classList.add('overlay-on')
                    }
                }, 1000)
            })
        }
    }

    closeButton()

    // Changes the Header Between JP and ENG every 3 Period Blinks
    function henshinText() {
        setTimeout(function () {
            h1.innerHTML = '変身<span id="period">。</span>'
            setTimeout(function () {
                h1.innerHTML = 'Transform<span id="period">.</span>'
                henshinText()
            }, 3000)
        }, 3000)
    }

    henshinText()

    function henshinSound() {
        for (let i = 0; i < allPopUps.length; i++) {
        }
    }

    // Changes Catchphrase Text to Japanese on Hover
    for (let i = 0; i < catchphrases.length; i++) {
        catchphrases[i].addEventListener('mouseover', function () {
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

        catchphrases[i].addEventListener('mouseout', function () {
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
})()