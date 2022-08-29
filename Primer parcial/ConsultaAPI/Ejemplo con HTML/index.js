const url = 'https://dog.ceo/api/breeds/image/random';

const fetching = async () => {
    const res = await fetch(url);
    const data = await res.json();
    const { message: source } = data;
    document.getElementById('imagen').src = source;
}

window.onload = () => {
    document.getElementById('obtener').addEventListener('click', fetching);
    document.getElementById('obtener').click();
}
