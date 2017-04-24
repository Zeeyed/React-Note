var axios = require('axios');

function getRepos(username){
    return axios.get('https://api.github.com/users/' + username + '/repos');
}

function getUserInfo(username){
    return axios.get('https://api.github.com/users/' + username);
}

var helpers = {
    getGithubInfo : function(username){
        // all : gets an array of promises 
        // axios will wait for both of these promises to be resolved and then it will pass an arr of data
        return axios.all([getRepos(username), getUserInfo(username)])
        .then(function(arr){
            return {
                repos : arr[0].data,
                bio: arr[1].data
            }
        });
    }
};

module.exports = helpers;