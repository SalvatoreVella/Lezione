const API_POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const API_USERS_URL = "https://jsonplaceholder.typicode.com/users";

let state = {
    posts:[],
    users:[],
    data:[],
    _data:[],
    pageInfo:{
        currentPage: 1,
        limit: 10,
        totalItems: 0,
        totalPages: 1,
        hasPrevPage: false,
        hasNextPage: false,
    },
    orderBy: "A-Z",
}

const fetchPosts = async () => {
    try {
        const results = await fetch(API_POSTS_URL);
        const posts = await results.json();
        state.posts = posts;
    } catch (err) {
    console.log(err);
    }
}

const fetchUsers = async() => {
    try {
        const results = await fetch(API_USERS_URL);
        const users = await results.json();
        state.users = users;
    } catch (err) {
        console.log(err);
        }
}

const formatData = () => {
    const data = state.posts.map((post) => {
        const user = state.users.find((user) => user.id == post.userId);
        return {
            ...post,
            author: user.name,
        }
    
    })
    state.data = data;
    state._data = data;
    state.pageInfo.totalItems = data.length;
    state.pageInfo.totalPages = Math.floor(data.length / state.pageInfo.limit);
    state.pageInfo.hasPrevPage = state.pageInfo.currentPage > 1;
    state.pageInfo.hasNextPage = state.pageInfo.currentPage < state.pageInfo.totalPages;
}


const fetchData = async () => {
    await fetchPosts();
    await fetchUsers();
    formatData();
    console.log(state);
}



const init = async () => {
    await fetchData();
}

init();