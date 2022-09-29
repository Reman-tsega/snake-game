document.addEventListener("DOMContentLoaded", () => {

    const square = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startbtn = document.querySelector('.start')

    const width = 10
    let currenIndex = 0 // first div in our grid
    let foodIndex = 0 //  first div in our grid
    let currentSnake = [2, 1, 0] // snake body ---> head = 2, tail =0

    let direction = 1 // among the div square area the snake change by 1 div each time it changes the direction
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0


    //  ________ start the game create the snake body _________________
    function startGame() {
        // _________________  reset ___________________-
        // remove snake and food reset score and timer and change to right diretion 
        currentSnake.forEach(index => square[index].classList.remove('snake'))
        currentSnake.forEach(index => square[index].classList.remove('tip'))

        square[foodIndex].classList.remove('food')
        clearInterval(interval)
        score = 0
        scoreDisplay.innerText = score

        direction = 1
        intervalTime = 1000
        currentSnake = [2, 1, 0]
        currenIndex = 0

        randomFood()

        // ____________________ -create snake body -________________________________

        currentSnake.forEach(index => square[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)

    }


    // _______________-  generate food at random position _______________
    function randomFood() {
        do {
            foodIndex = Math.floor(Math.random() * 100)

        } while (square[foodIndex].classList.contains('snake'))

        square[foodIndex].classList.add('food')
    }

    // _________________ oucomes of diff event ______________--

    function moveOutcomes() {

        // _________ snake hitting border _____________
        if (
            (direction === 1 && currentSnake[0] % width) === width - 1 || // heating right border @90s
            (direction === -width && currentSnake[0] - width < 0) || // hitting up
            (direction === -1 && currentSnake[0] % width === 0) || // hit left @10
            (direction === width && currentSnake[0] + width >= (width * width)) || // hit bottom
            (square[currentSnake[0] + direction].classList.contains('snake')) // if the snake biet itself
        ) {
            return clearInterval(interval)
        }
        // ______________ move ________________- 
        const tail = currentSnake.pop()
        square[tail].classList.remove('snake') // remove the last segment(tail) of snake body 
        currentSnake.unshift(currentSnake[0] + direction) // gives direction to the head 
        square[currentSnake[0]].classList.add('snake') // add at front
        square[currentSnake[0]].classList.add('tip')
        square[currentSnake[1]].classList.remove('tip')

        // _______ colide with food ___________
        if (square[currentSnake[0]].classList.contains('food')) {
            // remove the food
            square[currentSnake[0]].classList.remove('food')
                // add snake segment at head side
            square[tail].classList.add('snake')
            currentSnake.push(tail)

            // new food
            randomFood()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime *= speed // speed up
            interval = setInterval(moveOutcomes, intervalTime)
        }

    }

    // _________________ direction control (change)___________________
    function control(e) {
        // square[currenIndex].classList.remove('snake')
        // console.log(square[currenIndex])

        if (e.keyCode === 39) { //right
            direction = 1 // if we press the right arrow it keyCOde vlue is 39(specified) then the snake moves 1 div towards the right
        } else if (e.keyCode === 38) { // up
            direction = -width // since the div grid is 10 by 10 if we press the up key it go back 10 dives
        } else if (e.keyCode === 37) { // left
            direction = -1
        } else if (e.keyCode === 40) { // down
            direction = +width // since the div grid is 10 by 10 if we press the down key it go forth 10 dives on the second line 
        }

    }

    document.addEventListener('keyup', control)
    startbtn.addEventListener('click', startGame)



})