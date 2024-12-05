


fetch("Data.txt")
.then(response => {
    if (!response.ok) throw new Error('File not found');
    return response.text();
})
.then(data => {
    let DATA = data;
    let comments = DATA.split('\n');

    for(let i = 0; i < 5; i++){
        try{
            let comment = document.createElement('p');
            comment.className = "center-text";
            comment.style.margin = "0 auto";
            comment.style.overflowWrap = "break-word";
            comment.style.marginBottom = "20px";
            comment.style.maxWidth = (window.innerWidth / 1.5) + 'px';
            comment.textContent = comments[i];
            document.getElementsByClassName('top-comments')[0].appendChild(comment);
        } catch (error){break;}
    }
    placeStars();
});

function placeStars(){
    //display stars!
    for(let i = 0; i < 125; i++){
        let star = document.createElement('img');

        star.src = "img/student1/Star.png";
        let rotation = Math.random() * 360;
        let screenHeight = document.documentElement.scrollHeight;
        let xPos = Math.random() * 95;
        let yPos = Math.random() * screenHeight * .95;
        star.style.width = "50px";
        star.style.position = "absolute";
        star.style.transform = `rotate(${rotation}deg)`;
        star.style.left = `${xPos}%`;
        star.style.top = `${yPos}px`;
        document.getElementsByClassName('stars')[0].appendChild(star);
    }
}

//For debugging
function print(printStatement){
            
    const postData = {
        value: printStatement
    }

    fetch('http://localhost:3000/print', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Reponse:', data);
    })
    .catch(error => {
        console.error('Error: ', error);
    });
}