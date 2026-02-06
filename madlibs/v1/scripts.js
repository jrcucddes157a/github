(function () {
    'use strict'

    console.log('reading js')

    // Things to Code & Implement:

    // 1: Load Screen (Transition Screen Between Form -> Mad Lib)
    // 2: Functional Progress Bar & Percentage
    // 3: Fix Logic Error when User Selects Neither on Initial Prompt
    // 4: Path Variable doesn't reset
    // 5: Previous Button ADDS instead of subtracting on first click??? WTF
    // 6: Submit Button Doesn't Disappear until 2 clicks after when going back; needs to be 1 click

    // Defining variables for use
    const fullFormSelect = document.querySelector('form')

    const initButtonSelect = document.querySelector('#init-button')
    const initFormSelect = document.querySelector('#init-qs')
    const initImgs = document.querySelector('#init-img')

    const aliensRealForm = document.querySelector('#aliens-real')
    const aliensRealImgs = document.querySelector('#aliens-real-img')
    const realSections = document.querySelectorAll('#aliens-real section')

    const aliensFakeForm = document.querySelector('#aliens-fake')
    const aliensFakeImgs = document.querySelector('#aliens-fake-img')
    const fakeSections = document.querySelectorAll('#aliens-fake section')

    const aliensYes = document.querySelector('#yes-aliens')
    const aliensNo = document.querySelector('#no-aliens')

    const submitButton = document.querySelector('#submit')

    const date = document.querySelector('#date')

    let progressBarPercent = document.querySelector('#percent-complete')
    let progressBarPercentNum = 0
    let progressBarVisual = document.querySelector('#progress-bar')
    const progressDIV = document.querySelector('#progress')

    const h1Target = document.querySelector('h1')

    // Getting Rid of Content for Initial Prompt in case of CSS Failure
    aliensFakeForm.style.display = 'none'
    aliensFakeImgs.style.display = 'none'
    aliensRealForm.style.display = 'none'
    aliensRealImgs.style.display = 'none'
    submitButton.style.display = "none"

    // Variables that track pathing and sections
    let currentPage = 0
    let path // Empty string to be set to "real" or 'fake'
    let sections = []
    let totalSections = 0

    // Hides Sections not labelled as class Showing
    const allSections = document.querySelectorAll('section')
    for (let i = 0; i < allSections.length; i++) {
        if (allSections[i].className === 'hidden') {
            allSections[i].style.display = 'none'
        }
    }

    // Variables for Button Tracking
    const nextButton = document.querySelectorAll('.next')
    const prevButton = document.querySelectorAll('.prev')

    // Function for Path Determination
    function determiner() {
        if (aliensYes.checked) {
            path = 'real'
            sections = realSections
            totalSections = realSections.length
            initFormSelect.style.display = 'none'
            aliensRealForm.style.display = 'block'
            progressBarPercentNum += 33
        }
        else if (aliensNo.checked) {
            path = 'fake'
            sections = fakeSections
            totalSections = fakeSections.length
            initFormSelect.style.display = 'none'
            aliensFakeForm.style.display = 'block'
            progressBarPercentNum += 20
        }
        else {
            alert('Please select an option.')
            return
        }
    }

    function updateUI() {
        console.log(`Current Page: ${currentPage}`)
        console.log(`Sections: ${totalSections}`)
        console.log(`Path: ${path}`)

        //Reset 
        if (currentPage === 0) {
            if (path === 'real') {
                aliensRealForm.style.display = 'none'
            } else if (path === 'fake') {
                aliensFakeForm.style.display = 'none'
            }
            initFormSelect.style.display = 'block'
            submitButton.style.display = 'none'
            aliensNo.checked = false
            aliensYes.checked = false
            path = 'none'
            sections = []
            totalSections = 0
            progressDIV.style.display = 'contents'
            h1Target.style.display = 'block'
            progressBarPercentNum = 0
            progressBarPercent.innerHTML = progressBarPercentNum
            progressBarVisual.style.width = progressBarPercentNum
        } else {
            for (let i = 0; i < sections.length; i++) {
                switch (i) {
                    case currentPage - 1:
                        sections[i].style.display = 'block'
                        break
                    default:
                        sections[i].style.display = 'none'
                        break
                }
            }
        }
    }

    // Next Button Function
    for (let i = 0; i < nextButton.length; i++) {
        nextButton[i].addEventListener('click', function () {
            if (currentPage === 0) {
                determiner()
            }
            if (currentPage === totalSections - 1) {
                nextButton[currentPage - 1].style.display = 'none'
                submitButton.style.display = 'block'
            }
            currentPage++
            updateUI()

            if (path === 'fake') {
                progressBarPercent.innerHTML = `${progressBarPercentNum}`
                progressBarPercentNum += 20
                progressBarVisual.style.width = `${progressBarPercentNum - 10}%`
            }

            if (path === 'real') {
                progressBarPercent.innerHTML = `${progressBarPercentNum}`
                progressBarPercentNum += 33
                progressBarVisual.style.width = `${progressBarPercentNum - 33}%`
            }
        })
    }

    //Prev Button Function
    for (let i = 0; i < prevButton.length; i++) {
        prevButton[i].addEventListener('click', function () {
            if (currentPage <= 0) {
                return
            }

            currentPage--
            updateUI()

            if (currentPage != totalSections - 1) {
                submitButton.style.display = 'none'

                for (let i = 0; i < nextButton.length; i++) {
                    if (path === 'real') {
                        nextButton[1].style.display = 'flex'
                    } else if (path === 'fake') {
                        nextButton[2].style.display = 'flex'
                    }
                }
            }

            if (path === 'fake') {
                progressBarPercent.innerHTML = `${progressBarPercentNum}`
                progressBarPercentNum = progressBarPercentNum - 20
                progressBarVisual.style.width = `${progressBarPercentNum - 10}%`
            }

            if (path === 'real') {
                progressBarPercent.innerHTML = `${progressBarPercentNum}`
                progressBarPercentNum -= 33
                progressBarVisual.style.width = `${progressBarPercentNum - 33}%`
            }
        })
    }

    function yesMadLib() {
        const allYesTextInputs = document.querySelectorAll('#aliens-real input[type="text"]')

        date.innerHTML = '03.02.2089 | 19:23'

        let yesText = `<p><b>-----LOG BEGIN.</b></p><p>Houston, you’re never going to believe this. But I came across an extraterrestrial life form while making my rounds on the Moon.</p><p>He was <b>${allYesTextInputs[0].value}</b> with <b>${allYesTextInputs[1].value}</b> eyes that looked <b>${allYesTextInputs[2].value}</b>. I didn't know what to make of the thing until he started <b>${allYesTextInputs[3].value}</b>. Then I only grew curious. I radioed in Charleston for backup and he was amazed at the sight too.</p><p>Things were going swell until that <b>${allYesTextInputs[4].value}</b> idiot, <b>${allYesTextInputs[5].value}</b>, started mocking the thing by <b>${allYesTextInputs[6].value}</b>. The alien started babbling in some language that sounded like <b>${allYesTextInputs[7].value}</b> and it sounded really angry! Even worse, <b>${allYesTextInputs[5].value}</b> provoked it harder by <b>${allYesTextInputs[8].value}</b>!</p><p>Things were so tense as the alien blank stared at <b>${allYesTextInputs[5].value}</b> for a solid <b>${allYesTextInputs[9].value}</b> while we tried to soothe it. Then, the next thing I know, it pulls out some huge tool that looks like a <b>${allYesTextInputs[10].value}</b>, and within a second, <b>${allYesTextInputs[5].value}</b> is a pile of ash on the moon floor. I couldn't even process what happened before witnessing them get mixed in with moon rock dust.</p><p>We immediately threw our hands up and surrendered, but the alien laughed at us, <b>${allYesTextInputs[11].value}</b>, and then disappeared in a flash. Like as if he didn’t just murder someone within seconds using technology we can’t hope to comprehend.</p><p>So yea, future warning: never poke fun at aliens ever again. Or talk to them. They’re assholes.</p><p><b>-----LOG END.</b></p>`

        // Returns an error if user hasn't filled out form fully
        // If no error, user gets completed madlib
        for (let i = 0; i < allYesTextInputs.length; i++) {
            if (allYesTextInputs[i].value === '') {
                alert('ERROR: Please go back and enter all text boxes.')
                return
            } else {
                document.querySelector('#madlib-real').innerHTML = yesText
            }
        }

        // Runs only after loop completes successfully
        submitButton.style.display = 'none'
        aliensRealForm.style.display = 'none'
        initImgs.style.display = 'none'
        aliensRealImgs.style.display = 'contents'
        progressDIV.style.display = 'none'
        h1Target.style.display = 'none'
    }

    function noMadLib() {
        const allNoTextInputs = document.querySelectorAll('#aliens-fake input[type="text"]')

        date.innerHTML = '03.02.2089 | 19:23'

        let noText = `<p><b>-----LOG BEGIN.</b></p><p>Another boring day at the International Space Station. Okay, well, I guess I can’t say that, but I don’t like to talk about it.</p><p>Our little prankster, the <b>${allNoTextInputs[0].value}</b> astronaut asshole supreme, <b>${allNoTextInputs[1].value}</b> decided to pull the worst practical joke on me. I was due for some work in the Russian sector and it unfortunately required me to do a space walk.</p><p>First, <b>${allNoTextInputs[1].value}</b> decides to jam mashed <b>${allNoTextInputs[2].value}</b> in my <b>${allNoTextInputs[3].value}</b>! Do you know how hard it is to freaking clean those?! Imagine my disgust too as I feel it get into my <b>${allNoTextInputs[4].value}</b>. Just nasty.</p><p>Then, I noticed on the way to the airlock that he <b>${allNoTextInputs[5].value}</b> my <b>${allNoTextInputs[6].value}</b> to the ceiling! How the hell he managed to get my locker combination I will never know. Here I thought I had it locked down tight and that no one knew it. I never told a soul, so how did he find out?!</p><p>But easily the worst part is that jackass wired a <b>${allNoTextInputs[7].value}</b> on the outside of the ISS to blow hot air in my face and scare me. And guess what? It worked a little <em>too well</em>. I lost grip and spun around at least <b>${allNoTextInputs[8].value}</b> times!</p><p>I <b>${allNoTextInputs[9].value}</b> on the radio for help as I'm being dragged by the ISS in mid space like a <b>${allNoTextInputs[10].value}</b> on a rope tied to a <b>${allNoTextInputs[11].value}</b>! It was embarrassing and mortifying at the same time.</p><p>I'm lucky <b>${allNoTextInputs[12].value}</b> came out to save me and that I managed to grab a hold of something with my <b>${allNoTextInputs[13].value}</b>.</p><p>Needless to say I <b>${allNoTextInputs[14].value}</b> <b>${allNoTextInputs[1].value}</b> in the <b>${allNoTextInputs[15].value}</b>. Nobody argued with me because as far as we're all concerned, they deserved it.</p><p>Hopefully you’ll consider disciplinary action against them. Right?</p>They’re assholes.</p><p><b>-----LOG END.</b></p>`

        for (let i = 0; i < allNoTextInputs.length; i++) {
            if (allNoTextInputs[i].value == '') {
                alert('ERROR: Please go back and enter all text boxes.')
                return
            } else {
                document.querySelector('#madlib-fake').innerHTML = noText
            }
        }

        // Runs only after loop completes successfully
        submitButton.style.display = 'none'
        aliensFakeForm.style.display = 'none'
        initImgs.style.display = 'none'
        aliensFakeImgs.style.display = 'contents'
        progressDIV.style.display = 'none'
        h1Target.style.display = 'none'
        document.querySelector('#madlib-real').style.display = 'none'
    }

    // Submit Function
    submitButton.addEventListener('click', function (e) {
        e.preventDefault()

        if (aliensYes.checked) {
            yesMadLib()
        }

        if (aliensNo.checked) {
            noMadLib()
        }
    })
}())