(function(){
    'use strict'

    console.log ('reading js')

    // Things to Code & Implement:

    // 1: Load Screen
    // 2: Fix Back Button for No Response Page and Radio Buttons
    // 3: Separate Screens for Inputs to fit small height
    // 4: Transition Screen Between Form Changes

    const initButtonSelect = document.querySelector('#init-button')
    const initFormSelect = document.querySelector('#init-qs')
    const initImgs = document.querySelector('#init-img')

    const aliensRealForm = document.querySelector('#aliens-real')
    const aliensRealImgs = document.querySelector('#aliens-real-img')

    const aliensFakeForm = document.querySelector('#aliens-fake')
    const aliensFakeImgs = document.querySelector('#aliens-fake-img')

    const aliensYes = document.querySelector('#yes-aliens')
    const aliensNo = document.querySelector('#no-aliens')

    const prevButton = document.querySelector('.prev')
    const nextButton = document.querySelector('.next')

    let progressBarPercent = document.querySelector('#percent-complete')
    let progressBarVisual = document.querySelector('#progress-bar')

    initButtonSelect.addEventListener('click', function(){
        if (aliensYes.checked) {
            initFormSelect.style.display = 'none'
            initImgs.style.display = 'none'

            aliensRealForm.style.display = 'block'
            aliensRealImgs.style.display = 'contents'

            progressBarPercent.innerHTML = '20'
            progressBarVisual.style.width = '20%'
        } else if (aliensNo.checked) {
            initFormSelect.style.display = 'none'
            initImgs.style.display = 'none'

            aliensFakeForm.style.display = 'block'
            aliensFakeImgs.style.display = 'contents'

            progressBarPercent.innerHTML = '20'
            progressBarVisual.style.width = '20%'
        } else {
            alert("Please select an option.")
        }
    })

    // Back button not working for "aliensFake" pages; why???
    prevButton.addEventListener('click', function(){
        aliensFakeForm.style.display = "none"
        aliensFakeImgs.style.display = 'none'

        aliensRealForm.style.display = "none"
        aliensRealImgs.style.display = 'none'

        initFormSelect.style.display = "block"
        initImgs.style.display = 'contents'

        progressBarPercent.innerHTML = '0'
        progressBarVisual.style.width = '0%'
    })
}())