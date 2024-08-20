const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

describe('list helper functions', () => {
  test('dummy returns one', () => {
    const blogs = [];
    assert.strictEqual(listHelper.dummy(blogs), 1);
  });

  const listWithMultipleBlogs = [
    {
      _id: '5a422b3a1b54a676234d17f10',
      title: 'The Art of War',
      author: 'Sun Tzu',
      url: 'https://example.com',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f11',
      title: 'The Art of Peace',
      author: 'Sun Tzu',
      url: 'https://example.com/peace',
      likes: 8,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f12',
      title: 'The Art of Harmony',
      author: 'Laozi',
      url: 'https://example.com/harmony',
      likes: 15,
      __v: 0
    }
  ];

  test('totalLikes returns the total likes of all blogs', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    const expected = 33; // 10 + 8 + 15
    assert.strictEqual(result, expected);
  });

  test('favoriteBlog returns the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs);
    const expected = {
      _id: '5a422b3a1b54a676234d17f12',
      title: 'The Art of Harmony',
      author: 'Laozi',
      url: 'https://example.com/harmony',
      likes: 15,
      __v: 0
    };
    assert.deepStrictEqual(result, expected);
  });

  test('mostBlogs returns the author with the most blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs);
    const expected = {
      author: 'Sun Tzu',
      blogs: 2
    };
    assert.deepStrictEqual(result, expected);
  });

  test('mostLikes returns the author with the most likes', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs);
    const expected = {
      author: 'Sun Tzu',
      likes: 18 // 10 + 8
    };
    assert.deepStrictEqual(result, expected);
  });
});
