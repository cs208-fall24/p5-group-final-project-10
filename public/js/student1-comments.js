numberOfComments = 0;
const fileUrl = "Data.txt";
let comments = [];
   
fetch(fileUrl)
.then(response => {
    if (!response.ok) throw new Error('File not found');
    return response.text();
})
.then(data => {
    //Show comments
    const DATA = data;

    const allComments = DATA.split('\n');

    for(let i = 0; i < allComments.length; i++){
        //----- comment
        const pElement = document.createElement('p');

        pElement.textContent = allComments[i];
        pElement.className = "comment";
        pElement.style.maxWidth = (window.innerWidth / 1.5) + 'px';
        pElement.id = i;
        pElement.textContent = (i + 1) + ". " + pElement.textContent;

        numberOfComments++;

        document.getElementsByClassName("paragraph-section2")[0].appendChild(pElement);
                
        comments.push(pElement);
        //----- deleteButton
        const deleteButton = document.createElement('button');

        deleteButton.innerHTML = 'delete';
        deleteButton.style = "background-color: transparent; border: 2px solid transparent; color: #333";

        deleteButton.addEventListener('mouseover', function(){
            deleteButton.style.color = 'red';
        });

        deleteButton.addEventListener('mouseout', function(){
            deleteButton.style.color = '#333';
        });

        deleteButton.addEventListener('click', function(){
            const postData = {
                value: parseInt(pElement.id),
            };
            fetch('http://localhost:3000/deleteComment', {
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
            for(let k = parseInt(pElement.id) + 1; k < comments.length; k++){
                const commentText = comments[k].textContent;
                const index = commentText.indexOf('.');
                comments[k].id--;
                const buttons = comments[k].querySelectorAll('button');
                comments[k].textContent = (parseInt(comments[k].id) + 1) + commentText.substring(index, commentText.length - 10);
                comments[k].appendChild(buttons[0]);
                comments[k].appendChild(buttons[1]);
            }
            comments.splice(parseInt(pElement.id), 1);
            document.getElementById(parseInt(pElement.id)).remove();
            deleteButton.remove();
            editButton.remove();
        });

        pElement.appendChild(deleteButton);

        //----- editButton

        const editButton = document.createElement('button');

        editButton.innerHTML = 'edit';
        editButton.style = "background-color: transparent; border: 2px solid transparent; color: #333";

        editButton.addEventListener('mouseover', function(){
            editButton.style.color = 'red';
        });

        editButton.addEventListener('mouseout', function(){
            editButton.style.color = '#333';
        });

        editButton.addEventListener('click', function(){
            editButton.style.color = '#333';
            const input  = document.createElement('input');
            input.value = pElement.textContent.substring(3, pElement.textContent.length - 10);
            input.style = "display: block; margin-right: auto; margin-left: auto;";
            input.style.width = (window.innerWidth / 2) + 'px';
            const buttons = pElement.querySelectorAll('button');
            pElement.replaceWith(input);

            input.addEventListener('keydown', function(event){
                if(event.key === 'Enter'){
                    const postData = {
                        value: input.value,
                        index: parseInt(pElement.id)
                    };
                    fetch('http://localhost:3000/editComment', {
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
                    pElement.textContent = (parseInt(pElement.id) + 1) + ". " + input.value;
                    pElement.appendChild(buttons[0]);
                    pElement.appendChild(buttons[1]);
                    input.replaceWith(pElement);
                }
            })
        })

        pElement.appendChild(editButton);
    }
})
.catch(error => {
    console.error('Error fetching the file:', error);
});

//----------
//----------

document.getElementById('addButton').addEventListener('click', function() {
    const text = document.getElementById('commentInput').value;

    document.getElementById('commentInput').value = "";
    const pElement = document.createElement('p');
    pElement.textContent = text;
    pElement.id = numberOfComments;
    pElement.textContent = (numberOfComments + 1) + ". " + pElement.textContent;
    numberOfComments++;

    pElement.className = "comment";
    pElement.style.maxWidth = (window.innerWidth / 2) + 'px';

    document.getElementsByClassName("paragraph-section2")[0].appendChild(pElement);
                
    comments.push(pElement);
    //----- deleteButton
    const deleteButton = document.createElement('button');

    deleteButton.innerHTML = 'delete';
    deleteButton.style = "background-color: transparent; border: 2px solid transparent; color: #333";

    deleteButton.addEventListener('mouseover', function(){
        deleteButton.style.color = 'red';
    });

    deleteButton.addEventListener('mouseout', function(){
        deleteButton.style.color = '#333';
    });

    deleteButton.addEventListener('click', function(){
        const postData = {
            value: parseInt(pElement.id),
        };
        fetch('http://localhost:3000/deleteComment', {
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
        for(let k = parseInt(pElement.id) + 1; k < comments.length; k++){
            const commentText = comments[k].textContent;
            const index = commentText.indexOf('.');
            comments[k].id--;
            const buttons = comments[k].querySelectorAll('button');
            comments[k].textContent = (parseInt(comments[k].id) + 1) + commentText.substring(index, commentText.length - 10);
            comments[k].appendChild(buttons[0]);
            comments[k].appendChild(buttons[1]);
        }
        comments.splice(parseInt(pElement.id), 1);
        document.getElementById(parseInt(pElement.id)).remove();
        deleteButton.remove();
        editButton.remove();
    });

    pElement.appendChild(deleteButton);

    //----- editButton

    const editButton = document.createElement('button');

    editButton.innerHTML = 'edit';
    editButton.style = "background-color: transparent; border: 2px solid transparent; color: #333";

    editButton.addEventListener('mouseover', function(){
        editButton.style.color = 'red';
    });

    editButton.addEventListener('mouseout', function(){
        editButton.style.color = '#333';
    });

    editButton.addEventListener('click', function(){
        editButton.style.color = '#333';
        const input  = document.createElement('input');
        input.value = pElement.textContent.substring(3, pElement.textContent.length - 10);
        input.style = "display: block; margin-right: auto; margin-left: auto;";
        input.style.width = (window.innerWidth / 2) + 'px';
        const buttons = pElement.querySelectorAll('button');
        pElement.replaceWith(input);

        input.addEventListener('keydown', function(event){
            if(event.key === 'Enter'){
                const postData = {
                    value: input.value,
                    index: parseInt(pElement.id)
                };
                fetch('http://localhost:3000/editComment', {
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
                pElement.textContent = (parseInt(pElement.id) + 1) + ". " + input.value;
                pElement.appendChild(buttons[0]);
                pElement.appendChild(buttons[1]);
                input.replaceWith(pElement);
            }
        })
    })
    pElement.appendChild(editButton);

    const postData = {
        value: text
    };

    fetch('http://localhost:3000/addComment', {
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
});
placeStars();

function placeStars(){
    //display stars!
    for(let i = 0; i < 75; i++){
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