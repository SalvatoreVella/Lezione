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
}

const appliedDataPage = () => {
    state.pageInfo.totalItems = state._data.length;
    state.pageInfo.totalPages = Math.floor(state._data.length / state.pageInfo.limit);
    state.pageInfo.hasPrevPage = state.pageInfo.currentPage > 1;
    state.pageInfo.hasNextPage = state.pageInfo.currentPage < state.pageInfo.totalPages;

    const startIndex = state.pageInfo.limit * (state.pageInfo.currentPage - 1);

    state.data = [...state._data].splice(startIndex, state.pageInfo.limit);
}

const appliedDataSort = () =>{
    switch (state.orderBy){
        case "A-Z":
          state.data.sort((a, b) => a.title < b.title ? -1 : 0 )
          break;
        case "Z-A":
            state.data.sort((a, b) => a.title > b.title ? 1 : 0)
            break;
        case "ID-ASC":
            state.data.sort((a, b) => a.id - b.id)
            break;
        case "ID-DESC":
            state.data.sort((a, b) => b.id - a.id)
            break
        default:
            state.data.sort((a, b) => a.title < b.title ? -1 : 0 )
            break;
    }
}

const appliedModifiers = () =>{
    appliedDataPage();
    appliedDataSort();
}

const fetchData = async () => {
    await fetchPosts();
    await fetchUsers();
    formatData();   
}



const init = async () => {
    await fetchData();
    appliedModifiers();
    console.log(state);
}

init();