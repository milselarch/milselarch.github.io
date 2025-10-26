export const ALL_BLOG_POSTS_MESSAGE = "All Blog Posts"
export const BLOG = "blog"

export const GET_ALLOW_EDGY_BLOG_POSTS = () => {
  return [
    'localhost', 'milselarch.com'
  ].includes(window.location.hostname)
}
