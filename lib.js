function sum(a , b) {
 
    return a + b;

}


function verify(a, b, c) {
    
    if (a + b > c && a + c > b && b + c > a) {
       // Identifica o tipo do triângulo
        if (a === b && b === c && c == a) {
            return "Triângulo equilátero";
        } else if (a === b || a === c || b === c) {
            return "Triângulo isósceles";
        } else {
            return "Triângulo escaleno";
        }
    } else {
        return "Os valores informados não formam um triângulo";
    }
} 




function calculadora(num1, num2, operador) {
    switch (operador) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num2 !== 0 ? num1 / num2 : "Erro: Divisão por zero!";
        default:
            return "Operador inválido. Use: +, -, *, /.";
    }
}

export { sum , calculadora, verify }