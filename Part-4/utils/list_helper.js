const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.length === 0
    ? 0
    : blogs.length === 1 
    ? blogs[0].likes
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    let maxLikes = 0
    blogs.map((blog) => maxLikes = Math.max(maxLikes, blog.likes))
    const maxLikedObj = blogs.filter((blog) => blog.likes === maxLikes)
    
    console.log(maxLikedObj[0])
    return blogs.length === 0 
    ? null
    : blogs.length === 1
    ? {
        title: blogs[0].title,
        author: blogs[0].author,
        likes: blogs[0].likes
    }
    : {
        title: maxLikedObj[0].title,
        author: maxLikedObj[0].author,
        likes: maxLikedObj[0].likes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
