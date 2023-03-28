const studentID = document.querySelector("#studentID")
const firstName = document.querySelector("#firstName")
const surname = document.querySelector("#surname")
const classID = document.querySelector("#classID")

document.querySelector("#studentCreation").addEventListener("submit",() => {
    if (studentID.value!= ""  && firstName.value!= "" && surname.value!= "" && classID.value!= "" )
    {
        notification()
    }
    
})

/*document.querySelector(".button").addEventListener("click", () => {
    if (studentID.value!= ""  && firstName.value!= "" && surname.value!= "" && classID.value!= "" )
    {
        notification()
    }
    
    
})*/

function notification (){
    document.querySelector("#notification").textContent = "Student added successfully"
    setTimeout(() => {
        document.querySelector("#notification").textContent = ""
    },1000)
}
