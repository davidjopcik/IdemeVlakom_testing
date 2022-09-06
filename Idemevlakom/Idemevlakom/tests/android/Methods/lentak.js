let string = "25.5.2022 - 24.6.2022 24:00"
string = string.split(" ")[0].concat(" ", string.split(" ")[1])
string 
console.log(string);

let string2 = "Streda 25.5.2022"
string2 = string2.split(" ")[1].concat(" ", "-")
console.log(string2);