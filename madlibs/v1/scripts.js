(function(){
    'use strict'

    console.log ('reading js')

    // Things to Code & Implement:

    // 1: Load Screen (Transition Screen Between Form Changes and Page Changes)
    // 2: Fix Back Button for No Response Page and Radio Buttons
    // 3: Separate Screens for Inputs to fit small height
    // 4: Actual Madlib Code

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

    let progressBarPercent = document.querySelector('#percent-complete')
    let progressBarVisual = document.querySelector('#progress-bar')

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
            progressBarPercent.innerHTML = '20'
            progressBarVisual.style.width = '20%'
        }
        else if (aliensNo.checked) {
            path = 'fake'
            sections = fakeSections
            totalSections = fakeSections.length
            initFormSelect.style.display = 'none'
            aliensFakeForm.style.display = 'block'
            progressBarPercent.innerHTML = '20'
            progressBarVisual.style.width = '20%'
        }
        else {
            alert('Please select an option.')
        }
    }

    // Function for Validation of Current Section Inputs
    function checkCurrentSection() {
        const currentSection = section[currentPage - 1]
        const currentInputs = currentSection.querySelectorAll('input[type="text"]')

        for (let inputs of currentInputs) {
            if (inputs.value === '') {
                alert('Please fill out all text boxes.')
            }
        }
    }

    function updateUI() {
        alert(`Current Page: ${currentPage}`)
        alert(`Sections: ${totalSections}`)

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
        path = ''
        sections = []
        totalSections = 0
        } else {
            for (let i = 0; i < sections.length; i++) {
                switch (sections[i]) {
                    case i === currentPage - 1:
                        sections[i].style.display = 'block'
                        break
                    default: 
                        sections[i].style.display = 'hidden'
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
        } else {
            checkCurrentSection()
        }

        if (currentPage < totalSections) {
            currentPage++
            updateUI()
        } else if (currentPage === totalSections) {
            nextButton[currentPage].style.display = 'none'
            submitButton.style.display = 'block'
        }

        })
    }

    //Prev Button Function
    for (let i = 0; i < prevButton.length; i++) {
        prevButton[i].addEventListener('click', function() {
            if (currentPage > 0) {
                currentPage--
                updateUI()
            }
        })
    }
   
    // Submit Function
    fullFormSelect.addEventListener('submit', function(){
        if (aliensYes.checked) {
            submitButton.style.display = 'contents'
           yesMadLib()
        } else if (aliensNo.checked) {
            noMadLib()
        }
    })

    function yesMadLib() {
        const allYesTextInputs = document.querySelectorAll('#aliens-real input[type="text"]')

        let yesText

        // Returns an error if user hasn't filled out form fully
        // If no error, user gets completed madlib
        for (let i = 0; i < allYesTextInputs.length; i++) {
            if (allYesTextInputs[i].value == '') {
                alert ('ERROR: Please enter all text boxes.')
            } else {
                aliensRealForm.style.display = 'none'
                aliensRealImgs.style.display = 'contents'
                document.querySelector('#madlib-real').innerHTML = yesText
            }
        }
    }

    function noMadLib() {
        const allNoTextInputs = document.querySelectorAll('#aliens-fake input[type="text"]')

        let noText

        for (let i = 0; i < allNoTextInputs.length; i++) {
            if (allNoTextInputs[i].value == '') {
                alert ('ERROR: Please enter all text boxes.')
            } else {
                aliensFakeForm.style.display = 'none'
                aliensFakeImgs.style.display = 'contents'
                document.querySelector('#madlib-fake').innerHTML = noText
            }
        }
    }
}())