# react-use-request

**Experimental** React hook for making HTTP Requests with axios.

```js
import React from 'react'
import useRequest from 'react-use-request'

function App () {
  const { loading, data, error } = useRequest({
    method: 'get',
    url: '/api/posts'
  })

  if (loading) return <Spinner />

  if (error) return <Error error={error} />

  return (
    <ul>
      {data.map(post => (
        <li key={post.id}>
          {post.title}
        </li>
      ))}
    </ul>
  )
} 
```

## features

- Support the same options as axios does
- Request cancellation out-of-box (no request duplication, no worry about unmounts)

## installation

You need to install axios too:

`yarn add react-use-request axios`

`npm install react-use-request axios --save`

## usage

It supports all options as axios does. But it supports three additional options:

### `lazy: Boolean`

```js
const { request } = useRequest({
  method: 'POST',
  url: '...',
  lazy: true
})

request()
```

### `onSuccess: function (response) `

### `onErrror: function (err) `

## factory

You may want to use a custom instance of axios. To do so, just use the factory function:

```js
import axios from 'axios'
import { createUseRequest } from 'react-use-request'

const customAxios = axios.create({
  baseURL: 'https://example.com/api',
  headers: { Authorization: `Bearer ${token}` }
})

const useRequest = createUserRequest({
  axios: customAxios
})
```

Then, just use `useRequest` as a normal hook.

## license

MIT
