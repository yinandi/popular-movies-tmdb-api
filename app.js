let page = 1;
const btnFirst = document.getElementById('btnFirst');
const btnBack = document.getElementById('btnBack');
const btnNext = document.getElementById('btnNext');
const btnLast = document.getElementById('btnLast');

const displayButtons= () => {
  if (page === 1){
    btnFirst.style.visibility = 'hidden';
    btnBack.style.visibility = 'hidden';
    btnNext.style.visibility = 'visible';
    btnLast.style.visibility = 'visible';
  }
  else if (page > 1 & page < 500){
    btnFirst.style.visibility = 'visible';
    btnBack.style.visibility = 'visible';
    btnNext.style.visibility = 'visible';
    btnLast.style.visibility = 'visible';
  }  
  else if (page === 500){
    btnFirst.style.visibility = 'visible';
    btnBack.style.visibility = 'visible';
    btnNext.style.visibility = 'hidden';
    btnLast.style.visibility = 'hidden';
  }
}

btnFirst.addEventListener('click', ()=>{
  if(page > 1){
    page = 1;
    loadMovies();
  }

}) 
btnBack.addEventListener('click', ()=>{
  if (page > 1){
    page -=1;
    loadMovies();
  }
})
btnNext.addEventListener('click', ()=>{
  if (page < 500){
    page +=1;
    loadMovies();
  }
})
btnLast.addEventListener('click', ()=>{
  if(page != 500){
    page = 500;
    loadMovies();
  }
})  

const loadMovies = async() => {
  try{
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=96eaa6dd4a0c48b7b4471cfb69b88c32&page=${page}`);
    if (response.status === 200){
      const data = await response.json();
      let movies = '';
      data.results.forEach(movie =>{
        movies += `
        <div class="movie">
          <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
          <h3 class="title">${movie.title}</h3>
        </div>`
        });
        document.getElementById('container').innerHTML = movies;
        displayButtons();
      }
  }catch(error){
    console.log(error);
  }
}
loadMovies();
