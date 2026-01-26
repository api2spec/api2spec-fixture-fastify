import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { buildApp } from './index'
import type { FastifyInstance } from 'fastify'

describe('Fastify API', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = buildApp()
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('Health endpoints', () => {
    it('GET /health returns ok status', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/health',
      })
      expect(response.statusCode).toBe(200)
      expect(response.json()).toEqual({ status: 'ok', version: '0.1.0' })
    })

    it('GET /health/ready returns ready status', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/health/ready',
      })
      expect(response.statusCode).toBe(200)
      expect(response.json()).toEqual({ status: 'ready', version: '0.1.0' })
    })
  })

  describe('Users endpoints', () => {
    it('GET /users returns array of users', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/users',
      })
      expect(response.statusCode).toBe(200)
      const users = response.json()
      expect(Array.isArray(users)).toBe(true)
      expect(users).toHaveLength(2)
      expect(users[0]).toHaveProperty('id')
      expect(users[0]).toHaveProperty('name')
      expect(users[0]).toHaveProperty('email')
    })

    it('GET /users/:id returns single user', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/users/1',
      })
      expect(response.statusCode).toBe(200)
      const user = response.json()
      expect(user).toHaveProperty('id', 1)
      expect(user).toHaveProperty('name')
      expect(user).toHaveProperty('email')
    })

    it('POST /users creates user and returns 201', async () => {
      const newUser = { name: 'Charlie', email: 'charlie@example.com' }
      const response = await app.inject({
        method: 'POST',
        url: '/users',
        payload: newUser,
      })
      expect(response.statusCode).toBe(201)
      const user = response.json()
      expect(user).toHaveProperty('id')
      expect(user.name).toBe('Charlie')
      expect(user.email).toBe('charlie@example.com')
    })

    it('PUT /users/:id updates user', async () => {
      const updatedUser = { name: 'Updated Name', email: 'updated@example.com' }
      const response = await app.inject({
        method: 'PUT',
        url: '/users/1',
        payload: updatedUser,
      })
      expect(response.statusCode).toBe(200)
      const user = response.json()
      expect(user).toHaveProperty('id', 1)
      expect(user.name).toBe('Updated Name')
      expect(user.email).toBe('updated@example.com')
    })

    it('DELETE /users/:id returns 204', async () => {
      const response = await app.inject({
        method: 'DELETE',
        url: '/users/1',
      })
      expect(response.statusCode).toBe(204)
    })

    it('GET /users/:userId/posts returns user posts', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/users/1/posts',
      })
      expect(response.statusCode).toBe(200)
      const posts = response.json()
      expect(Array.isArray(posts)).toBe(true)
      expect(posts[0]).toHaveProperty('userId', 1)
      expect(posts[0]).toHaveProperty('title')
      expect(posts[0]).toHaveProperty('body')
    })
  })

  describe('Posts endpoints', () => {
    it('GET /posts returns array of posts', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/posts',
      })
      expect(response.statusCode).toBe(200)
      const posts = response.json()
      expect(Array.isArray(posts)).toBe(true)
      expect(posts).toHaveLength(2)
      expect(posts[0]).toHaveProperty('id')
      expect(posts[0]).toHaveProperty('userId')
      expect(posts[0]).toHaveProperty('title')
      expect(posts[0]).toHaveProperty('body')
    })

    it('GET /posts/:id returns single post', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/posts/1',
      })
      expect(response.statusCode).toBe(200)
      const post = response.json()
      expect(post).toHaveProperty('id', 1)
      expect(post).toHaveProperty('userId')
      expect(post).toHaveProperty('title')
      expect(post).toHaveProperty('body')
    })

    it('POST /posts creates post and returns 201', async () => {
      const newPost = { userId: 1, title: 'New Post', body: 'Post content' }
      const response = await app.inject({
        method: 'POST',
        url: '/posts',
        payload: newPost,
      })
      expect(response.statusCode).toBe(201)
      const post = response.json()
      expect(post).toHaveProperty('id')
      expect(post.title).toBe('New Post')
      expect(post.body).toBe('Post content')
    })
  })
})
