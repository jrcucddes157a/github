(function () {
    'use strict'

    console.log('reading js')

    // Functions to Implement:
    // 1. Card Functions with...
    // Reshuffle and pull out card based on whether p1 or 2 has passed 5 of their own turns

    const rollBtn = document.querySelector('#rollcontainer #roll')
    const attackBtn = document.querySelector('#attack')
    const restartBtn = document.querySelectorAll('.restart')
    const howToPlayBtn = document.querySelector('#howtoplay')
    const crossBtn = document.querySelector('#cross')
    const backToGameBtn = document.querySelector('.backtogame')
    const useCardBtn = document.querySelector('#usecard')
    const muteBtn = document.querySelector('#mute')

    let swap

    const diceRollSound = document.querySelector('#diceroll')
    const cardFlipSound = document.querySelector('#cardflip')
    const healSound = document.querySelector('#healmp3')
    const deathSound = document.querySelector('#die')
    const attackSound = document.querySelector('#attackmp3')
    const dealSound = document.querySelector('#deal')
    const dramaSound = document.querySelector('#drama')
    const victorySound = document.querySelector('#victory')
    const allAudio = document.querySelectorAll('audio')

    for (const sounds of allAudio) {
        sounds.volume = 0.35
    }

    const howToPlaySect = document.querySelector('#howto')
    const p1Win = document.querySelector('#p1win')
    const p2Win = document.querySelector('#p2win')

    const healBtn = document.querySelector('#heal')
    const p1Dice = document.querySelector('#p1dice')
    const p2Dice = document.querySelector('#p2dice')
    const p1KingDice = document.querySelector('#p1kingdice')
    const p2KingDice = document.querySelector('#p2kingdice')

    const p1CardBack = document.querySelector('#p1back')
    const p1CardFront = document.querySelector('#p1front')
    const p2CardBack = document.querySelector('#p2back')
    const p2CardFront = document.querySelector('#p2front')

    const p1HP = document.querySelector('#p1hpnum')
    const p2HP = document.querySelector('#p2hpnum')
    const p1HPBar = document.querySelector('#p1health')
    const p2HPBar = document.querySelector('#p2health')

    const p1Sprite = document.querySelector('#p1sprite')
    const p2Sprite = document.querySelector('#p2sprite')

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
        p1health: 10,
        p2health: 10,
        playerTurn: true,
        p1heals: 3,
        p2heals: 3,
        healAmount: 0,
        cards: [],
        p1card: '',
        p1turns: 5,
        p2card: '',
        p2turns: 5,
        cardImgs: ['K.png', 'G.png', 'JA.png', 'JO.png', 'Q.png', 'cardback.png'],

        //Card Variables
        p1JackPending: false,
        p2JackPending: false,
        p2QueenEffectPending: false,
        p1QueenEffectPending: false,
        p2KingPending: false,
        p1KingPending: false,
        kingMode: false,
        didP1UseCard: false,
        didP2UseCard: false
    }

    p1HP.innerHTML = `${game.p1health}`
    p2HP.innerHTML = `${game.p2health}`

    muteBtn.addEventListener('pointerdown', function() {
        for (const sounds of allAudio) {
            sounds.muted = !sounds.muted

            if (sounds.muted) {
            muteBtn.innerHTML = 'UNMUTE ALL SOUND'
            muteBtn.style.color = 'gold'
        } else {
            muteBtn.innerHTML = 'MUTE ALL SOUND'
        }
        }
    })

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
                p1CardFront.style.opacity = '0'
                console.log('king mode active for p1. 4 dice per roll')
            }
        }
        else {
            if(game.p2KingPending) {
                game.p2KingPending = false
                game.kingMode = true
                p2CardFront.style.opacity = '0'
                console.log('king mode active for p1. 4 dice per roll')
            }
        }
    }

    updateTurnUI()
    cardDeck()

    function switchTurn() {
        game.playerTurn = !game.playerTurn
        overburstFailText.style.opacity = '0'
        overburstFailText.innerHTML = 'OVERBURST FAILED!'
        overburstFailText.style.color = 'red'
        rollBtn.disabled = false
        rollBtn.innerHTML = 'ROLL'
        rollBtn.style.color = 'black'
        rollBtn.style.backgroundColor = 'white'
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

        if (game.playerTurn && game.didP1UseCard) {
            game.p1turns--

            if (game.p1turns <= 0) {
                game.didP1UseCard = false
                game.p1turns = 5
                shuffleDeck(game.cards)
                dealP1Card()
            }
        }

        if (!game.playerTurn && game.didP2UseCard) {
            game.p2turns--

            if (game.p2turns <= 0) {
                game.didP2UseCard = false
                game.p2turns = 5
                shuffleDeck(game.cards)
                dealP2Card()
            }
        }

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
        game.didP1UseCard = false
        game.didP2UseCard = false
        game.p1turns = 5
        game.p2turns = 5

        rollBtn.disabled = false
        rollBtn.innerHTML = 'ROLL'
        rollBtn.style.color = 'black'
        rollBtn.style.backgroundColor = 'white'
        healBtn.disabled = false
        attackBtn.disabled = false
        useCardBtn.disabled = false

        overburstFailText.style.opacity = '0'
        overburstFailText.innerHTML = 'OVERBURST FAILED!'
        overburstFailText.style.color = 'red'

        p1Dice.innerHTML = ''
        p2Dice.innerHTML = ''
        p1KingDice.innerHTML = ''
        p2KingDice.innerHTML = ''

        p1Sprite.style.animation = ''
        p2Sprite.style.animation = ''

        p1Win.style.display = 'none'
        p2Win.style.display = 'none'

        updateHPBars()
        updateHealUI()
        updateTurnUI()
        cardDeck()
    }

    attackBtn.addEventListener('pointerdown', attack)
    healBtn.addEventListener('pointerdown', heal)

    for (let i = 0; i < restartBtn.length; i++) {
        restartBtn[i].addEventListener('pointerdown', restart)
    }

    rollBtn.addEventListener('pointerdown', function () {
        diceRollSound.play()
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
                rollBtn.style.color = 'darkorange'
            }
        } else if (game.dieRollNum === 3) {
            console.log('overburst on')
            overburst()
        } else if (game.dieRollNum > 3) {
            rollBtn.disabled = true
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
        dramaSound.play()
        cardFlipSound.play()

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

            game.didP1UseCard = true

            p1CardBack.style.transform = 'rotateY(90deg)'
            setTimeout(function() {
                p1CardFront.style.transform = 'rotateY(0deg)'
            }, 500)

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

            game.didP2UseCard = true

            p2CardBack.style.transform = 'rotateY(90deg)'
            setTimeout(function() {
                p2CardFront.style.transform = 'rotateY(0deg)'
            }, 500)

            console.log('card used')
            game.p2card = ''
            console.log('card gone')
        }

        if ((game.didP1UseCard && game.playerTurn) || (!game.playerTurn && game.didP2UseCard)) {
            useCardBtn.disabled = true
        } else {
            useCardBtn.disabled = false
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
            p1CardFront.style.opacity = '0'
        }
        else if (!game.playerTurn && game.p2JackPending && game.dieRollNum === 1) {
            game.rollTotal1 *= 2
            kingDiceDiv.innerHTML += `<img src="images/${game.diceImgs[game.roll1 - 1]}">`
            kingDiceDiv.innerHTML += `<img src="images/${game.diceImgs[game.roll2 - 1]}">`
            game.p2JackPending = false
            console.log('jack effect applied: roll doubled')
            p2CardFront.style.opacity = '0'
        }
    }

    function overburst() {
        dieRoll()

        // King Card Effect Check
        if (game.kingMode) {
            kingDieRoll()
        }

        if (game.rollTotal3 < 6) {
            overburstFailText.style.opacity = '1'
            setTimeout(switchTurn, 3000)
        } else {
            overburstFailText.innerHTML = 'OVERBURST SUCCESS!!'
            overburstFailText.style.color = 'green'
            setTimeout(function() { overburstFailText.style.opacity = '1' }, 50)
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
                p1CardFront.style.opacity = '0'
            }

            game.p1attack = attackValue
            game.p2health -= game.p1attack
            p2Sprite.style.animation = 'p2TookDamage 0.3s ease'
            p2Sprite.addEventListener('animationend', function(e) {
                if (e.animationName === 'p2TookDamage') {
                    p2Sprite.style.animation = ''
                }
            })
            

            // Win Condition
            if (game.p2health <= 0) {
                deathSound.play()
                healBtn.disabled = true
                attackBtn.disabled = true
                rollBtn.disabled = true
                useCardBtn.disabled = true
                p2Sprite.style.animation = 'p2death 2s ease forwards'
                setTimeout(function() {
                    victorySound.play()
                    p1Win.style.display = 'block'
                }, 3000)
            }
        } else {
            //Queen Effect Check
            if (game.p2QueenEffectPending) {
                attackValue = Math.round(attackValue / 2)
                game.p2QueenEffectPending = false
                p2CardFront.style.opacity = '0'
            }

            game.p2attack = attackValue
            game.p1health -= game.p2attack
            p1Sprite.style.animation = 'p1TookDamage 0.3s ease'
            p1Sprite.addEventListener('animationend', function(e) {
                if (e.animationName === 'p1TookDamage') {
                    p1Sprite.style.animation = ''
                }
            })

            // Win Condition
            if (game.p1health <= 0) {
                deathSound.play()
                healBtn.disabled = true
                attackBtn.disabled = true
                rollBtn.disabled = true
                useCardBtn.disabled = true
                p1Sprite.style.animation = 'p1death 2s ease forwards'
                setTimeout(function() {
                    victorySound.play()
                    p2Win.style.display = 'block'
                }, 3000)
            }
        }

        //Changes turn and resets values for next player
        attackSound.play()
        updateHPBars()
        switchTurn()
    }


    function heal() {
        let heals = game.playerTurn ? game.p1heals : game.p2heals

        if (heals <= 0) {
            game.healAmount = 0
            healBtn.disabled = true
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
            p1Sprite.style.animation = 'heal 1s ease'
            p1Sprite.addEventListener('animationend', function() {
                if (e.animationName === 'heal') {
                    p1Sprite.style.animation = ''
                }    
            })
        } else {
            game.p2health += game.healAmount
            p2HP.innerHTML = `${game.p2health}`
            p2Sprite.style.animation = 'heal 1s ease'
            p2Sprite.addEventListener('animationend', function(e) {
                if (e.animationName === 'heal') {
                    p2Sprite.style.animation = ''
                }
            })
        }

        if (game.p1health > 500) {
            game.p1health = 500
        }

        if (game.p2health > 500) {
            game.p2health = 500
        }

        // Changes turn and resets value for next player
        healSound.play()
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

        dealP1Card()
        dealP2Card()
    }

    function dealP1Card() {
        dealSound.play()
        p1CardFront.style.transform = 'rotateY(90deg)'
        p1CardBack.style.transform = 'rotateY(0deg)'
        game.p1card = 'Q'

        switch (game.p1card) {
            case 'JA':
                p1CardFront.src = `images/${game.cardImgs[2]}`
                p1CardFront.alt = 'jack card'
                break
            case 'Q':
                p1CardFront.src = `images/${game.cardImgs[4]}`
                p1CardFront.alt = 'queen card'
                break
            case 'K':
                p1CardFront.src = `images/${game.cardImgs[0]}`
                p1CardFront.alt = 'king card'
                break
            case 'G':
                p1CardFront.src = `images/${game.cardImgs[1]}`
                p1CardFront.alt = 'god card'
                break
            case 'JO':
                p1CardFront.src = `images/${game.cardImgs[3]}`
                p1CardFront.alt = 'joker card'
                break
        }

        setTimeout(function() { p1CardFront.style.opacity = '1'}, 500)

        console.log('P1: ' + game.p1card)
    }

    function dealP2Card() {
        dealSound.play()
        p2CardFront.style.transform = 'rotateY(90deg)'
        p2CardBack.style.transform = 'rotateY(0deg)'
        game.p2card = game.cards[Math.floor(Math.random() * game.cards.length)]
        
        switch (game.p2card) {
            case 'JA':
                p2CardFront.src = `images/${game.cardImgs[2]}`
                p2CardFront.alt = 'jack card'
                break
            case 'Q':
                p2CardFront.src = `images/${game.cardImgs[4]}`
                p2CardFront.alt = 'queen card'
                break
            case 'K':
                p2CardFront.src = `images/${game.cardImgs[0]}`
                p2CardFront.alt = 'king card'
                break
            case 'G':
                p2CardFront.src = `images/${game.cardImgs[1]}`
                p2CardFront.alt = 'god card'
                break
            case 'JO':
                p2CardFront.src = `images/${game.cardImgs[3]}`
                p2CardFront.alt = 'joker card'
                break
        }

        

        setTimeout(function() { p2CardFront.style.opacity = '1'}, 500)

        console.log('P2: ' + game.p2card)
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