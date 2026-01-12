import Fastify from 'fastify'

const fastify = Fastify({ logger: true })

interface User {
  id: number
  name: string
  email: string
}

interface Post {
  id: number
  userId: number
  title: string
  body: string
}

// Health routes
fastify.get('/health', async () => ({ status: 'ok', version: '0.1.0' }))
fastify.get('/health/ready', async () => ({ status: 'ready', version: '0.1.0' }))

// User routes
fastify.get('/users', async () => [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
])

fastify.get<{ Params: { id: string } }>('/users/:id', async (request) => {
  const id = parseInt(request.params.id)
  return { id, name: 'Sample User', email: 'user@example.com' }
})

fastify.post<{ Body: User }>('/users', async (request, reply) => {
  reply.code(201)
  return { ...request.body, id: 1 }
})

fastify.put<{ Params: { id: string }; Body: User }>('/users/:id', async (request) => {
  const id = parseInt(request.params.id)
  return { ...request.body, id }
})

fastify.delete<{ Params: { id: string } }>('/users/:id', async (request, reply) => {
  reply.code(204)
  return null
})

fastify.get<{ Params: { userId: string } }>('/users/:userId/posts', async (request) => {
  const userId = parseInt(request.params.userId)
  return [{ id: 1, userId, title: 'User Post', body: 'Content' }]
})

// Post routes
fastify.get<{ Querystring: { limit?: string; offset?: string } }>('/posts', async () => [
  { id: 1, userId: 1, title: 'First Post', body: 'Hello world' },
  { id: 2, userId: 1, title: 'Second Post', body: 'Another post' },
])

fastify.get<{ Params: { id: string } }>('/posts/:id', async (request) => {
  const id = parseInt(request.params.id)
  return { id, userId: 1, title: 'Sample Post', body: 'Post body' }
})

fastify.post<{ Body: Post }>('/posts', async (request, reply) => {
  reply.code(201)
  return { ...request.body, id: 1 }
})

fastify.listen({ port: 8080, host: '0.0.0.0' })
