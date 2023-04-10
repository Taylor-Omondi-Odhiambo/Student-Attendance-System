const studentID = document.querySelector("#studentID")
const firstName = document.querySelector("#firstName")
const surname = document.querySelector("#surname")
const classID = document.querySelector("#classID")
/*const form = document.querySelector('#studentCreation')
const submitBtn = document.querySelector('#submit-btn')

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
    submitBtn.disabled = true; // Disable submit button

    const formData = new FormData(form); // Get form data
    fetch('/submit-form', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      // Display success message
      successMsg.style.display = 'block';
      setTimeout(() => {
        successMsg.style.display = 'none'; // Hide success message after 3 seconds
        form.reset(); // Reset form fields
        submitBtn.disabled = false; // Enable submit button
      }, 3000);
    })
    .catch(error => {
      console.error(error);
      alert('Error occurred while saving data to the database');
      submitBtn.disabled = false; // Enable submit button
    });
  });
*/
document.querySelector("#classID").addEventListener('load',dropDownMenu)

function dropDownMenu () {
    fetch('/classesOptions')
        .then(response => response.text)
        .then(html => {
            dropDownMenu.innerHTML = html
        })
        .catch(error => {
            console.log("Error fetching dropdown options",error)
        })
}

/*document.querySelector(".button").addEventListener("click",async function status() {
    const response = await fetch('/addStudents')
    console.log(response)
    if (response.ok)
    {
        document.querySelector("#notification").textContent = "Failed to add student"
        setTimeout(() => {
            document.querySelector("#notification").textContent = ""
        },1000)
    }
})*/

/*document.querySelector(".button").addEventListener("click", () => {
    if (studentID.value!= ""  && firstName.value!= "" && surname.value!= "" && classID.value!= "" )
    {
    fetch('/addStudents')
    .then(response =>{
        if (!response.ok){
            document.querySelector("#notification").textContent = "Failed to add student"
            setTimeout(() => {
                document.querySelector("#notification").textContent = ""
            },1000)
        }
    })
    }
})*/

/*
  else{
             document.querySelector("#notification").textContent = "Failed to add students"
             setTimeout(() => {
                document.querySelector("#notification").textContent = ""
            },1000) 
        }*/
/*    else{
            document.querySelector("#notification").textContent = "Failed to add students"
            setTimeout(() => {
                document.querySelector("#notification").textContent = ""
            },1000)
        }*/



/*function notification (){
    document.querySelector("#notification").textContent = "Student added successfully"
    setTimeout(() => {
        document.querySelector("#notification").textContent = ""
    },1000)
}*/

/*document.querySelector(".button").addEventListener("click", () => {
    if (studentID.value!= ""  && firstName.value!= "" && surname.value!= "" && classID.value!= "" )
    {
        notification()
    }
})*/