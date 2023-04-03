document.querySelector(".button").addEventListener("click", () => {
    notification()
    
})

function notification (){
    document.querySelector("#classID").addEventListener("click", () => {
        document.querySelector("#classID").value = ""
    })
    document.querySelector("#teacher").addEventListener("click", () => {
        document.querySelector("#teacher").value = ""
    })
    document.querySelector("#notification").textContent = "Classroom created successfully"
    setTimeout(() => {
        document.querySelector("#notification").textContent = ""
    },1000)
    
}
