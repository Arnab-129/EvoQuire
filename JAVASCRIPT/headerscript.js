function toggler(){
    icon = document.getElementById('icon');
    links = document.getElementById('dropdown');
    if(links.style.display === 'flex'){
        links.style.display = 'none';
    }    
    else
        links.style.display = 'flex';
}