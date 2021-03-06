window.onload = () => {

    // TARGETS Y VARIABLES ==========================

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    const mainView = document.getElementById('mainview')
    const oneWin = document.getElementById('one-win')
    const twoWin = document.getElementById('two-win')
    const oneWinYoda = document.getElementById('yoda')
    const twoWinVader = document.getElementById('vader')
    const restart = document.getElementsByClassName('restart')
    const magikarp = document.getElementById('magikarp')
    const farWestTransition = document.getElementById('far-west-transition')
    const starWarsTransition = document.getElementById('star-wars-transition')
    const soundOnButton = document.getElementById('on')
    const soundOffButton = document.getElementById('off')
    const farWestTransitionAudio = new Audio('./audio/farwest-transition (mp3cut.net).mp3')
    farWestTransitionAudio.volume = .3
    const farWestDuelAudio = new Audio('./audio/farwest-duel (mp3cut.net).mp3')
    farWestDuelAudio.loop = true
    farWestDuelAudio.volume = .05
    const farWestWinAudio = new Audio('./audio/farwest-win (mp3cut.net).mp3')
    farWestWinAudio.volume = .2
    const farWestShootAudioOne = new Audio('./audio/western-ricochet (mp3cut.net).mp3')
    farWestShootAudioOne.volume = .1
    const farWestShootAudioTwo = new Audio('./audio/western-ricochet (mp3cut.net).mp3')
    farWestShootAudioTwo.volume = .1
    const starWarsTransitionAudio = new Audio('./audio/Meco - Star Wars and Other Galactic Funk_ Star Wars (HD Vinyl Recording) (mp3cut.net).mp3')
    starWarsTransitionAudio.volume = .3
    const starWarsDuelAudio = new Audio('./audio/John Williams - Duel of the Fates (Star Wars Soundtrack) [HQ] (mp3cut.net).mp3')
    starWarsDuelAudio.loop = true
    starWarsDuelAudio.volume = .2
    const starWarsOneWinAudio = new Audio('./audio/theForceWins.mp3')
    starWarsOneWinAudio.volume = .3
    const starWarsTwoWinAudio = new Audio("./audio/Star Wars- The Imperial March (Darth Vader's Theme) (mp3cut.net).mp3")
    starWarsTwoWinAudio.volume = .4
    const blasterAudioOne = new Audio('./audio/blaster.m4a')
    const blasterAudioTwo = new Audio('./audio/blaster.m4a')
    const selectPageAudio = new Audio('./audio/Avengers Theme Song From 2012 to 2019 [UPDATED] _ OST _ It Is Not True (mp3cut.net).mp3')
    selectPageAudio.volume = .1
    selectPageAudio.autoplay = true
    selectPageAudio.loop = true
    
    const restartArr = [...restart]
    const backgroundImages = ['./images/Backgrounds/town_background.jpg', './images/Backgrounds/selection_page.jpg', './images/Backgrounds/starwars-field.jpg']
    let backgroundCounter = 0
    
   
    
    // CLASES ========================================

    class Player {
        constructor(_x, _rightImageRoute, _middleImage, _leftImageRoute, _rightImageRouteSW, _middleImageSW, _leftImageRouteSW){
            this.x = _x
            this.y = 300
            this.width = 65
            this.height = 140
            this.imageRight = _rightImageRoute
            this.imageMiddle = _middleImage
            this.imageLeft = _leftImageRoute
            this.imageRightSW = _rightImageRouteSW
            this.imageMiddleSw = _middleImageSW
            this.imageLeftSW = _leftImageRouteSW
            this.alive = true
            this.lifes = 3
            this.direction = ''
            this.ammo = []
            this.maxAmmo = 1
            this.movesCounter = 0
            this.movesCounterUpgrades = 0
            this.upgrade = []
        }

        receiveDamage(){
            this.lifes--
        }

        checkPlayerLifes(){
            if(this.lifes <= 0){
                this.alive = false
            }
        }

        upgradeAmmo(){
            this.maxAmmo++
        }
    } 

    class Bullet {
        constructor(_x, _y,_width, _color){
            this.x = _x
            this.y = _y
            this.height = 3
            this.width = _width
            this.color = _color
        }
    }

    class Upgrade {
        constructor(_x, _y, _width, _height){
            this.x = _x
            this.y = _y
            this.width = _width
            this.height = _height
        }
    }
    
    
    // CREACIÓN DE LOS JUGADORES =====================
// 
//
    const playerOne = new Player(70, './images/Players/playerFour-leftStep.png', './images/Players/playerFour-middleStep.png', './images/Players/playerFour-rightStep.png', './images/Players/Yoda/yoda-zeroStep.png', './images/Players/Yoda/yoda-firstStep.png', './images/Players/Yoda/yoda-secondStep.png')
    const playerTwo = new Player(865, './images/Players/playerTwo-rightStep.png', './images/Players/playerTwo-middleStep.png', './images/Players/playerTwo-leftStep.png', './images/Players/darthvader-rightStep.png', './images/Players/darthvader-middleStep.png', './images/Players/darthvader-leftStep.png')
    
    
    // FUNCIONES =====================================
    
    // -----------------------Bucle:

    const updateCanvas = () => {
        selectTheme()
        checkHurtOne()
        checkHurtTwo()
        checkMovesForUpgradeOne()
        checkMovesForUpgradeTwo()
        checkUpgradeCatchOne()
        checkUpgradeCatchTwo()
                
        requestAnimationFrame(updateCanvas)
    }


    //--------------------Escenario:

    const selectTheme = () => {
        if(backgroundCounter===0){
            drawSelectPage()
        } else if (backgroundCounter<0){
            drawTown()
            drawDivision()
            drawPlayerTwo()
            drawPlayerOne()
            drawBulletsOne()
            removeBulletOne()
            displayMaxAmmoOne()
            drawBulletsTwo()
            removeBulletTwo()
            displayMaxAmmoTwo()
            drawLifesOne()
            drawLifesTwo()
            showMagikarp()
        } else if (backgroundCounter>0){
            drawSpace()
            drawDivision()
            drawPlayerTwo()
            drawPlayerOne()
            drawBulletsOne()
            removeBulletOne()
            displayMaxAmmoOne()
            drawBulletsTwo()
            removeBulletTwo()
            displayMaxAmmoTwo()
            drawLifesOne()
            drawLifesTwo()
            showMagikarp()
        }
    }

    const drawTown = () => {
        const town = new Image()
        town.src = backgroundImages[0]
        town.onload = () => {
            ctx.drawImage(town, 0, 0, 1000, 600)
        }
    }

    const drawSpace = () => {
        const space = new Image()
        space.src = backgroundImages[2]
        space.onload = () => {
            ctx.drawImage(space, 0, 0, 1000, 600)
        }
    }

    const drawSelectPage = () => {
        const selectPage = new Image()
        selectPage.src = backgroundImages[1]
        selectPage.onload = () => {
            ctx.drawImage(selectPage, 0, 0, 1000, 600)
        }
        ctx.fillStyle = 'black'
        ctx.font = '30px Syne Mono'
        ctx.fillText('ARROW LEFT', 50, 50)

        ctx.fillStyle = 'white'
        ctx.font = '30px Syne Mono'
        ctx.fillText('ARROW RIGHT', 760, 50)

        ctx.fillStyle = 'white'
        ctx.font = '15px Syne Mono'
        ctx.fillText(`P1.USE 'A', 'S', 'D'`, 800, 440)

        ctx.fillStyle = 'white'
        ctx.font = '15px Syne Mono'
        ctx.fillText(`AND 'W' TO MOVE`, 820, 460)

        ctx.fillStyle = 'white'
        ctx.font = '15px Syne Mono'
        ctx.fillText(`USE 'B' TO SHOOT`, 820, 480)
 
        ctx.fillStyle = 'white'
        ctx.font = '15px Syne Mono'
        ctx.fillText('P2.USE ARROWS TO MOVE', 800, 510)

        ctx.fillStyle = 'white'
        ctx.font = '15px Syne Mono'
        ctx.fillText(`USE '.' TO SHOOT`, 820, 530)

        ctx.fillStyle = 'white'
        ctx.font = '15px Syne Mono'
        ctx.fillText('UPGRADE YOU MAX AMMO', 800, 560)

        ctx.fillStyle = 'white'
        ctx.font = '15px Syne Mono'
        ctx.fillText('& BE THE LAST ONE ALIVE!', 790, 580)
    }

    const drawRect = (x, y, width, height, _color) => {
        ctx.fillStyle = _color
        ctx.fillRect(x, y, width, height)
      }

    const drawDivision = () => {
        if (backgroundCounter<0){
            drawRect(503, 200, 3, 400, 'sienna')
        } else if (backgroundCounter>0){
            drawRect(503, 270, 3, 400, 'black')
        }
    }

    const displayMaxAmmoOne = () => {
        if(backgroundCounter<0){
            ctx.fillStyle = 'black'
        } else if (backgroundCounter>0){
            ctx.fillStyle = 'white'
        }
        ctx.font = '20px Syne Mono'
        if(playerOne.maxAmmo===1){
            ctx.fillText(`${playerOne.maxAmmo} shoot max`, 122, 581)
        } else {
            ctx.fillText(`${playerOne.maxAmmo} shoots max`, 122, 581)
        }
    }

    const displayMaxAmmoTwo = () => {
        if(backgroundCounter<0){
            ctx.fillStyle = 'black'
        } else if (backgroundCounter>0){
            ctx.fillStyle = 'white'
        }
        ctx.font = '20px Syne Mono'
        if(playerTwo.maxAmmo===1){
            ctx.fillText(`${playerTwo.maxAmmo} shoot max`, 752, 581)
        } else {
            ctx.fillText(`${playerTwo.maxAmmo} shoots max`, 740, 581)
        }
    }

    const drawLifesOne = () => {
        const life = new Image()
        if(backgroundCounter<0){
            life.src = './images/Elements/life.png'
            life.onload = () => {
                if(playerOne.lifes>=1){
                    ctx.drawImage(life, 20, 565, 30, 20)
                }
                if (playerOne.lifes>=2){
                    ctx.drawImage(life, 50, 565, 30, 20)
                }
                if(playerOne.lifes===3){
                    ctx.drawImage(life, 80, 565, 30, 20)
                }
            }
        } else if (backgroundCounter>0){
            life.src = './images/Elements/life-white.png'
            life.onload = () => {
                if(playerOne.lifes>=1){
                    ctx.drawImage(life, 20, 560, 30, 30)
                }
                if (playerOne.lifes>=2){
                    ctx.drawImage(life, 50, 560, 30, 30)
                }
                if(playerOne.lifes===3){
                    ctx.drawImage(life, 80, 560, 30, 30)
                }
            }
        }
    }

    const drawLifesTwo = () => {
        const life = new Image()
        if(backgroundCounter<0){
            life.src = './images/Elements/life.png'
            life.onload = () => {
                if(playerTwo.lifes>=1){
                    ctx.drawImage(life, 950, 565, 30, 20)
                }
                if (playerTwo.lifes>=2){
                    ctx.drawImage(life, 920, 565, 30, 20)
                }
                if(playerTwo.lifes===3){
                    ctx.drawImage(life, 890, 565, 30, 20)
                }
            }
        } else if (backgroundCounter>0){
            life.src = './images/Elements/life-white.png'
            life.onload = () => {
                if(playerTwo.lifes>=1){
                    ctx.drawImage(life, 950, 560, 30, 30)
                }
                if (playerTwo.lifes>=2){
                    ctx.drawImage(life, 920, 560, 30, 30)
                }
                if(playerTwo.lifes===3){
                    ctx.drawImage(life, 890, 560, 30, 30)
                }
            }
        }
    }
      
    //-------------------Personajes:

    const drawPlayerOne = () => {
        if(backgroundCounter<0){
            if(playerOne.movesCounter===0){
                let image = new Image()
                image.src = playerOne.imageLeft
                image.onload = () => {
                    ctx.drawImage(image, playerOne.x, playerOne.y, playerOne.width, playerOne.height)
                }
            }
            if(playerOne.movesCounter===1){
                let image = new Image()
                image.src = playerOne.imageMiddle
                image.onload = () => {
                    ctx.drawImage(image, playerOne.x, playerOne.y, 85, playerOne.height)
                }
            }
            if(playerOne.movesCounter===2){
                let image = new Image()
                image.src = playerOne.imageRight
                image.onload = () => {
                    ctx.drawImage(image, playerOne.x, playerOne.y, playerOne.width, playerOne.height)
                }
            }
            
        }
        if(backgroundCounter>0){
            if(playerOne.movesCounter===0){
                let image = new Image()
                image.src = playerOne.imageLeftSW
                image.onload = () => {
                    ctx.drawImage(image, playerOne.x, playerOne.y, 70, 81)
                }
            }
            if(playerOne.movesCounter===1){
                let image = new Image()
                image.src = playerOne.imageRightSW
                image.onload = () => {
                    ctx.drawImage(image, playerOne.x, playerOne.y, 70, 81)
                }
            }
            if(playerOne.movesCounter===2){
                let image = new Image()
                image.src = playerOne.imageMiddleSw
                image.onload = () => {
                    ctx.drawImage(image, playerOne.x, playerOne.y, 70, 81)
                }
            }
        }



    }
    
    const drawPlayerTwo = () => {

        if(backgroundCounter<0){
            if(playerTwo.movesCounter===0){
                let image = new Image()
                image.src = playerTwo.imageLeft
                image.onload = () => {
                    ctx.drawImage(image, playerTwo.x, playerTwo.y, playerTwo.width, playerTwo.height)
                }
            }
            if(playerTwo.movesCounter===1){
                let image = new Image()
                image.src = playerTwo.imageMiddle
                image.onload = () => {
                    ctx.drawImage(image, playerTwo.x, playerTwo.y, 83, playerTwo.height)
                }
            }
            if(playerTwo.movesCounter===2){
                let image = new Image()
                image.src = playerTwo.imageRight
                image.onload = () => {
                    ctx.drawImage(image, playerTwo.x, playerTwo.y, playerTwo.width, playerTwo.height)
                }
            }
        }
        if(backgroundCounter>0){
            if(playerTwo.movesCounter===0){
                let image = new Image()
                image.src = playerTwo.imageLeftSW
                image.onload = () => {
                    ctx.drawImage(image, playerTwo.x, playerTwo.y, 120, 130)
                }
            }
            if(playerTwo.movesCounter===1){
                let image = new Image()
                image.src = playerTwo.imageRightSW
                image.onload = () => {
                    ctx.drawImage(image, playerTwo.x, playerTwo.y, 120, 130)
                }
            }
            if(playerTwo.movesCounter===2){
                let image = new Image()
                image.src = playerTwo.imageMiddleSw
                image.onload = () => {
                    ctx.drawImage(image, playerTwo.x, playerTwo.y, 120, 130)
                }
            }
        }



    }

    const movePlayerOne = () => {
        if(playerOne.movesCounter===2){   // Este movesCounter sirve para mover los spriters
            playerOne.movesCounter = 0
        } else {
            playerOne.movesCounter++
        }

        if(playerOne.movesCounterUpgrades===50){    // Este movesCounterUpgrades se utiliza para mostrar upgrades a intervalos de pasos
            playerOne.movesCounterUpgrades = 0
        } else {
            playerOne.movesCounterUpgrades++
        }
        
        if(playerOne.direction==='up' && playerOne.y > 160){
            // drawTown()
            playerOne.y-=30                                      // Velocidad fijada en 30px porque con keyup se mueven click a click
            drawPlayerOne()
        } else if (playerOne.direction==='down' && playerOne.y < 450){
            // drawTown()
            playerOne.y+=30
            drawPlayerOne()
        } else if (playerOne.direction==='left' && playerOne.x > 50){
            // drawTown()
            playerOne.x-=30
            drawPlayerOne()
        } else if (playerOne.direction==='right' && playerOne.x < 400){
            // drawTown()
            playerOne.x+=30
            drawPlayerOne()
        }
    }
    
    const movePlayerTwo = () => {
        if(playerTwo.movesCounter===2){
            playerTwo.movesCounter = 0
        } else {
            playerTwo.movesCounter++
        }

        if(playerTwo.movesCounterUpgrades===50){
            playerTwo.movesCounterUpgrades = 0
        } else {
            playerTwo.movesCounterUpgrades++
        }

        if(playerTwo.direction==='up' && playerTwo.y > 160){
            // drawTown()
            playerTwo.y-=30
            drawPlayerTwo()
        } else if (playerTwo.direction==='down' && playerTwo.y < 450){
            // drawTown()
            playerTwo.y+=30
            drawPlayerTwo()
        } else if (playerTwo.direction==='left' && playerTwo.x > 535){
            // drawTown()
            playerTwo.x-=30
            drawPlayerTwo()
        } else if (playerTwo.direction==='right' && playerTwo.x < 885){
            // drawTown()
            playerTwo.x+=30
            drawPlayerTwo()
        }
    }

    const showMagikarp = () => {
        if(playerOne.lifes===2 && playerTwo.lifes===1 && playerOne.maxAmmo+playerTwo.maxAmmo > 5 && playerTwo.y>300){
            magikarp.style.display = "block";
        }
    }


    //------------------------Balas:

    const createBulletOne = () => {
        if(playerOne.ammo.length<playerOne.maxAmmo){
            farWestShootAudioOne.pause()
            blasterAudioOne.pause()
            if(backgroundCounter<0){
                playerOne.ammo.push(new Bullet(playerOne.x+65, playerOne.y+70, 14, 'black'))
                farWestShootAudioOne.play()
            } else if (backgroundCounter>0){
                playerOne.ammo.push(new Bullet(playerOne.x+65, playerOne.y+30, 40, 'chartreuse'))
                blasterAudioOne.play()
            }
        }
    }

    const removeBulletOne = () => {
        playerOne.ammo.forEach((bullet, index) => {
            if(bullet.x >= 5000){
                playerOne.ammo.splice(index, 1)
            }
        })
    }

    const createBulletTwo = () => {
        if(playerTwo.ammo.length<playerTwo.maxAmmo){
            farWestShootAudioTwo.pause()
            blasterAudioTwo.pause()
            if(backgroundCounter<0){
                playerTwo.ammo.push(new Bullet(playerTwo.x, playerTwo.y+70, 14, 'black'))
                farWestShootAudioTwo.play()
            } else if (backgroundCounter>0){
                playerTwo.ammo.push(new Bullet(playerTwo.x, playerTwo.y+70, 40, 'red'))
                blasterAudioTwo.play()
            }
        }
    }

    const removeBulletTwo = () => {
        playerTwo.ammo.forEach((bullet, index) => {
            if(bullet.x <= -4000){
                playerTwo.ammo.splice(index, 1)
            }
        })
    }
    
    const moveBulletsOne = () => {
        playerOne.ammo.forEach((bullet)=>{ 
            return bullet.x+=30
          })
    }

    const moveBulletsTwo = () => {
        playerTwo.ammo.forEach((bullet)=>{ 
            return bullet.x-=30
          })
    }

    const drawBulletsOne = () => {
        for(i=0; i<playerOne.ammo.length; i++){
            drawRect(playerOne.ammo[i].x, playerOne.ammo[i].y, playerOne.ammo[i].width, playerOne.ammo[i].height, playerOne.ammo[i].color)
        }
        moveBulletsOne()
    }

    const drawBulletsTwo = () => {
        for(i=0; i<playerTwo.ammo.length; i++){
          drawRect(playerTwo.ammo[i].x, playerTwo.ammo[i].y, playerTwo.ammo[i].width, playerTwo.ammo[i].height, playerTwo.ammo[i].color)
        }
        moveBulletsTwo()
    }


    //----------------------Upgrades:

    const generateRandomUpgradeOne = () => {
        playerOne.upgrade.length = 0
        const randomX = Math.floor(Math.random()*370)+30      // Estos numeros ajustan la superficie en la que podrán aparecer upgrades
        const randomY = Math.floor(Math.random()*310)+220
        playerOne.upgrade.push(new Upgrade(randomX, randomY, 40, 40))
    }

    const generateRandomUpgradeTwo = () => {
        playerTwo.upgrade.length = 0
        const randomX = Math.floor(Math.random()*370)+570
        const randomY = Math.floor(Math.random()*310)+220
        playerTwo.upgrade.push(new Upgrade(randomX, randomY, 40, 40))
    }

    const drawUpgradesOne = () => {
        if(playerOne.upgrade.length>0){
            upgradeImage = new Image()
            if(backgroundCounter<0){
                upgradeImage.src = './images/Elements/upgrade.png'
            } else if (backgroundCounter>0){
                upgradeImage.src = './images/Elements/blaster.png'
            }
            upgradeImage.onload = () => {
                ctx.drawImage(upgradeImage, playerOne.upgrade[0].x, playerOne.upgrade[0].y, playerOne.upgrade[0].width, playerOne.upgrade[0].height)
            }
        }
    }

    const drawUpgradesTwo = () => {
        if(playerTwo.upgrade.length>0){
            upgradeImage = new Image()
            if(backgroundCounter<0){
                upgradeImage.src = './images/Elements/upgrade.png'
            } else if (backgroundCounter>0){
                upgradeImage.src = './images/Elements/blaster.png'
            }
            upgradeImage.onload = () => {
                ctx.drawImage(upgradeImage, playerTwo.upgrade[0].x, playerTwo.upgrade[0].y, playerTwo.upgrade[0].width, playerTwo.upgrade[0].height)
            }
        }
    }

    const checkMovesForUpgradeOne = () => {
        if(playerOne.movesCounterUpgrades>20 && playerOne.movesCounterUpgrades<40){  // Aquí se define en que intervalos aparecerán upgrades y en cuales no
            drawUpgradesOne()
        }
    }

    const checkMovesForUpgradeTwo = () => {
        if(playerTwo.movesCounterUpgrades>20 && playerTwo.movesCounterUpgrades<40){  // Aquí se define en que intervalos aparecerán upgrades y en cuales no
            drawUpgradesTwo()
        }
    }

    const checkUpgradeCatchOne = () => {
        if(backgroundCounter<0 && playerOne.upgrade[0].x+20 > playerOne.x && playerOne.upgrade[0].x+20 < playerOne.x+65 && playerOne.upgrade[0].y+20 > playerOne.y && playerOne.upgrade[0].y+20 < playerOne.y+140 && playerOne.movesCounterUpgrades>20 && playerOne.movesCounterUpgrades<40){
            playerOne.upgradeAmmo()
            generateRandomUpgradeOne()
        }
        if(backgroundCounter>0 && playerOne.upgrade[0].x+20 > playerOne.x && playerOne.upgrade[0].x+20 < playerOne.x+70 && playerOne.upgrade[0].y+20 > playerOne.y && playerOne.upgrade[0].y+20 < playerOne.y+80 && playerOne.movesCounterUpgrades>20 && playerOne.movesCounterUpgrades<40){
            playerOne.upgradeAmmo()
            generateRandomUpgradeOne()
        }
    }

    const checkUpgradeCatchTwo = () => {
        if(backgroundCounter <0 && playerTwo.upgrade[0].x+20 > playerTwo.x && playerTwo.upgrade[0].x+20 < playerTwo.x+65 && playerTwo.upgrade[0].y+20 > playerTwo.y && playerTwo.upgrade[0].y+20 < playerTwo.y+140 && playerTwo.movesCounterUpgrades>20 && playerTwo.movesCounterUpgrades<40){
            playerTwo.upgradeAmmo()
            generateRandomUpgradeTwo()
        }
        if(backgroundCounter >0 && playerTwo.upgrade[0].x+20 > playerTwo.x && playerTwo.upgrade[0].x+20 < playerTwo.x+95 && playerTwo.upgrade[0].y+20 > playerTwo.y && playerTwo.upgrade[0].y+20 < playerTwo.y+130 && playerTwo.movesCounterUpgrades>20 && playerTwo.movesCounterUpgrades<40){
            playerTwo.upgradeAmmo()
            generateRandomUpgradeTwo()
        }
        
    }


    //-----------------Fin del juego:
    
    const checkHurtOne = () => {
        playerTwo.ammo.forEach((bullet)=>{
            if(backgroundCounter<0 && bullet.x+3 < playerOne.x+35 && bullet.x+3 > playerOne.x && bullet.y > playerOne.y+15 && bullet.y < playerOne.y+120){
                bullet.x -= 500
                playerOne.receiveDamage()
                playerOne.checkPlayerLifes()
                checkEndOfGame()
            }
            if(backgroundCounter>0 && bullet.x < playerOne.x+35 && bullet.x+3 > playerOne.x && bullet.y > playerOne.y && bullet.y < playerOne.y+80){
                bullet.x -= 500
                playerOne.receiveDamage()
                playerOne.checkPlayerLifes()
                checkEndOfGame()
            }
        })
    }

    const checkHurtTwo = () => {
        playerOne.ammo.forEach((bullet)=>{
            if(bullet.x+3 > playerTwo.x+32 && bullet.x+3 < playerTwo.x+65 && bullet.y > playerTwo.y+15 && bullet.y < playerTwo.y+120){
                bullet.x += 500
                playerTwo.receiveDamage()
                playerTwo.checkPlayerLifes()
                checkEndOfGame()
            }
        })
    }

    const resetValues = () => {
        playerOne.ammo.length = 0
            playerTwo.ammo.length = 0
            playerOne.lifes = 3
            playerTwo.lifes = 3
            playerOne.x = 70
            playerTwo.x = 865
            playerOne.y = 300
            playerTwo.y = 300
            playerOne.maxAmmo = 1
            playerTwo.maxAmmo = 1
            playerOne.direction = ''
            playerTwo.direction = ''
            playerOne.movesCounter = 0
            playerOne.movesCounterUpgrades = 0
            playerTwo.movesCounter = 0
            playerTwo.movesCounterUpgrades = 0
            magikarp.style.display = "none";
            if(backgroundCounter<0){
                if(playerOne.alive===false){
                    twoWin.style.display = "block";
                    playerOne.alive = true
                }
                if(playerTwo.alive===false){
                    oneWin.style.display = "block";
                    playerTwo.alive = true
                }
            }else{
                if(playerOne.alive===false){
                    twoWinVader.style.display = "block";
                    playerOne.alive = true
                }
                if(playerTwo.alive===false){
                    oneWinYoda.style.display = "block";
                    playerTwo.alive = true
                }
            }
            backgroundCounter = 0
    }

    const checkEndOfGame = () => {
        if(playerOne.alive===false || playerTwo.alive===false){
            mainView.style.display = "none";
            if(backgroundCounter<0){
                farWestWinAudio.play()
            }else if(backgroundCounter>0 && playerOne.alive===true){
                starWarsOneWinAudio.play()
            } else if(backgroundCounter>0 && playerTwo.alive===true){
                starWarsTwoWinAudio.play()
            }
            starWarsDuelAudio.pause()  
            farWestDuelAudio.pause()
            resetSounds()
            resetValues()
        }
        
        
    }

    //------------------------Sonido:

    const soundOff = () => {
        farWestTransitionAudio.volume = 0
        farWestDuelAudio.volume = 0
        farWestWinAudio.volume = 0
        farWestShootAudioOne.volume = 0
        farWestShootAudioTwo.volume = 0
        starWarsDuelAudio.volume = 0
        starWarsTransitionAudio.volume = 0
        starWarsTwoWinAudio.volume = 0
        starWarsOneWinAudio.volume = 0
        blasterAudioOne.volume = 0
        blasterAudioTwo.volume = 0
        selectPageAudio.volume = 0
    }

    const soundOn = () => {
        farWestTransitionAudio.volume = .3
        farWestDuelAudio.volume = .05
        farWestWinAudio.volume = .2
        farWestShootAudioOne.volume = .1
        farWestShootAudioTwo.volume = .1
        starWarsDuelAudio.volume = .2
        starWarsTransitionAudio.volume = .3
        starWarsTwoWinAudio.volume = .4
        starWarsOneWinAudio.volume = .3
        blasterAudioOne.volume = .3
        blasterAudioTwo.volume = .3
        selectPageAudio.volume = .1
    }

    const resetSounds = () => {
        farWestTransitionAudio.currentTime = 0
        farWestDuelAudio.currentTime = 0
        farWestWinAudio.currentTime = 0
        starWarsDuelAudio.currentTime = 0
        starWarsTransitionAudio.currentTime = 0
        starWarsTwoWinAudio.currentTime = 0
        starWarsOneWinAudio.currentTime = 0
        selectPageAudio.currentTime = 0
    }



    
    // EVENT LISTENERS =================================
    
    document.addEventListener('keyup', (event)=>{     // Se utiliza keyup para evitar que un jugador mantenga su flecha apretada e impida el movimiento del otro
        if(event.key === 'ArrowUp'){                  // keydown permite desplazamiento de barrido
            playerTwo.direction = 'up'
            movePlayerTwo()
        } else if(event.key === 'ArrowDown'){
            playerTwo.direction = 'down'
            movePlayerTwo()
        } else if(event.key === 'w'){
            playerOne.direction = 'up'
            movePlayerOne()
        } else if(event.key === 's'){
            playerOne.direction = 'down'
            movePlayerOne()
        } else if(event.key === 'ArrowLeft'){
            if(backgroundCounter!==0){
                playerTwo.direction = 'left'
                movePlayerTwo()
            } else {
                selectPageAudio.pause()
                farWestTransition.style.display = "block"
                farWestTransitionAudio.play()
                setTimeout(()=>{
                    farWestTransition.style.display = "none"
                    farWestTransitionAudio.pause()
                    setTimeout(()=>{
                        farWestDuelAudio.play()
                    }, 700)
                }, 4450)
                setTimeout(()=>{
                    backgroundCounter = -1
                }, 4350)
            }
        } else if(event.key === 'ArrowRight'){
            if(backgroundCounter!==0){
                playerTwo.direction = 'right'
                movePlayerTwo()
            } else {
                selectPageAudio.pause()
                starWarsTransition.style.display = "block"
                starWarsTransitionAudio.play()
                setTimeout(()=>{
                    starWarsTransition.style.display = "none"
                    starWarsTransitionAudio.pause()
                    setTimeout(()=>{
                        starWarsDuelAudio.play()
                    }, 700)
                }, 5800)
                setTimeout(()=>{
                    backgroundCounter = 1
                }, 5700)
            }
        } else if(event.key === 'a'){
            playerOne.direction = 'left'
            movePlayerOne()
        } else if(event.key === 'd'){
            playerOne.direction = 'right'
            movePlayerOne()
        } 
    })

    document.addEventListener('keydown', (event)=>{
        if(event.key === '.'){
            createBulletTwo()
        } else if (event.key === 'b'){
            createBulletOne()
        }
    })

    soundOnButton.addEventListener('click', ()=>{
        soundOn()
    })

    soundOffButton.addEventListener('click', ()=>{
        soundOff()
    })
    

    restartArr.forEach((button)=>{
        button.onclick = () => {
            mainView.style.display = "block";
            oneWin.style.display = "none";
            twoWin.style.display = "none";
            oneWinYoda.style.display = "none"
            twoWinVader.style.display = "none"
            farWestWinAudio.pause()
            starWarsTwoWinAudio.pause()
            starWarsOneWinAudio.pause()
            selectPageAudio.play()
        }
    })
    
    
    // INVOCACIONES ====================================

    
    generateRandomUpgradeOne()
    generateRandomUpgradeTwo()
    updateCanvas()
    setInterval(generateRandomUpgradeOne, 10000)  // El valor de este intervalo nos dice cada cuanto cambiará de posición la upgrade
    setInterval(generateRandomUpgradeTwo, 10000)
    
}



