(function () {
    'use strict'

    console.log('reading js')

    // Functions to Implement:
    // 1. Card Functions with...
    // Use Card function with effects and timing
    // Reshuffle and pull out card based on whether p1 or 2 has passed 5 of their own turns

    const rollBtn = document.querySelector('#rollcontainer #roll')
    const attackBtn = document.querySelector('#attack')
    const restartBtn = document.querySelectorAll('.restart')
    const howToPlayBtn = document.querySelector('#howtoplay')
    const crossBtn = document.querySelector('#cross')
    const backToGameBtn = document.querySelector('.backtogame')
    const useCardBtn = document.querySelector('#usecard')

    let swap


    const howToPlaySect = document.querySelector('#howto')
    const p1Win = document.querySelector('#p1win')
    const p2Win = document.querySelector('#p2win')

    const healBtn = document.querySelector('#heal')
    const p1Dice = document.querySelector('#p1dice')
    const p2Dice = document.querySelector('#p2dice')
    const p1KingDice = document.querySelector('#p1kingdice')
    const p2KingDice = document.querySelector('#p2kingdice')

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
        roll3: 0,
        roll4: 0,
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
        cards: [],
        p1card: '',
        p1turns: 7,
        p2card: '',
        p2turns: 7,
        cardImgs: ['K.png', 'G.png', 'JA.png', 'JO.png', 'Q.png', 'cardback.png'],

        //Card Variables
        p1JackPending: false,
        p2JackPending: false,
        p2QueenEffectPending: false,
        p1QueenEffectPending: false,
        p2KingPending: false,
        p1KingPending: false,
        kingMode: false
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

    function applyPendingCardEffects() {
        //Ensures Card Effects only happen on next turn after switchTurn()
        game.kingMode = false

        if (game.playerTurn) {
            if (game.p1KingPending) {
                game.p1KingPending = false
                game.kingMode = true
                console.log('king mode active for p1. 4 dice per roll')
            }
        }
        else {
            if(game.p2KingPending) {
                game.p2KingPending = false
                game.kingMode = true
                console.log('king mode active for p1. 4 dice per roll')
            }
        }
    }

    updateTurnUI()
    cardDeck()

    function switchTurn() {
        game.playerTurn = !game.playerTurn
        overburstFailText.style.opacity = '0'
        rollBtn.disabled = false
        rollBtn.innerHTML = 'ROLL'
        game.dieRollNum = 0
        game.rollTotal1 = 0
        game.rollTotal2 = 0
        game.rollTotal3 = 0
        game.p1attack = 0
        game.p2attack = 0
        game.healAmount = 0
        const diceDiv = game.playerTurn ? p1Dice : p2Dice
        diceDiv.innerHTML = ''
        const kingDiceDiv = game.playerTurn ? p1KingDice : p2KingDice
        kingDiceDiv.innerHTML = ''

        console.log('player turn over')
        updateTurnUI()
        updateHealUI()
        applyPendingCardEffects()
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
        game.p1JackPending = false
        game.p1KingPending = false
        game.p2AttackHalved = false
        game.p2JackPending = false
        game.p1QueenEffectPending = false
        game.p2KingPending = false
        game.kingMode = false

        rollBtn.disabled = false
        rollBtn.innerHTML = 'ROLL'
        healBtn.disabled = false
        attackBtn.disabled = false

        p1Dice.innerHTML = ''
        p2Dice.innerHTML = ''
        p1KingDice.innerHTML = ''
        p2KingDice.innerHTML = ''

        p1Win.style.display = 'none'
        p2Win.style.display = 'none'

        updateHPBars()
        updateHealUI()
        updateTurnUI()
    }

    attackBtn.addEventListener('pointerdown', attack)
    healBtn.addEventListener('pointerdown', heal)

    for (let i = 0; i < restartBtn.length; i++) {
        restartBtn[i].addEventListener('pointerdown', restart)
    }

    rollBtn.addEventListener('pointerdown', function () {
        game.dieRollNum++
        console.log(`Roll Number: ${game.dieRollNum}`)
        if (game.dieRollNum <= 2) {
            dieRoll()

            //King Check
            if (game.kingMode === true) {
                kingDieRoll()
            }

            if (game.dieRollNum === 2) {
                rollBtn.innerHTML = 'OVERBURST!!'
            }
        } else if (game.dieRollNum === 3) {
            console.log('overburst on')
            overburst()
        }
    })

    function hideHowTo() {
        howToPlaySect.style.display = 'none'
    }

    howToPlayBtn.addEventListener('pointerdown', function () {
        howToPlaySect.style.display = 'block'
    })

    backToGameBtn.addEventListener('pointerdown', hideHowTo)
    crossBtn.addEventListener('pointerdown', hideHowTo)

    useCardBtn.addEventListener('pointerdown', function () {
        //Checks what card it has and applies effect

        if (game.playerTurn) {
            if (game.p1card === 'JA') {
                game.p1JackPending = true
                console.log('Jack used - first roll doubled on NEXT turn')
            }
            else if (game.p1card === 'JO') {
                const p2HealthBefore = game.p2health
                game.p2health = game.p1health
                game.p1health = p2HealthBefore
                updateHPBars()
                console.log('Joker used - HP swapped')
            }
            else if (game.p1card === 'Q') {
                game.p2QueenEffectPending = true
            } else if (game.p1card === 'K') {
                game.p1KingPending = true
            } else if (game.p1card === 'G') {
                //Instant attack that is 25% of health; God card
                game.p1attack = Math.round(game.p1health * 0.25)
                game.p2health -= game.p1attack
                updateHPBars()
            }

            console.log('card used')
            game.p1card = ''
            console.log('card gone')
            
        }
        else {
            if (game.p2card === 'JA') {
                game.p2JackPending = true
                console.log('Jack used - first roll doubled on NEXT turn')
            }
            else if (game.p2card === 'JO') {
                const p1HealthBefore = game.p1health
                game.p1health = game.p2health
                game.p2health = p1HealthBefore
                updateHPBars()
                console.log('Joker used - HP swapped')
            }
            else if (game.p2card === 'Q') {
                game.p1QueenEffectPending = true
            } else if (game.p2card === 'K') {
                game.p2KingPending = true
            } else if (game.p2card === 'G') {
                //Instant attack that is 25% of health; God card
                game.p2attack = Math.round(game.p2health * 0.25)
                game.p1health -= game.p2attack
                updateHPBars()
            }
        }

        switchTurn()
    })

    function kingDieRoll() {
        game.roll3 = Math.floor(Math.random() * 6) + 1
        game.roll4 = Math.floor(Math.random() * 6) + 1
        console.log(game.roll3, game.roll4)

        const kingDiceDiv = game.playerTurn ? p1KingDice : p2KingDice

        kingDiceDiv.innerHTML += `<img src="images/${game.diceImgs[game.roll3 - 1]}">`
        kingDiceDiv.innerHTML += `<img src="images/${game.diceImgs[game.roll4 - 1]}">`

        switch (game.dieRollNum) {
            case 1:
                game.rollTotal1 = game.roll1 + game.roll2 + game.roll3 + game.roll4
                console.log(game.rollTotal1)
                break
            case 2:
                game.rollTotal2 = game.roll1 + game.roll2 + game.roll3 + game.roll4
                console.log(game.rollTotal2)
                break
            case 3:
                game.rollTotal3 = game.roll1 + game.roll2 + game.roll3 + game.roll4
                console.log(game.rollTotal3)
                break
            default:
                console.log('ERROR: not adding totals')
                break
        }
    }

    function dieRoll() {
        game.roll1 = Math.floor(Math.random() * 6) + 1
        game.roll2 = Math.floor(Math.random() * 6) + 1
        console.log(game.roll1, game.roll2)

        const diceDiv = game.playerTurn ? p1Dice : p2Dice
        const kingDiceDiv = game.playerTurn ? p1KingDice : p2KingDice

        diceDiv.innerHTML += `<img src="images/${game.diceImgs[game.roll1 - 1]}">`
        diceDiv.innerHTML += `<img src="images/${game.diceImgs[game.roll2 - 1]}">`

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

        //Jack Check
        if (game.playerTurn && game.p1JackPending && game.dieRollNum === 1) {
            game.rollTotal1 *= 2
            kingDiceDiv.innerHTML += `<img src="images/${game.diceImgs[game.roll1 - 1]}">`
            kingDiceDiv.innerHTML += `<img src="images/${game.diceImgs[game.roll2 - 1]}">`
            game.p1JackPending = false
            console.log('jack effect applied: roll doubled')
        }
        else if (!game.playerTurn && game.p2JackPending && game.dieRollNum === 1) {
            game.rollTotal1 *= 2
            kingDiceDiv.innerHTML += `<img src="images/${game.diceImgs[game.roll1 - 1]}">`
            kingDiceDiv.innerHTML += `<img src="images/${game.diceImgs[game.roll2 - 1]}">`
            game.p2JackPending = false
            console.log('jack effect applied: roll doubled')
        }
    }

    function overburst() {
        dieRoll()

        // King Card Effect Check
        if (game.kingMode) {
            kingDieRoll()
        }

        if (game.rollTotal3 < 6) {
            console.log('overburst failed, swapping turns')
            overburstFailText.style.opacity = '1'
            setTimeout(switchTurn, 3000)
        } else {
            console.log('overburst successful, attack value added')
            console.log(game.rollTotal3)
        }

        rollBtn.disabled = true
    }

    function attack() {

        let attackValue = game.rollTotal1 + game.rollTotal2 + game.rollTotal3

        if (game.playerTurn) {
            //Queen Effect Check
            if (game.p1QueenEffectPending) {
                attackValue = Math.round(attackValue / 2)
                game.p1QueenEffectPending = false
            }

            game.p1attack = attackValue
            game.p2health -= game.p1attack

            if (game.p2health <= 0) {
                p1Win.style.display = 'block'
            }
        } else {
            //Queen Effect Check
            if (game.p2QueenEffectPending) {
                attackValue = Math.round(attackValue / 2)
                game.p2QueenEffectPending = false
                console.log('queen effect applied: opponent attack halved')
                console.log(attackValue)
            }

            game.p2attack = attackValue
            game.p1health -= game.p2attack

            if (game.p1health <= 0) {
                p2Win.style.display = 'block'
            }
        }

        //Changes turn and resets values for next player
        updateHPBars()
        switchTurn()
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
        updateHPBars()
        switchTurn()
        console.log(game.playerTurn ? game.p1heals : game.p2heals)
    }

    function cardDeck() {
        //Resets Array before reinserting cards
        game.cards = []

        //Adds Cards to Deck of 52
        for (let i = 0; i < 2; i++) {
            game.cards.push('G') //God card - 5% chance pull [ULTRA RARE]
        }

        for (let i = 0; i < 4; i++) {
            game.cards.push('JO') //Joker card - 8% chance pull [VERY RARE]
        }

        for (let i = 0; i < 6; i++) {
            game.cards.push('K') //King card - 10% pull [RARE]
        }

        for (let i = 0; i < 20; i++) {
            game.cards.push('Q') //Queen card - 38.5% chance pull [COMMON]
            game.cards.push('JA') //Jack card - 38.5% chance pull [COMMON]
        }

        shuffleDeck(game.cards)

        console.log(game.cards)

        dealCard()
    }

    function dealCard() {
        game.p1card = game.cards[Math.floor(Math.random() * game.cards.length)]
        game.p2card = 'G'
        console.log('P1: ' + game.p1card, 'P2: ' + game.p2card)
    }


    function shuffleDeck(array) {
        for (let i = 0; i < array.length; i++) {
            swap = Math.floor(Math.random() * (i + 1))
            let prev = array[i]

            array[i] = array[swap]
            array[swap] = prev
        }

        return array
    }

    updateHPBars()
    updateHealUI()
})()