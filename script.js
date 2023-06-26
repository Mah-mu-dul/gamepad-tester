window.addEventListener("gamepadconnected", (event) => {
    handleConnectDisconnect(event, true)
})

window.addEventListener("gamepaddisconnected", (event) => {
    handleConnectDisconnect(event, false)
})


const handleConnectDisconnect = (event, connect) => {
    console.log(connect)
    if (connect) {
        document.getElementById("buttons").innerHTML = `<h1>Connected</h1>`
        createButtonLayout(navigator.getGamepads()[0].buttons)
        return
    }
    document.getElementById("buttons").innerHTML = `<h1>Disconnected</h1>`


}



function createButtonLayout(buttons) {
    const buttonArea = document.getElementById("buttons");
    buttonArea.innerHTML = "";
    for (let i = 0; i < buttons.length; i++) {
        buttonArea.innerHTML += createButtonHtml(i, 0);
    }
}

function createButtonHtml(index, value) {
    return `<div class="button" id="button-${index}-wholebtn">
            <svg width="10px" height="50px">
                <rect width="10px" height="50px" fill="grey"></rect>
                <rect
                    class="button-meter"
                    width="10px"
                    x="0"
                    y="50"
                    data-original-y-position="50"
                    height="50px"
                    fill="rgb(60, 61, 60)"
                ></rect>
            </svg>
            <div class='button-text-area'>
                <div class="button-name">B${index}</div>
                <div class="button-value" id=button-${index}>${value.toFixed(2)}</div>
            </div>
        </div>`;
}







function updateGamepad() {
    var gamepads = navigator.getGamepads();


    // Loop through all connected gamepads
    for (var i = 0; i < gamepads.length; i++) {
        var gamepad = gamepads[i];

        // Check if the gamepad is connected
        if (gamepad) {
            // Loop through all buttons of the gamepad
            for (var j = 0; j < gamepad.buttons.length; j++) {
                var button = gamepad.buttons[j];


                // Check if the button is pressed
                if (button.value > 0) {
                    console.log("Button " + j);
                    if (j > -1) {
                        // Get the path element by its ID
                        document.getElementById(`btn-${j}`).setAttribute('fill', '#282b42   ');
                        document.getElementById(`button-${j}`).innerText = button.value.toFixed(2)
                        document.getElementById(`button-${j}-wholebtn`).setAttribute("style", "background-color: #9199cc;")

                        break
                    }


                }
                document.getElementById(`button-${j}-wholebtn`).removeAttribute("style")
                document.getElementById(`button-${j}`).innerText = button.value.toFixed(2)
                document.getElementById(`btn-${j}`).setAttribute('fill', '#fff7dbdd');

            }

            ShowAxis(gamepad.axes)
            updateCirclePosition(gamepad.axes[0] * 18 + 133, gamepad.axes[1] * 18 + 228.3, 10);
            updateCirclePosition(gamepad.axes[2] * 18 + 220.7, gamepad.axes[3] * 18 + 228.4, 11);
            updateSlideBar(gamepad.axes)

        }
    }

    // Request the next animation frame
    requestAnimationFrame(updateGamepad);
}
const updateSlideBar = (axises) => {
    document.getElementById("left-x-axis").setAttribute("cx", 200 + axises[0] * 185 + 1)
    document.getElementById("right-x-axis").setAttribute("cx", 200 + axises[2] * 185 + 1)
    document.getElementById("left-y-axis").setAttribute("cy", 200 + axises[1] * 185 + 1)
    document.getElementById("right-y-axis").setAttribute("cy", 200 + axises[3] * 185 + 1)
}


const ShowAxis = (axises) => {
    axises.forEach((axis, i) => {

        document.getElementById(`axis-${i}`).innerText = axis.toFixed(2);
    });
}

// Get the circle element by its ID

// Function to update the circle position based on joystick input
function updateCirclePosition(x, y, stick) {
    // Update the cx and cy attributes of the circle
    const circle = document.getElementById(`btn-${stick}`);
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);


}

// Example usage
// Call the updateCirclePosition function with the joystick input values



// Start the gamepad update loop
updateGamepad();
