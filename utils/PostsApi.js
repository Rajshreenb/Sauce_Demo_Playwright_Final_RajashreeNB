/** Thin wrapper around Playwright's APIRequestContext for the JSONPlaceholder /posts resource. */
class PostsApi {
  constructor(request) {
    this.request = request;
  }

  list(params) {
    return this.request.get('/posts', { params });
  }

  get(id) {
    return this.request.get(`/posts/${id}`);
  }

  create(payload) {
    return this.request.post('/posts', { data: payload });
  }

  update(id, payload) {
    return this.request.put(`/posts/${id}`, { data: payload });
  }

  patch(id, payload) {
    return this.request.patch(`/posts/${id}`, { data: payload });
  }

  remove(id) {
    return this.request.delete(`/posts/${id}`);
  }
}

module.exports = { PostsApi };
