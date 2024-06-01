import { useQuery } from '@tanstack/vue-query'
import type { Post } from '@/types/post'
import { AppError } from '@/utils/appError'
import httpClient from '@/utils/httpClient'

async function fetchPost() {
  try {
    const resp = await httpClient.get <{ data: Post[] }>('/posts')
    return resp.data.data
  }
  catch (error) {
    throw new AppError(error)
  }
}

export function useGetPostsQuery() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPost,
  })
}
