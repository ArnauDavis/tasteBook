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

