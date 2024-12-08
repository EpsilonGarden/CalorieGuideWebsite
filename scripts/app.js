// MAIN BOT SOFTWARE

let G_foodName = "";
let G_foodInfo = "";
let G_foodNutri = "";
let G_foodLink = "";

async function sendUserInput() {
    // calls the function
    await getBotResponse();

    document.getElementById("userInput").value = "";
}

async function getBotResponse() {
    // html input for the user input
    const userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") {
        return;
    }

    // main algorithm for the search system
    try {
        // references the database json file
        const response = await fetch('scripts/data.json');
        const data = await response.json();

        // calculating where the index is in the json array
        for (let i = 0; i < data.intents.length; i++) {
            const intent = data.intents[i];
            for (let j = 0; j < intent.patterns.length; j++) {
                const pattern = intent.patterns[j];
                // calculating the string distance
                const distance = levenshteinDistance(userInput.toLowerCase(), pattern.toLowerCase());
                const similarity = 1 - (distance / Math.max(userInput.length, pattern.length));
                const threshold = 0.8;
                // calculating the similarity threshold
                if (similarity >= threshold) {
                    let foodNameRes = intent._foodName[Math.floor(Math.random() * intent._foodName.length)];
                    let foodInfoRes = intent._foodInfo[Math.floor(Math.random() * intent._foodInfo.length)];
                    let foodNutriRes = intent._foodNutri[Math.floor(Math.random() * intent._foodNutri.length)];
                    let foodIdRes = intent._foodId[Math.floor(Math.random() * intent._foodId.length)];

                    document.getElementById("foodName").innerHTML = foodNameRes;
                    document.getElementById("foodInfo").innerHTML = foodInfoRes;
                    document.getElementById("foodNutri").innerHTML = foodNutriRes;
                    document.getElementById("foodId").src = foodIdRes;
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}

// random Github code for identifying the similarities between two strings
function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, 
                    matrix[i][j - 1] + 1,     
                    matrix[i - 1][j] + 1      
                );
            }
        }
    }
    return matrix[b.length][a.length];
}
  
