
function myFunction() {
    console.log("Hello World!");
}
// constante de tipo string 

function myFunction2(){
    const cars = ["Saab", "Volvo", "BMW"];
    console.log(cars)
    // for para imprimir os elementos do array
    for (let i = 0; i < cars.length; i++) {
        console.log(cars[i]);
    }
    myFunction()
}


myFunction2()