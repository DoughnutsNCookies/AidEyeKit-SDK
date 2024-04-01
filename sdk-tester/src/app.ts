import AidEyeSDK from "sdk";

const client = new AidEyeSDK({
  apiKey: "apiKey",
});

client.getPosts().then((post) => {
  console.log(post);
});

client.getPostById(1).then((post) => {
  console.log(post);
});

client
  .createPost({
    title: "New Post",
    body: "This is a new post to test createPost",
    userId: 1,
  })
  .then((post) => {
    console.log(`New Post is created with id: ${post.id}\nTitle: ${post.title}\nBody: ${post.body}\nUserId: ${post.userId}
		`);
  });
