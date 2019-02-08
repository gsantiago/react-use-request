import React from 'react'
import useRequest from '../../src'

export default function PostExample () {
  const { request, loading, data } = useRequest({
    lazy: true,
    method: 'POST',
    url: 'https://jsonplaceholder.typicode.com/posts'
  })

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        request({
          data: {
            title: e.target.title.value,
            content: e.target.content.value
          }
        })
      }}>
        <p>
          <input name='title' placeholder='Title' type='text' />
        </p>
        <p>
          <input name='content' placeholder='Content' type='text' />
        </p>
        <button type='submit' disabled={loading}>
          Create
        </button>
      </form>
    </div>
  )
}
