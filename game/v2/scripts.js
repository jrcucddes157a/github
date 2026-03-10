(function () {
    'use strict'

    console.log('reading js')

    // Functions to Implement:
    // 1. Card Functions with...
        // Probability of picks
            // Common: jack, queen
            // Rare: King
            // Very Rare: Joker
            // Extremely Rare: God
        // Shuffle on start
        // Face Down Deal on start
        // Use Card function with effects and timing
        // Reshuffle and pull out card based on whether p1 or 2 has passed 5 of their own turns

    // 2. Win Conditions and Screens

    const rollBtn = document.querySelector('#roll')
    const attackBtn = document.querySelector('#attack')
    const restartBtn = document.querySelector('#restart')
    const howToPlayBtn = document.querySelector('#howtoplay')
    const crossBtn = document.querySelector('#cross')
    const backToGameBtn = document.querySelector('.backtogame')

    const howToPlaySect = document.querySelector('#howto')

    const healBtn = document.querySelector('#heal')
    const p1Dice = document.querySelector('#p1dice')
    const p2Dice = document.querySelector('#p2dice')

    const p1HP = document.querySelector('#p1hpnum')
    const p2HP = document.querySelector('#p2hpnum')
    const p1HPBar = document.querySelector('#p1health')
    const p2HPBar = document.querySelector('#p2health')
    
    const overburstFailText = document.querySelector('#failure')

    const game = {
        dieRollNum: 0,
        diceImgs: ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'],
        roll1: 0,
        roll2: 0,
        rollTotal1: 0,
        rollTotal2: 0,
        rollTotal3: 0,
        p1attack: 0,
        p2attack: 0,
        p1health: 500,
        p2health: 500,
        playerTurn: true,
        p1heals: 3,
        p2heals: 3,
        healAmount: 0,
        cards: []
    }

    p1HP.innerHTML = `${game.p1health}`
    p2HP.innerHTML = `${game.p2health}`

    function updateHPBars() {
        p1HPBar.style.width = `${(game.p1health / 500) * 100}%`
        p1HP.innerHTML = `${game.p1health}`
        p2HPBar.style.width = `${(game.p2health / 500) * 100}%`
        p2HP.innerHTML = `${game.p2health}`
    }

    function updateHealUI() {
        const dotUI = document.querySelectorAll('.dot')
        const heals = game.playerTurn ? game.p1heals : game.p2heals

        if (heals <= 0) {
            healBtn.disabled = true
        }

        for (let i = 0; i < dotUI.length; i++) {
            if (i < heals) {
                dotUI[i].classList.add('dot-active')
            } else {
                dotUI[i].classList.remove('dot-active')
            }
        }

    }

    function updateTurnUI() {
        const p1Text = document.querySelector('#p1text')
        const p2Text = document.querySelector('#p2text')

        if (game.playerTurn) {
            p1Text.style.color = 'gold'
            p2Text.style.color = 'black'
        } else {
            p1Text.style.color = 'black'
            p2Text.style.color = 'gold'
        }
    }

    updateTurnUI()

    function switchTurn() {
        game.playerTurn = !game.playerTurn
        game.dieRollNum = 0
        game.rollTotal1 = 0
        game.rollTotal2 = 0
        game.rollTotal3 = 0
        game.p1attack = 0
        game.p2attack = 0
        game.healAmount = 0
        rollBtn.innerHTML = 'ROLL'
        rollBtn.disabled = false
        overburstFailText.style.display = 'none'
        console.log('player turn over')

        if (game.playerTurn) {
            console.log('player 1 turn')
        } else {
            console.log('player 2 turn')
        }
        updateTurnUI()
        updateHealUI()
    }

    function restart() {
        game.p1health = 500
        game.p1heals = 3
        game.p2health = 500
        game.p2heals = 3
        game.dieRollNum = 0
        game.healAmount = 0
        game.playerTurn = true
        game.rollTotal1 = 0
        game.rollTotal2 = 0
        game.rollTotal3 = 0
        updateHPBars()
        updateHealUI()
        updateTurnUI()
    }

    attackBtn.addEventListener('pointerdown', attack)
    healBtn.addEventListener('pointerdown', heal)
    restartBtn.addEventListener('pointerdown', function() {
        console.log('restart pushed')
        restart()
    })

    rollBtn.addEventListener('pointerdown', function () {
        game.dieRollNum++
        console.log(`Roll Number: ${game.dieRollNum}`)
        if (game.dieRollNum <= 2) {
            dieRoll()

            if (game.dieRollNum === 2) {
                rollBtn.innerHTML = 'OVERBURST'
            }
        } else if (game.dieRollNum === 3) {
            console.log('overburst on')
            overburst()
        }
    })

    function hideHowTo() {
        howToPlaySect.style.display = 'none'
    }

    howToPlayBtn.addEventListener('pointerdown', function() {
        howToPlaySect.style.display = 'block'
    })

    backToGameBtn.addEventListener('pointerdown', hideHowTo)
    crossBtn.addEventListener('pointerdown', hideHowTo)

    function dieRoll() {
        game.roll1 = Math.floor(Math.random() * 6) + 1
        game.roll2 = Math.floor(Math.random() * 6) + 1
        console.log(game.roll1, game.roll2)

        switch (game.dieRollNum) {
            case 1:
                game.rollTotal1 = game.roll1 + game.roll2
                console.log(game.rollTotal1)
                break
            case 2:
                game.rollTotal2 = game.roll1 + game.roll2
                console.log(game.rollTotal2)
                break
            case 3:
                game.rollTotal3 = game.roll1 + game.roll2
                console.log(game.rollTotal3)
                break
            default:
                console.log('ERROR: not adding totals')
                break
        }
    }

    function attack() {
        if (game.playerTurn) {
            game.p1attack = game.rollTotal1 + game.rollTotal2 + game.rollTotal3
            console.log('Player 1 attacks! Damage:' + game.p1attack)
            game.p2health -= game.p1attack
            console.log('Player 2 Health: ' + game.p2health)
        } else {
            game.p2attack = game.rollTotal1 + game.rollTotal2 + game.rollTotal3
            console.log('Player 2 attacks! Damage:' + game.p2attack)
            game.p1health -= game.p2attack
            console.log('Player 1 Health: ' + game.p1health)  
        }

        //Changes turn and resets values for next player
        updateHPBars()
        switchTurn()
    }

    function overburst() {
        dieRoll()

        if (game.rollTotal3 < 6) { 
            console.log('overburst failed, swapping turns')
            switchTurn()
        } else {
            console.log('overburst successful, attack value added')
            overburstFailText.style.display = 'block'
            console.log(game.rollTotal3)
        }

        rollBtn.disabled = true
    }

    function heal() {
        let heals = game.playerTurn ? game.p1heals : game.p2heals

        if (heals <= 0) {
            game.healAmount = 0
            return
        }

        heals--

        if (game.playerTurn) {
            game.p1heals = heals
        } else {
            game.p2heals = heals
        }

        game.healAmount = game.rollTotal1 + game.rollTotal2 + game.rollTotal3

        if (game.playerTurn) {
            game.p1health += game.healAmount
            p1HP.innerHTML = `${game.p1health}`
        } else {
            game.p2health += game.healAmount
            p2HP.innerHTML = `${game.p2health}`
        }

        if (game.p1health > 500) {
            game.p1health = 500
        }

        if (game.p2health > 500) {
            game.p2health = 500
        }

        // Changes turn and resets value for next player
        console.log('player turn over')
        updateHPBars()
        switchTurn()
        console.log(game.playerTurn ? game.p1heals : game.p2heals)
    }

    updateHPBars()
    updateHealUI()
})()