(async()=>{
    const API = 'https://dog.ceo/api/breeds/image/random/4';
    await fetch(API).then(res=>res.json()).then(data=>{
        setPerros(data);
    });
})();

const setPerros = ({message}) => {
    const container = document.querySelector('.container');
    message.forEach(dog=>{
        const content = document.createElement('section');
        const img = document.createElement('img');
        img.src = dog;
        content.appendChild(img);
        container.appendChild(content);
    });
}