function CalculateBMI(){
    let weightValue = parseInt(document.getElementById("weightInput").value);
    let heightValue = parseInt(document.getElementById("heightInput").value);

    document.getElementById("bmiOutput").innerHTML = "BMI: " + weightValue / (Math.pow(heightValue));
}