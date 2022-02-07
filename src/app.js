// obtendo e armazenando a referência das div'
const postContainer = document.querySelector('#posts-container')
const loaderContainer = document.querySelector('.loader')
const filterInput = document.querySelector('#filter')

let page = 1

// função async (assíncrona) - retorna uma promise
const getPosts = async () => {
    // fetch -> fazer requisições AJAX - para o servidor sem recarregar a página. 
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)
    // await - enquanto a resposta da requisição não ser retornada o código abaixo não executará 

    // obter o valor da promise que o json resulta
    return response.json()
}

const addPostsIntoDOM = async () => {
    const posts = await getPosts()

    // obtendo um novo array de divs com os posts (map)
    const postsTemplate = posts.map((item) => `
    <div>
        <div class = 'post'>
            <div class = 'number'>${item.id}</div>
            <div class = 'post-info'>
            <h2 class = 'post-title'>${item.title}</h2>
            <p class = 'post-body'>${item.body}</p>
            </div>
        </div>
    </div>
    `).join('')
    // retornando uma nova string com todos os itens do array concatenados (join)

    // inserindo as divs na post-container
    postContainer.innerHTML += postsTemplate
}

addPostsIntoDOM()

const getNextPosts = () => {
    setTimeout(() => {
        page++ // obtendo a próxima página de post
        addPostsIntoDOM()
    }, 500) // chama addPostsIntoDOM após 500 ms
}

const removeLoader = () => {
    setTimeout(() => {
        loaderContainer.classList.remove('show')
        getNextPosts()
    }, 1000)
}

// exibindo o loader 
const showLoader = () => {
    loaderContainer.classList.add('show')
    removeLoader()
}

// implementando os requests dos próximos posts
window.addEventListener('scroll', () => {
    // função chamada ao 'scrollar' a página

    // destructuring do document
    const { clientHeight, scrollTop, scrollHeight } = document.documentElement

    // checando se o usuário alcancou o fim da página (faltando 10 pixels para a página acabar)
    const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight - 10

    if (isPageBottomAlmostReached) {
        showLoader()
    }
})

// função chamada ao adcionar um caracter no input
filterInput.addEventListener('input', event => {

    // obtendo os caracteres escritos no input
    const inputValue = event.target.value.toLowerCase()
    // console.log(event.target.value)

    // obtendo as referencias das divs dos posts
    const posts = document.querySelectorAll('.post')

    // percorrendo os posts
    posts.forEach(post => {

        // console.log(post)
        // obtendo o conteúdo dos posts
        const postTitle = post.querySelector('.post-title').textContent.toLowerCase()
        const postBody = post.querySelector('.post-body').textContent.toLowerCase()
        // console.log({ postTitle, postBody })

        // verificando se o input existe no conteúdo do posts     
        if (postTitle.includes(inputValue) || postBody.includes(inputValue)) {
            // console.log(`post ${index + 1}`, post)
            post.style.display = 'flex'
            return
        }

        // caso não exista 
        post.style.display = 'none'
    })
})


