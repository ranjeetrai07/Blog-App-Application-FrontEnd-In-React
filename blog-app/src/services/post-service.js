import { myAxios, privateAxious } from "./helper";

export const createPost = (postData) => {
    return privateAxious
        .post(
            `api/post/user/${postData.userId}/category/${postData.categoryId}/posts`,
            postData
        )
        .then((response) => response.data);
};

//get all post
export const loadAllPosts2 = (pageNaumber, pageSize) => {
    return myAxios
        .get(
            `api/post/posts?pageNumbere=${pageNaumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`
        )
        .then((response) => response.data);
};

export const loadAllPosts = () => {
    return myAxios
        .get(
            `api/post/allPostList`
        )
        .then((response) => response.data);
};