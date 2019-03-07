import defaultAxios from 'axios'
import { useState, useEffect, useRef } from 'react'

function createUseRequest ({ axios, ...rest }) {
  const defaults = {
    method: 'get',
    url: '',
    lazy: false,
    onError: () => {},
    onSuccess: () => {},
    ...rest
  }

  return function useRequest (config = {}) {
    const {
      lazy,
      onError,
      onSuccess,
      ...options
    } = config

    const settings = {
      ...defaults,
      ...options
    }

    const ref = useRef({
      first: true,
      source: defaultAxios.CancelToken.source()
    })

    const [ data, setData ] = useState()
    const [ error, setError ] = useState()
    const [ loading, setLoading ] = useState(!lazy)
    const [ args, setArgs ] = useState(settings)

    const request = async args => {
      ref.current.first = false
      try {
        setLoading(true)
        const response = await axios({
          method: settings.method,
          url: settings.url,
          ...settings,
          ...args
        }, {
          cancelToken: ref.current.source.token
        })
        setData(response.data)
        setLoading(false)
        settings.onSuccess(response)
      } catch (e) {
        if (!defaultAxios.isCancel(e)) {
          setLoading(false)
          setError(e)
          settings.onError(e)
        }
      } finally {
      }
    }

    useEffect(() => {
      if (ref.current.first && lazy) {
        ref.current.first = false
        return
      }

      request(args)

      return () => {
        ref.current.source.cancel()
      }
    }, [
      settings.method,
      settings.url,
      settings.data,
      settings.params,
      args
    ])

    return {
      data,
      loading,
      error,
      request: args => setArgs({ ...settings, ...args })
    }
  }
}

export default createUseRequest
