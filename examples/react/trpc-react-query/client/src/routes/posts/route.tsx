import { FileRoute } from '@tanstack/react-router'
import { apiUtils } from '../../utils/trpc'

export const Route = new FileRoute('/posts').createRoute({
  loader: async () => {
    // We will ensure the data using the apiUtils and
    // return it to the loader if it exists in cache, to be used as initialData
    const postsData = await apiUtils.posts.ensureData()
    return {
      postsData,
    }
  },
})
