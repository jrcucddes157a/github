(function () {
    'use strict'

    console.log('reading JS')

    const allXButtons = document.querySelectorAll('.cross')
    const allPopUps = document.querySelectorAll('.popup')

    const header = document.querySelector('header')
    const h1 = document.querySelector('h1')
    const period = document.querySelector('#period')
    const riderHitboxContainer = document.querySelector('.riderselect')
    const allHitboxes = document.querySelectorAll('.riderselect img')
    const catchphrases = document.querySelectorAll('.catchphrase')

    function allClosed() {
        for (let current of allPopUps) {
            current.style.display = 'none'
        }
    }

    allClosed()

    for (let i = 0; i < allHitboxes.length; i++) {
        allHitboxes[i].addEventListener('pointerdown', function () {
            allClosed()
            allPopUps[i].style.display = 'flex'
        })
    }

    // Close Button Function
    for (let i = 0; i < allXButtons.length; i++) {
        allXButtons[i].addEventListener('pointerdown', function () {
            allPopUps[i].style.display = 'none'
        })
    }

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