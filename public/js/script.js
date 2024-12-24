//Adding addEventLister for search button
document.addEventListener('DOMContentLoaded', function(){
    //Finiding the search button ID "searchBtn" 
    //this is a class
    const allButtons = document.querySelectorAll('.searchBtn');
    //Finiding the search button ID "searchBar" 
    //this is a class
    const searchBar = document.querySelector('.searchBar');
    //Finiding the search button ID "searchInput" 
    //this is an ID
    const searchInput = document.getElementById('searchInput');
    //Finiding the search button ID "searchClose" 
    //this is an ID
    const searchClose = document.getElementById('searchClose');
    //Looping it through all pages
    for (var i = 0; i < allButtons.length; i++) {
      allButtons[i].addEventListener('click', function() {
        //Search Bar visible when clicking the button
        searchBar.style.visibility = 'visible';
        searchBar.classList.add('open');
        //In header.ejs i have kept it false here when the button is clicked it will change it to true
        this.setAttribute('aria-expanded', 'true');
        //Focus on the input of the search
        searchInput.focus();
      });
    }
    //For close button in the search
    searchClose.addEventListener('click', function() {
      //When click the close button it will hide the search bar
      searchBar.style.visibility = 'hidden';
      searchBar.classList.remove('open');
      this.setAttribute('aria-expanded', 'false');
    });
  
  
  });