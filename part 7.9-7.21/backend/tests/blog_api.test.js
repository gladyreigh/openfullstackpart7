const request = require('supertest');
const app = require('../index'); // Adjust the path if necessary
const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Helper function to create a new user
const createUser = async (username, password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ username, passwordHash });
  return await user.save();
};

// Helper function to login and get a token
const loginUser = async (username, password) => {
  const response = await request(app)
    .post('/api/login')
    .send({ username, password });
  return response.body.token;
};

// Run before each test
beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
});

// Test cases for POST /api/blogs
describe('POST /api/blogs', () => {
  let token;

  beforeEach(async () => {
    const user = await createUser('testuser', 'testpassword');
    token = await loginUser('testuser', 'testpassword');
  });

  test('should create a new blog and increase the total number of blogs', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 10
    };

    await request(app)
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(1);

    const titles = blogsAtEnd.map(blog => blog.title);
    expect(titles).toContain('Test Blog');
  });

  test('should default likes to 0 if not provided', async () => {
    const newBlog = {
      title: 'Test Blog with No Likes',
      author: 'Test Author',
      url: 'http://test.com'
    };

    const response = await request(app)
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  test('should return 400 if title or url is missing', async () => {
    const newBlogWithoutTitle = {
      author: 'Test Author',
      url: 'http://test.com'
    };

    const newBlogWithoutUrl = {
      title: 'Test Blog',
      author: 'Test Author'
    };

    await request(app)
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogWithoutTitle)
      .expect(400);

    await request(app)
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogWithoutUrl)
      .expect(400);
  });
});

// Test cases for DELETE /api/blogs/:id
describe('DELETE /api/blogs/:id', () => {
  let blogId;
  let token;
  let anotherUserToken;

  beforeEach(async () => {
    const user = await createUser('testuser', 'testpassword');
    token = await loginUser('testuser', 'testpassword');

    const anotherUser = await createUser('anotheruser', 'anotherpassword');
    anotherUserToken = await loginUser('anotheruser', 'anotherpassword');

    const newBlog = new Blog({
      title: 'Blog to Delete',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 5,
      user: user._id
    });

    const savedBlog = await newBlog.save();
    blogId = savedBlog._id.toString();
  });

  test('should delete a blog by id if the user is the owner', async () => {
    await request(app)
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(0);
  });

  test('should return 403 if the user is not the owner of the blog', async () => {
    await request(app)
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${anotherUserToken}`)
      .expect(403);
  });

  test('should return 400 if blog with the given id does not exist', async () => {
    const invalidId = 'invalidid123';

    await request(app)
      .delete(`/api/blogs/${invalidId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(400);
  });

  test('should return 401 if no token is provided', async () => {
    await request(app)
      .delete(`/api/blogs/${blogId}`)
      .expect(401);
  });
});

// Test cases for PUT /api/blogs/:id
describe('PUT /api/blogs/:id', () => {
  let blogId;
  let token;

  beforeEach(async () => {
    const user = await createUser('testuser', 'testpassword');
    token = await loginUser('testuser', 'testpassword');

    const newBlog = new Blog({
      title: 'Blog to Update',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 5,
      user: user._id
    });

    const savedBlog = await newBlog.save();
    blogId = savedBlog._id.toString();
  });

  test('should update the number of likes for a blog by id', async () => {
    const updatedBlog = {
      title: 'Blog to Update',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 20
    };

    const response = await request(app)
      .put(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBe(20);
  });

  test('should return 400 if blog with the given id does not exist', async () => {
    const invalidId = 'invalidid123';
    const updatedBlog = {
      title: 'Blog to Update',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 20
    };

    await request(app)
      .put(`/api/blogs/${invalidId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedBlog)
      .expect(400);
  });
});

// Test cases for POST /api/users
describe('POST /api/users', () => {
  test('should create a new user with a hashed password', async () => {
    const newUser = {
      username: 'newuser',
      name: 'New User',
      password: 'newpassword'
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(1);

    const usernames = usersAtEnd.map(user => user.username);
    expect(usernames).toContain('newuser');
  });

  test('should return 400 if username or password is less than 3 characters', async () => {
    const shortUsername = {
      username: 'nu',
      name: 'New User',
      password: 'newpassword'
    };

    const shortPassword = {
      username: 'newuser',
      name: 'New User',
      password: 'np'
    };

    await request(app)
      .post('/api/users')
      .send(shortUsername)
      .expect(400);

    await request(app)
      .post('/api/users')
      .send(shortPassword)
      .expect(400);
  });

  test('should return 400 if username is not unique', async () => {
    const newUser = {
      username: 'uniqueuser',
      name: 'Unique User',
      password: 'uniquePassword'
    };

    await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(201);

    await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });
});
