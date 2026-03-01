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

    const muteAllBtn = document.querySelector('#muteall')


    //Makes sure all popups are closed on load
    function allClosed() {
        for (let current of allPopUps) {
            current.style.display = 'none'
            current.classList.remove('lightbox-closed')
        }
    }

    //Sets All Henshin Sounds to Half Volume To Prevent Loudness
    for (let allHenshins of henshinSoundFiles) {
        allHenshins.volume = 0.5
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
            volumeBar[i].style.height = '0%'

            // Mutes All Audio and Displays Play Button by Default
            pause[i].style.display = 'none'
            song[i].muted = true
            volumeContainer[i].style.display = 'none'

            play[i].addEventListener('pointerdown', function () {
                play[i].style.display = 'none'
                pause[i].style.display = 'flex'
                song[i].play()
            })

            pause[i].addEventListener('pointerdown', function () {
                pause[i].style.display = 'none'
                play[i].style.display = 'flex'
                song[i].pause()
            })

            song[i].addEventListener('timeupdate', function () {
                songProgress = (song[i].currentTime / song[i].duration) * 100

                progressbar[i].style.width = `${songProgress}%`
            })

            progressContainer[i].addEventListener('pointerdown', function (e) {
                let pointerX = e.offsetX
                const containerWidth = progressContainer[i].clientWidth
                let wasPaused = song[i].paused

                console.log('progress bar clicked')
                console.log(pointerX / containerWidth)

                song[i].currentTime = (pointerX / containerWidth) * song[i].duration
                songProgress = (song[i].currentTime / song[i].duration) * 100
                progressbar[i].style.width = `${songProgress}%`

                if (wasPaused) {
                    song[i].pause()
                } else {
                    song[i].play()
                }
            })

            song[i].addEventListener('ended', function () {
                song[i].currentTime = 0;
                progressbar[i].style.width = '0%';
                pause[i].style.display = 'none'
                play[i].style.display = 'flex'
            })

            if (song[i].muted) {
                volumeContainer[i].style.right = '7.75rem'
            } else {
                volumeContainer[i].style.right = '9.25rem'
            }

            mute[i].addEventListener('pointerdown', function () {

                // Flips between T/F states on click
                song[i].muted = !song[i].muted

                if (song[i].muted) {
                    mute[i].style.backgroundColor = '#18181a'
                    volume = 0
                    song[i].volume = volume
                    volumeBar[i].style.height = '0%'
                    mute[i].innerHTML = 'MUTED'
                    volumeContainer[i].style.right = '7.75rem'
                } else {
                    mute[i].style.backgroundColor = 'darkgray'
                    volume = 50
                    song[i].volume = volume / 100
                    volumeBar[i].style.height = `${volume}%`
                    mute[i].innerHTML = 'UNMUTED'
                    volumeContainer[i].style.right = '9.25rem'
                }
            })

            volumeButton[i].addEventListener('pointerdown', function () {
                if (volumeContainer[i].style.display === 'block' && true) {
                    volumeContainer[i].style.display = 'none'
                } else {
                    volumeContainer[i].style.display = 'block'
                }
            })

            volumeContainer[i].addEventListener('pointerdown', function (e) {

                let volInputY = e.offsetY
                const containerHeight = volumeContainer[i].clientHeight

                volume = 100 - Math.floor((volInputY / containerHeight) * 100)
                volumeBar[i].style.height = ''
                volumeBar[i].style.height = `${volume}%`
                volumeBar[i].offsetHeight


                song[i].volume = volume / 100

                if (song[i].muted === true) {
                    song[i].muted = false
                    mute[i].style.backgroundColor = 'darkgray'
                }

                volume = Math.max(0, Math.min(100, volume))
            })

            // Function to Mute All Sound on the Website
            function muteAll() {
                let isMute = false

                muteAllBtn.addEventListener('pointerdown', function () {

                    isMute = !isMute

                    if (isMute) {
                        muteAllBtn.style.animation = 'muteAllActive 0.3s ease forwards'
                        volume = 0
                        song[i].volume = volume
                        henshinSoundFiles[i].volume = volume
                        muteAllBtn.innerHTML = 'UNMUTE ALL'
                    } else {
                        muteAllBtn.style.animation = ''
                        volume = 50
                        song[i].volume = volume / 100
                        henshinSoundFiles[i].volume = volume / 100
                        muteAllBtn.innerHTML = 'MUTE ALL'
                    }

                    console.log(isMute)

                })
            }

            muteAll()

            // Prevents Song Overlap by Checking if Previous Song was Playing 
            song[i].addEventListener('play', function() {
                for (let j = 0; j < song.length; j++) {
                    if (j !== i) {
                        song[j].pause()
                    }
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

            bg.style.transform = 'scale(3) translate(21%, -15%)'

            allPopUps[1].style.display = 'flex'
            allPopUps[1].classList.add('lightbox-open')
        })

        decadeHitbox.addEventListener('pointerdown', function () {
            henshinSoundFiles[0].play()

            for (let greens of allHitboxes) {
                greens.classList.remove('overlay-on')
                greens.classList.add('clicked')
            }

            allClosed()

            bg.style.transform = 'scale(3.5) translate(-19%, -2%)'

            allPopUps[0].style.display = 'flex'
            allPopUps[0].classList.add('lightbox-open')
        })

        driveHitbox.addEventListener('pointerdown', function () {
            henshinSoundFiles[2].play()

            for (let greens of allHitboxes) {
                greens.classList.remove('overlay-on')
                greens.classList.add('clicked')
            }

            allClosed()

            bg.style.transform = 'scale(4) translate(5%, -1%)'

            allPopUps[2].style.display = 'flex'
            allPopUps[2].classList.add('lightbox-open')
        })
    }

    hitBoxClick()

    // Close Button Function
    function closeButton() {
        for (let i = 0; i < allXButtons.length; i++) {
            allXButtons[i].addEventListener('pointerdown', function () {
                allPopUps[i].classList.remove('lightbox-open')
                allPopUps[i].classList.add('lightbox-closed')
                bg.style.transform = 'scale(1) translate(0,0)'

                allPopUps[i].addEventListener('animationend', function endClose(e) {
                    if (e.animationName === 'scaleOutY') {
                        allClosed()
                    }

                    allPopUps[i].removeEventListener('animationend', endClose)
                })
                
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