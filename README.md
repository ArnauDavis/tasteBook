# Work in progress

check back for updates!

---

# Current tasks

--figure out how/where to import styles (it was in the header partial)

--style project(almost done)
  --clarification incoming(just didn't stop working so no clarification needed)

--find/make route for poster of post to be a link

--make images on feed and profile same size in 2 order columns
  -update, feed will be single column with each post in a card

--turn actual post user id into user name (actually wasn't too bad and I even realized I can get the actual poster user info too, how cool)

-secret task, I want to fix post into a component so I don't have to render it with a new dashboard, header, etc
  -I also want the feed to feature the ability to favorite and unfavorite posts

---

--things learned

-a ton of bootstrap

-how to create an array of user ids who have favorited a post in my mongodb schema
"favorites:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  }"

  -how to add and delete from the array of ids I created in my schema
  "await Post.findByIdAndUpdate(
        post,
        { '$push': { favorites: user } },
        { new: true }
      )
  await Post.findByIdAndUpdate(
        post,
        { '$pull': { favorites: user } },
        { new: true }
      )"

-how to do conditional class rendering in ejs
"<a class="nav-link <%= page=='/profile' ? 'active' : '' %>" href="/profile">
<h1 class="h2"><%= page=='/feed' ? 'Dashboard' : page=='/profile' ? user.userName+"'s Profile" : ''  %></h1>"


# TasteBook
Where every dish is a discovery. Join the food crave. TasteBook brings food creators and connoisseurs together to unite.

**Link to project:** https://tastebook-g3xq.onrender.com/

<div style="height: 200px; overflow: hidden;">
    <img src="" style="height: auto; width: 100%; object-fit: cover; transform: translateY(-30px);" alt="tastebook-gif"/>
</div>

**Tech used:** EJS, Bootstrap, MongoDB

## How It's Made:



Tastebook is built with a mvc architecture. There is a model folder that holds everything concerning the structuring of data like comments, posts, users, etc. There is a views folder that holds everything concerning any part of the UI that is visible to the users such as their profile, login pages, and anything else they see. Finally, we have what I would argue is the most important part, the controller folder. Here is where the logic that provides the user experience, functions that handle the process of making a post, commenting on a post, updating a profile, or deleting a post. There is a middleware folder, there is where the ability to check that a user is logged in, connect to cloudinary to post or delete photos, or even be able to upload images of many data types, comes from.

In the model folder I use mongoose to create my schemas, the user schema includes paths for a user name, email, hashed password, a bio, and a profile picture. The bio and profile picture have default values until the user customizes them. The posts schema includes a title, image, caption, post creator, likes, and a created at path. And lastly in the models folder, I have a schema for the comments which will have the comment itself, the amount of likes on the comment, the post that it is attached to, the user who made the comment, and of course, when it was created. The way I have my schemas defined makes it relatively easy to make the necessary connections to have the data conveniently organized. Everything gets a unique ID, with these IDs, every post can be linked to its creator, the same for comments, and on the topics of comments, comments can easily be tied to the post they were created under. 

In the views folder, I have a sub folder for partials, a footer and a header, every great website has a footer and a header, writing out a footer and header for every single page would be a headache so being able to just insert partials is really nice. In the user experience journey, the landing page gives users the option to log in or sign up. From there they are redirected to their profile. The profile ejs will display their username, as well as their bio, profile pic, and posts should they have posted anything. This is all retrieved from MongoDB thanks to the robust backend that can retrieve all of this data based on their unique ID. I wanted to limit the amount of posts users could create so I set a conditional that checks the length of the posts object in the database and if it is longer than 4, the form that lets users create a new post does not render and instead shows a span indicating to users that they cannot have more than 4 posts. Speaking of posts, the post ejs has a lot of interesting pieces that bring the whole experience together. Starting from the top, each post will render the username and profile picture of the post creator. There is a conditional that will check if the ID of the person visiting the post is the same ID of the person who made the post, if it is a match, clicking the user name or picture, will redirect to the profile of the visitor/post creator with full editing functionality, otherwise if it is not a match, the person visiting the post will redirect to the post creator’s profile picture as a visitor, as a visitor they will not have editing privileges. When visiting a profile of another user, visitors will be able to see their user name, profile picture, bio, and a section of all the posts of the user they are visiting. Moving forward, there is the post image itself, as well as a title for the post and a caption. Below the caption will be how long it has been since the post was created, a heart icon that can be clicked to like the post, a count of how many likes the post has and how many comments the post has. Below there is a form prompting the user to leave a comment. And then there are the actual comments themselves, each comment will have the profile picture and user name of the commentor, the profile picture and user name follow the same logic as the post creator image and user name where it checks the ID of the current user and the ID of the commentor creator to decide where to redirect if clicked. And addition to this logic is the deletion ability of each comment. Each comment can only be deleted by the ID of the person who created or the ID of the person who made the post. Similarly the post itself can only be deleted by the ID of the user who created it. Finally users have two buttons, one to return to their profile or go to the feed. The feed is a cumulation of all the posts sorted by their creation date. Each post in the feed will have the user name and profile picture of the creator, the image of the post, the title, caption, comment count, and likes count. On the topic of likes, there is a page for all the user’s likes, it renders similarly to the main feed except here, it is only posts that the user has liked. I mentioned earlier that having partials for the footer and header was convenient so that I did not have to code out the same parts over and over again, following this idea, I did the same for the profile, feed, and favorites. These all render inside of the mainDash.ejs where a conditional is listening for the route the user is visiting. The mainDash has a chained ternary (not popular to use I know, but I liked the aesthetic of it) to have the top of the page to indicate which page the user is on. I also have a hamburger menu that appears on mobile devices, when clicked, it opens up to show links to the main feed, user profile, and user likes, as well as a log out button, using similar logic as the section that determines which page to render, the page the user is currently on is highlighted in this menu. On larger screens, this menu is permanently on the left side of the page.


## Optimizations




## Lessons Learned:







