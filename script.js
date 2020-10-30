window.onload = () => {

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    
   
    
    // CLASES ========================================

    // class Player {
    //     constructor(){
    //         this.alive = true
    //         this.lifes = 3
    //         // this.direction
    //     }
    // }

    class Bullet {
        constructor(_x, _y){
            this.x = _x
            this.y = _y
            this.height = 8
            this.width = 8
            this.color = 'red'
        }
    }
    
    
    // VARIABLES =====================================
    
    const ammoOne = []
    const ammoTwo = []   
    let directionOne = ''
    let playerOneY = 300
    let playerOneX = 70
    let directionTwo = ''
    let playerTwoY = 300
    let playerTwoX = 865
    
    
    
    // FUNCIONES =====================================
    
    const updateCanvas = () => {
        drawTown()
        drawDivision()
        drawCowboyTwo()
        drawCowboyOne()
        drawBulletsOne()
        drawBulletsTwo()

        
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
        ammoOne.push(new Bullet(playerOneX+65, playerOneY+70))
    }

    const createBulletTwo = () => {
        ammoTwo.push(new Bullet(playerTwoX, playerTwoY+70))
    }
    
    const moveBulletsOne = () => {
        ammoOne.forEach((item)=>{ 
            return item.x+=20
          })
    }

    const moveBulletsTwo = () => {
        ammoTwo.forEach((item)=>{ 
            return item.x-=20
          })
    }

    const drawBulletsOne = () => {
        for(i=0; i<ammoOne.length; i++){
          drawRect(ammoOne[i].x, ammoOne[i].y, ammoOne[i].width, ammoOne[i].height, ammoOne[i].color)
        }
        moveBulletsOne()
    }

    const drawBulletsTwo = () => {
        for(i=0; i<ammoTwo.length; i++){
          drawRect(ammoTwo[i].x, ammoTwo[i].y, ammoTwo[i].width, ammoTwo[i].height, ammoTwo[i].color)
        }
        moveBulletsTwo()
    }


    const drawCowboyOne = () => {
        const cowboyOne = new Image()
        cowboyOne.src = './images/cowboy1.png'
        cowboyOne.onload = () => {
            ctx.drawImage(cowboyOne, playerOneX, playerOneY, 65, 140)
        }
    }
    
    const drawCowboyTwo = () => {
        const cowboyTwo = new Image()
        cowboyTwo.src = './images/cowboy2.png'
        cowboyTwo.onload = () => {
            ctx.drawImage(cowboyTwo, playerTwoX, playerTwoY, 65, 140)
        }
    }

    const movePlayerOne = () => {
        if(directionOne==='up' && playerOneY > 160){
            // drawTown()
            playerOneY-=30                                      // Velocidad fijada en 30px porque con keyup se mueven click a click
            drawCowboyOne()
        } else if (directionOne==='down' && playerOneY < 450){
            // drawTown()
            playerOneY+=30
            drawCowboyOne()
        } else if (directionOne==='left' && playerOneX > 50){
            // drawTown()
            playerOneX-=30
            drawCowboyOne()
        } else if (directionOne==='right' && playerOneX < 410){
            // drawTown()
            playerOneX+=30
            drawCowboyOne()
        }
    }
    
    const movePlayerTwo = () => {
        if(directionTwo==='up' && playerTwoY > 160){
            // drawTown()
            playerTwoY-=30
            drawCowboyTwo()
        } else if (directionTwo==='down' && playerTwoY < 450){
            // drawTown()
            playerTwoY+=30
            drawCowboyTwo()
        } else if (directionTwo==='left' && playerTwoX > 535){
            // drawTown()
            playerTwoX-=30
            drawCowboyTwo()
        } else if (directionTwo==='right' && playerTwoX < 885){
            // drawTown()
            playerTwoX+=30
            drawCowboyTwo()
        }
    }
    
    
    
    
    
    // EVENT LISTENERS =================================
    
    document.addEventListener('keyup', (event)=>{     // Se utiliza keyup para evitar que un jugador mantenga su flecha apretada e impida el movimiento del otro
        if(event.key === 'ArrowUp'){                  // keydown permite desplazamiento de barrido
            directionTwo = 'up'
            movePlayerTwo()
        } else if(event.key === 'ArrowDown'){
            directionTwo = 'down'
            movePlayerTwo()
        } else if(event.key === 'w'){
            directionOne = 'up'
            movePlayerOne()
        } else if(event.key === 's'){
            directionOne = 'down'
            movePlayerOne()
        } else if(event.key === 'ArrowLeft'){
            directionTwo = 'left'
            movePlayerTwo()
        } else if(event.key === 'ArrowRight'){
            directionTwo = 'right'
            movePlayerTwo()
        } else if(event.key === 'a'){
            directionOne = 'left'
            movePlayerOne()
        } else if(event.key === 'd'){
            directionOne = 'right'
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
    
    
    // INVOCACIONES ====================================
    
    drawTown()
    updateCanvas()
    
    // drawTown()
    // drawCowboy(cowboyOne, 70)
    // drawCowboyTwo(cowboyTwo, 865)
    

    // CONTADOR IMAGENES CARGADAS
    

}



