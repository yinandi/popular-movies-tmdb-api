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
    if (page > 1 & page < 500){
        btnFirst.style.visibility = 'visible';
        btnBack.style.visibility = 'visible';
        btnNext.style.visibility = 'visible';
        btnLast.style.visibility = 'visible';
    }  
    if (page === 500){
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
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular?',{
            params:{
                page: page
            },
            headers: {
                'Authorization':  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmVhYTZkZDRhMGM0OGI3YjQ0NzFjZmI2OWI4OGMzMiIsInN1YiI6IjYzMGZhNGY2MTUxMWFhMDA5MjRjNjM4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1LlR8Gnis4tQc-G37zF7iTcX5zpdSC6bu4OqR-F9nhE'
            }
        });
        console.log(response);
        if (response.status === 200){
            let movies = '';
            response.data.results.forEach(movie =>{
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
