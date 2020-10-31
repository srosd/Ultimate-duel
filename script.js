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
        constructor(_x, _imageRoute){
            this.x = _x
            this.y = 300
            this.width = 65
            this.height = 140
            this.image = _imageRoute
            this.alive = true
            this.lifes = 3
            this.direction = ''
            this.ammo = []
        }

        receiveDamage(){
            this.lifes--
        }

        checkPlayerLifes(){
            if(this.lifes <= 0){
                this.alive = false
            }
        }
    } 

    class Bullet {
        constructor(_x, _y){
            this.x = _x
            this.y = _y
            this.height = 7
            this.width = 7
            this.color = 'red'
        }
    }
    
    
    // CREACIÓN DE LOS JUGADORES =====================

    const playerOne = new Player(70, './images/cowboy1.png')
    const playerTwo = new Player(865, './images/cowboy2.png')
    
    
    // FUNCIONES =====================================
    
    const updateCanvas = () => {
        drawTown()
        drawDivision()
        drawCowboyTwo()
        drawCowboyOne()
        drawBulletsOne()
        drawBulletsTwo()
        checkHurtOne()
        checkHurtTwo()
                
        requestAnimationFrame(updateCanvas)
    }

    const drawTown = () => {
        const town = new Image()
        town.src = './images/background-canvas-image.jpg'
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

    const createBulletOne = () => {
        playerOne.ammo.push(new Bullet(playerOne.x+65, playerOne.y+70))
    }

    const createBulletTwo = () => {
        playerTwo.ammo.push(new Bullet(playerTwo.x, playerTwo.y+70))
    }
    
    const moveBulletsOne = () => {
        playerOne.ammo.forEach((bullet)=>{ 
            return bullet.x+=20
          })
    }

    const moveBulletsTwo = () => {
        playerTwo.ammo.forEach((bullet)=>{ 
            return bullet.x-=20
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

    checkHurtOne = () => {
        playerTwo.ammo.forEach((bullet, index)=>{
            if(bullet.x+3 < playerOne.x+35 && bullet.x+3 > playerOne.x && bullet.y+3 > playerOne.y && bullet.y+3 < playerOne.y+140){
                playerTwo.ammo.splice(index, 1)
                playerOne.receiveDamage()
                playerOne.checkPlayerLifes()
                checkEndOfGame()
            }
        })
    }

    checkHurtTwo = () => {
        playerOne.ammo.forEach((bullet, index)=>{
            if(bullet.x+3 > playerTwo.x+32 && bullet.x+3 < playerTwo.x+65 && bullet.y+3 > playerTwo.y && bullet.y+3 < playerTwo.y+140){
                playerOne.ammo.splice(index, 1)
                playerTwo.receiveDamage()
                playerTwo.checkPlayerLifes()
                checkEndOfGame()
            }
        })
    }


    const checkEndOfGame = () => {
        if(playerOne.alive===false){
            mainView.style.display = "none";
            twoWin.style.display = "block";
            playerOne.ammo.length = 0
            playerTwo.ammo.length = 0
            playerOne.lifes = 3
            playerTwo.lifes = 3
            playerOne.alive = true
            playerTwo.alive = true
        }
        if(playerTwo.alive===false){
            mainView.style.display = "none";
            oneWin.style.display = "block";
            playerOne.ammo.length = 0
            playerTwo.ammo.length = 0
            playerOne.lifes = 3
            playerTwo.lifes = 3
            playerOne.alive = true
            playerTwo.alive = true
        }
    }


    const drawCowboyOne = () => {
        const cowboyOne = new Image()
        cowboyOne.src = playerOne.image
        cowboyOne.onload = () => {
            ctx.drawImage(cowboyOne, playerOne.x, playerOne.y, playerOne.width, playerOne.height)
        }
    }
    
    const drawCowboyTwo = () => {
        const cowboyTwo = new Image()
        cowboyTwo.src = playerTwo.image
        cowboyTwo.onload = () => {
            ctx.drawImage(cowboyTwo, playerTwo.x, playerTwo.y, playerTwo.width, playerTwo.height)
        }
    }

    const movePlayerOne = () => {
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
        } else if (playerOne.direction==='right' && playerOne.x < 410){
            // drawTown()
            playerOne.x+=30
            drawCowboyOne()
        }
    }
    
    const movePlayerTwo = () => {
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
    
    updateCanvas()
    
  
    

}



