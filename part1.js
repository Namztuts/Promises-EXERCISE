const url = 'http://numbersapi.com';

//1.
const faveNumber = 4;
axios.get(`${url}/${faveNumber}`).then((response) => {
   console.log('Response:', response);
});

//2.
const faveNumbers = [1, 2, 3];
axios.get(`${url}/${faveNumbers}`).then((response) => {
   $('body').append('<ul></ul>');
   for (let i in response.data) {
      $('ul').append(`<li>${response.data[i]}</li>`);
   }
});

//3.
Promise.all(
   // creates an array with 4 values
   Array.from({ length: 4 }, () => {
      return axios.get(`${url}/${faveNumber}`);
   })
).then((responseArray) => {
   $('body').append('<ol></ol>');
   responseArray.forEach((fact) => {
      $('ol').append(`<li>${fact.data}</li>`);
   });
});
