const { test, expect } = require('../../fixtures');

test.describe('Posts API (JSONPlaceholder)', () => {
  test('GET /posts returns the full list', async ({ postsApi }) => {
    const response = await postsApi.list();
    expect(response.status()).toBe(200);

    const posts = await response.json();
    expect(posts).toHaveLength(100);
    expect(posts[0]).toEqual(
      expect.objectContaining({
        userId: expect.any(Number),
        id: expect.any(Number),
        title: expect.any(String),
        body: expect.any(String),
      }),
    );
  });

  test('GET /posts/1 returns a single post', async ({ postsApi }) => {
    const response = await postsApi.get(1);
    expect(response).toBeOK();
    expect(response.headers()['content-type']).toContain('application/json');

    const post = await response.json();
    expect(post).toMatchObject({ id: 1, userId: 1 });
  });

  test('GET /posts?userId=1 filters by user', async ({ postsApi }) => {
    const response = await postsApi.list({ userId: 1 });
    const posts = await response.json();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((p) => p.userId === 1)).toBe(true);
  });

  test('POST /posts creates a post', async ({ postsApi }) => {
    const payload = { title: 'QA post', body: 'created by Playwright', userId: 7 };
    const response = await postsApi.create(payload);
    expect(response.status()).toBe(201);
    expect(await response.json()).toMatchObject({ ...payload, id: expect.any(Number) });
  });

  test('PUT /posts/1 replaces a post', async ({ postsApi }) => {
    const payload = { id: 1, title: 'updated', body: 'updated body', userId: 1 };
    const response = await postsApi.update(1, payload);
    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject(payload);
  });

  test('PATCH /posts/1 updates part of a post', async ({ postsApi }) => {
    const response = await postsApi.patch(1, { title: 'patched title' });
    expect(response.status()).toBe(200);
    expect((await response.json()).title).toBe('patched title');
  });

  test('DELETE /posts/1 removes a post', async ({ postsApi }) => {
    const response = await postsApi.remove(1);
    expect(response.status()).toBe(200);
  });

  test('GET /posts/9999 returns 404', async ({ postsApi }) => {
    const response = await postsApi.get(9999);
    expect(response.status()).toBe(404);
  });
});
