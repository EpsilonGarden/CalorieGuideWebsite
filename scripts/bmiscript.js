function CalculateBMI(){
    let weightValue = document.getElementById("weightInput").value;
    let heightValue = document.getElementById("heightInput").value;

    let lbs = parseFloat(weightValue);
    let inches = parseFloat(heightValue)
    let result = "BMI: " + (lbs  * 703) / Math.pow(inches ,2);

    document.getElementById("bmiOutput").innerHTML = result;
}