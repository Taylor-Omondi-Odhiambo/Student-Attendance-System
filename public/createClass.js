document.querySelector(".button").addEventListener("click", () => {
    notification()
    
})

function notification (){
    document.querySelector("#notification").textContent = "Classroom created successfully"
    setTimeout(() => {
        document.querySelector("#notification").textContent = ""
    },1000)
}
