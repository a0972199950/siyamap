import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import api from '@/lib/api-client'
import { TInsertVenueDto, TUpdateVenueDto, TVenueDto } from '@/types/dto'
import logger from '@/utils/logger'

const useVenue = (initialVenues: TVenueDto[]) => {
  const queryClient = useQueryClient()

  const { data: venues, isLoading } = useQuery({
    queryKey: ['venues'],
    queryFn: async () => {
      try {
        const { data } = await api.getVenues()
        return data
      } catch (err) {
        logger.error('Failed to fetch venues:', err)
        return []
      }
    },
    initialData: initialVenues,
  })

  const createVenueMutation = useMutation({
    mutationFn: async (dto: TInsertVenueDto) => {
      const { data } = await api.createVenue(dto)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['venues'] })
    },
    onError: err => {
      logger.error('Error creating venue:', err)
    },
  })

  const updateVenueMutation = useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: TUpdateVenueDto }) => {
      const { data } = await api.updateVenue(id, dto)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['venues'] })
    },
    onError: err => {
      logger.error('Error updating venue:', err)
    },
  })

  const deleteVenueMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.deleteVenue(id)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['venues'] })
    },
    onError: err => {
      logger.error('Error deleting venue:', err)
    },
  })

  return {
    venues,
    isLoading,
    createVenueMutation,
    updateVenueMutation,
    deleteVenueMutation,
  }
}

export default useVenue
