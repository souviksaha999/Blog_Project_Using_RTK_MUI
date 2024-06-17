import { configureStore } from '@reduxjs/toolkit' 
import blogSlice from './AllBlogSlice'
import servicesSlice from './ServicesSlice'
import coursesSlice from './CoursesSlice'
import TeamSlice from './TeamSlice'
import testimonialSlice from './TestimonialsSlice'
import blogDetailsSlice from './BlogDetailsSlice'
import categoriesSlice from './CategoriesSlice'
import latestPostSlice from './LatestPostSlice'
import catgDetailsSlice from './CategoryDetailsSlice'
import showCommentsSlice from './ShowCommentsSlice'
import registerSlice from './RegSlice'
import loginSlice from './LoginSlice'
import contactUsSlice from './ContactSlice'
import bannerSlice from './BannerSlice'
import updatePasswordSlice from './UpdatePasswordSlice'
import LikeUnlikeSlice from './LikeUnlikeSlice'
import createCommentSlice from './CreateCommentSlice'
import authSlice from './AuthSlice'



export const Store = configureStore({
  reducer: {

    blogs : blogSlice,
    services : servicesSlice,
    courses : coursesSlice,
    teams : TeamSlice,
    testimonials : testimonialSlice,
    blogDetails : blogDetailsSlice,
    categories : categoriesSlice,
    latestPost : latestPostSlice,
    categoryPost : catgDetailsSlice,
    showComments : showCommentsSlice,
    register : registerSlice,
    login : loginSlice,
    contactUs : contactUsSlice,
    banner : bannerSlice,
    updatePassword : updatePasswordSlice,
    likeUnlike : LikeUnlikeSlice,
    createComment : createCommentSlice,
    auth : authSlice,
  },
})