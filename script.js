window.onload = () => {

    // TARGETS ======================================

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    const mainView = document.getElementById('mainview')
    const oneWin = document.getElementById('one-win')
    const twoWin = document.getElementById('two-win')
    const restart = document.getElementsByClassName('restart')
    const restartArr = [...restart]
    
   
    
    // CLASES ========================================

    class Player {
        constructor(_x, _rightImageRoute, _middleImage, _leftImageRoute){
            this.x = _x
            this.y = 300
            this.width = 65
            this.height = 140
            this.imageRight = _rightImageRoute
            this.imageMiddle = _middleImage
            this.imageLeft = _leftImageRoute
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
        constructor(_x, _y){
            this.x = _x
            this.y = _y
            this.height = 3
            this.width = 14
            this.color = 'black'
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

    const playerOne = new Player(70, './images/Players/playerFour-rightStep.png', './images/Players/playerFour-middleStep.png', './images/Players/playerFour-leftStep.png')
    const playerTwo = new Player(865, './images/Players/playerTwo-rightStep.png', './images/Players/playerTwo-middleStep.png', './images/Players/playerTwo-leftStep.png')
    
    
    // FUNCIONES =====================================
    
    // -----------------------Bucle:

    const updateCanvas = () => {
        drawTown()
        drawDivision()
        drawCowboyTwo()
        drawCowboyOne()
        drawBulletsOne()
        removeBulletOne()
        displayMaxAmmoOne()
        drawBulletsTwo()
        removeBulletTwo()
        displayMaxAmmoTwo()
        checkHurtOne()
        checkHurtTwo()
        drawLifesOne()
        drawLifesTwo()
        checkMovesForUpgradeOne()
        checkMovesForUpgradeTwo()
        checkUpgradeCatchOne()
        checkUpgradeCatchTwo()
                
        requestAnimationFrame(updateCanvas)
    }


    //--------------------Escenario:

    const drawTown = () => {
        const town = new Image()
        town.src = './images/Backgrounds/town_background.jpg'
        town.onload = () => {
            ctx.drawImage(town, 0, 0, 1000, 600)
        }
    }

    const drawRect = (x, y, width, height, _color) => {
        ctx.fillStyle = _color
        ctx.fillRect(x, y, width, height)
      }

    const drawDivision = () => {
        drawRect(503, 200, 3, 400, 'sienna')
    }

    const displayMaxAmmoOne = () => {
        ctx.fillStyle = 'black'
        ctx.font = '20px Syne Mono'
        if(playerOne.maxAmmo===1){
            ctx.fillText(`${playerOne.maxAmmo} shoot max`, 122, 581)
        } else {
            ctx.fillText(`${playerOne.maxAmmo} shoots max`, 122, 581)
        }
    }

    const displayMaxAmmoTwo = () => {
        ctx.fillStyle = 'black'
        ctx.font = '20px Syne Mono'
        if(playerTwo.maxAmmo===1){
            ctx.fillText(`${playerTwo.maxAmmo} shoot max`, 752, 581)
        } else {
            ctx.fillText(`${playerTwo.maxAmmo} shoots max`, 740, 581)
        }
    }

    const drawLifesOne = () => {
        const life = new Image()
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
    }

    const drawLifesTwo = () => {
        const life = new Image()
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
    }
      
    //-------------------Personajes:

    const drawCowboyOne = () => {

        if(playerOne.movesCounter===0){
            let cowboyOne = new Image()
            cowboyOne.src = playerOne.imageLeft
            cowboyOne.onload = () => {
                ctx.drawImage(cowboyOne, playerOne.x, playerOne.y, playerOne.width, playerOne.height)
            }
        }
        if(playerOne.movesCounter===1){
            let cowboyOne = new Image()
            cowboyOne.src = playerOne.imageMiddle
            cowboyOne.onload = () => {
                ctx.drawImage(cowboyOne, playerOne.x, playerOne.y, 85, playerOne.height)
            }
        }
        if(playerOne.movesCounter===2){
            let cowboyOne = new Image()
            cowboyOne.src = playerOne.imageRight
            cowboyOne.onload = () => {
                ctx.drawImage(cowboyOne, playerOne.x, playerOne.y, playerOne.width, playerOne.height)
            }
        }


    }
    
    const drawCowboyTwo = () => {

        if(playerTwo.movesCounter===0){
            let cowboyTwo = new Image()
            cowboyTwo.src = playerTwo.imageLeft
            cowboyTwo.onload = () => {
                ctx.drawImage(cowboyTwo, playerTwo.x, playerTwo.y, playerTwo.width, playerTwo.height)
            }
        }
        if(playerTwo.movesCounter===1){
            let cowboyTwo = new Image()
            cowboyTwo.src = playerTwo.imageMiddle
            cowboyTwo.onload = () => {
                ctx.drawImage(cowboyTwo, playerTwo.x, playerTwo.y, 83, playerTwo.height)
            }
        }
        if(playerTwo.movesCounter===2){
            let cowboyTwo = new Image()
            cowboyTwo.src = playerTwo.imageRight
            cowboyTwo.onload = () => {
                ctx.drawImage(cowboyTwo, playerTwo.x, playerTwo.y, playerTwo.width, playerTwo.height)
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
            drawCowboyOne()
        } else if (playerOne.direction==='down' && playerOne.y < 450){
            // drawTown()
            playerOne.y+=30
            drawCowboyOne()
        } else if (playerOne.direction==='left' && playerOne.x > 50){
            // drawTown()
            playerOne.x-=30
            drawCowboyOne()
        } else if (playerOne.direction==='right' && playerOne.x < 400){
            // drawTown()
            playerOne.x+=30
            drawCowboyOne()
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
            drawCowboyTwo()
        } else if (playerTwo.direction==='down' && playerTwo.y < 450){
            // drawTown()
            playerTwo.y+=30
            drawCowboyTwo()
        } else if (playerTwo.direction==='left' && playerTwo.x > 535){
            // drawTown()
            playerTwo.x-=30
            drawCowboyTwo()
        } else if (playerTwo.direction==='right' && playerTwo.x < 885){
            // drawTown()
            playerTwo.x+=30
            drawCowboyTwo()
        }
    }


    //------------------------Balas:

    const createBulletOne = () => {
        if(playerOne.ammo.length<playerOne.maxAmmo){
            playerOne.ammo.push(new Bullet(playerOne.x+65, playerOne.y+70))
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
        playerTwo.ammo.push(new Bullet(playerTwo.x, playerTwo.y+70))
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
            return bullet.x+=15
          })
    }

    const moveBulletsTwo = () => {
        playerTwo.ammo.forEach((bullet)=>{ 
            return bullet.x-=15
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
            upgradeImage.src = './images/Elements/upgrade.png'
            upgradeImage.onload = () => {
                ctx.drawImage(upgradeImage, playerOne.upgrade[0].x, playerOne.upgrade[0].y, playerOne.upgrade[0].width, playerOne.upgrade[0].height)
            }
        }
    }

    const drawUpgradesTwo = () => {
        if(playerTwo.upgrade.length>0){
            upgradeImage = new Image()
            upgradeImage.src = './images/Elements/upgrade.png'
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
        if(playerOne.upgrade[0].x+20 > playerOne.x && playerOne.upgrade[0].x+20 < playerOne.x+65 && playerOne.upgrade[0].y+20 > playerOne.y && playerOne.upgrade[0].y+20 < playerOne.y+140){
            playerOne.upgradeAmmo()
            generateRandomUpgradeOne()
        }
    }

    const checkUpgradeCatchTwo = () => {
        if(playerTwo.upgrade[0].x+20 > playerTwo.x && playerTwo.upgrade[0].x+20 < playerTwo.x+65 && playerTwo.upgrade[0].y+20 > playerTwo.y && playerTwo.upgrade[0].y+20 < playerTwo.y+140){
            playerTwo.upgradeAmmo()
            generateRandomUpgradeTwo()
        }
    }


    //-----------------Fin del juego:
    
    const checkHurtOne = () => {
        playerTwo.ammo.forEach((bullet)=>{
            if(bullet.x+3 < playerOne.x+35 && bullet.x+3 > playerOne.x && bullet.y > playerOne.y && bullet.y < playerOne.y+140){
                bullet.x -= 200
                playerOne.receiveDamage()
                playerOne.checkPlayerLifes()
                checkEndOfGame()
            }
        })
    }

    const checkHurtTwo = () => {
        playerOne.ammo.forEach((bullet)=>{
            if(bullet.x+3 > playerTwo.x+32 && bullet.x+3 < playerTwo.x+65 && bullet.y > playerTwo.y && bullet.y < playerTwo.y+140){
                bullet.x += 200
                playerTwo.receiveDamage()
                playerTwo.checkPlayerLifes()
                checkEndOfGame()
            }
        })
    }

    const checkEndOfGame = () => {
        if(playerOne.alive===false || playerTwo.alive===false){
            mainView.style.display = "none";
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
        }
        if(playerOne.alive===false){
            twoWin.style.display = "block";
            playerOne.alive = true
        }
        if(playerTwo.alive===false){
            oneWin.style.display = "block";
            playerTwo.alive = true
        }
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
            playerTwo.direction = 'up'
            movePlayerOne()
        } else if(event.key === 's'){
            playerOne.direction = 'down'
            movePlayerOne()
        } else if(event.key === 'ArrowLeft'){
            playerTwo.direction = 'left'
            movePlayerTwo()
        } else if(event.key === 'ArrowRight'){
            playerTwo.direction = 'right'
            movePlayerTwo()
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


    
    restartArr.forEach((button)=>{
        button.onclick = () => {
            mainView.style.display = "block";
            oneWin.style.display = "none";
            twoWin.style.display = "none";
        }
    })
    
    
    
    // INVOCACIONES ====================================
    
    generateRandomUpgradeOne()
    generateRandomUpgradeTwo()
    updateCanvas()
    setInterval(generateRandomUpgradeOne, 7000)  // El valor de este intervalo nos dice cada cuanto cambiará de posición la upgrade
    setInterval(generateRandomUpgradeTwo, 7000)
    
}



