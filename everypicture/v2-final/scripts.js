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

    const allMusicPlayers = document.querySelectorAll('.musicplayer')



    //Makes sure all popups are closed on load
    function allClosed() {
        for (let current of allPopUps) {
            current.style.display = 'none'
        }
    }

    allClosed()

    // Music Function
    function musicPlayer() {
        for (let i = 0; i < allMusicPlayers.length; i++) {
            const pause = document.querySelectorAll('.pause')
            const play = document.querySelectorAll('.play')
            const volumeButton = document.querySelectorAll('.volumetoggle')
            const volumeBar = document.querySelectorAll('.volumebar')
            const volumeContainer = document.querySelectorAll('.volumecontainer')
            const song = document.querySelectorAll('.song')
            const mute = document.querySelectorAll('.mute')
            const progressbar = document.querySelectorAll('.progressbar')
            const progressContainer = document.querySelectorAll('.progresscontainer')
            let volume = 0
            let songProgress = 0

            // Mutes All Audio and Displays Play Button by Default
            pause[i].style.display = 'none'
            song[i].muted = true
            volumeContainer[i].style.display = 'none'

            play[i].addEventListener('pointerdown', function () {
                play[i].style.display = 'none'
                pause[i].style.display = 'flex'
                song[i].muted = false
                song[i].play()
            })

            pause[i].addEventListener('pointerdown', function () {
                pause[i].style.display = 'none'
                play[i].style.display = 'flex'
                song[i].pause()
            })

            song[i].addEventListener('timeupdate', function() {
                songProgress = (song[i].currentTime / song[i].duration) * 100

                progressbar[i].style.width = `${songProgress}%`
            })

            progressbar[i].addEventListener('click', function(e) {
                let pointerX = e.offsetX
                const containerWidth = progressContainer[i].width

                song[i].currentTime = (pointerX / containerWidth)
            })

            mute[i].addEventListener('pointerdown', function() {
                volume = 0
                song[i].muted = true
            })

            volumeButton[i].addEventListener('pointerdown', function() {
                if (volumeContainer[i].style.display === 'block' && true) {
                    volumeContainer[i].style.display = 'none'
                } else {
                    volumeContainer[i].style.display = 'block'
                }
            })
        }
    }

    musicPlayer()

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

            bg.style.transform = 'scale(3) translate(20%, -17%)'

            allPopUps[1].style.display = 'flex'
        })

        decadeHitbox.addEventListener('pointerdown', function () {
            henshinSoundFiles[0].play()

            for (let greens of allHitboxes) {
                greens.classList.remove('overlay-on')
                greens.classList.add('clicked')
            }

            allClosed()

            bg.style.transform = 'scale(3.5) translate(-20%, -3%)'

            allPopUps[0].style.display = 'flex'
        })

        driveHitbox.addEventListener('pointerdown', function () {
            henshinSoundFiles[2].play()

            for (let greens of allHitboxes) {
                greens.classList.remove('overlay-on')
                greens.classList.add('clicked')
            }

            allClosed()

            bg.style.transform = 'scale(4) translate(3%, -1%)'

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