import React from 'react'
import useRequest from '../../src'

export default function SimpleRequest () {
  const { loading, data, request } = useRequest({
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/posts'
  })

  if (loading) {
    return (
      <div>
        <button type='button' onClick={() => request()}>reload</button>
        <p>Loading</p>
      </div>
    )
  }

  if (data && data.length) {
    return (
      <div>
        <button type='button' onClick={() => request()}>reload</button>
        <ul>
          {data.map(post => (
            <li key={post.id}>
              {post.title}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return 'No result'
}
