'use client'

import Link from 'next/link'
import React from 'react'

import dayjs from '@/lib/dayjs'
import { TInsertVenueDto, TUpdateVenueDto, TVenueDto } from '@/types/dto'

import useVenue from '../hooks/use-venue'

interface Props {
  initialVenues: TVenueDto[]
}

const AREA_OPTIONS: { value: NonNullable<TVenueDto['area']>; label: string }[] =
  [
    { value: 'NORTHERN', label: '北部' },
    { value: 'CENTRAL', label: '中部' },
    { value: 'SOUTHERN', label: '南部' },
    { value: 'EASTERN', label: '東部' },
    { value: 'ISLANDS', label: '離島' },
  ]

type FormState = {
  name: string
  area: '' | NonNullable<TVenueDto['area']>
  address: string
  restrictedView: string
  seatCount: string
  lockerCount: string
  trafficGuide: string
}

const EMPTY_FORM: FormState = {
  name: '',
  area: '',
  address: '',
  restrictedView: '',
  seatCount: '',
  lockerCount: '',
  trafficGuide: '',
}

const venueToForm = (venue: TVenueDto): FormState => ({
  name: venue.name,
  area: venue.area ?? '',
  address: venue.address ?? '',
  restrictedView: venue.restrictedView ?? '',
  seatCount: venue.seatCount?.toString() ?? '',
  lockerCount: venue.lockerCount?.toString() ?? '',
  trafficGuide: venue.trafficGuide ?? '',
})

const parseIntOrNull = (value: string): number | null => {
  if (!value.trim()) return null
  const n = Number.parseInt(value, 10)
  return Number.isNaN(n) ? null : n
}

const formToInsertDto = (form: FormState): TInsertVenueDto => ({
  name: form.name.trim(),
  area: form.area === '' ? null : form.area,
  address: form.address.trim() || null,
  restrictedView: form.restrictedView.trim() || null,
  seatCount: parseIntOrNull(form.seatCount),
  lockerCount: parseIntOrNull(form.lockerCount),
  trafficGuide: form.trafficGuide.trim() || null,
})

const formToUpdateDto = (form: FormState): TUpdateVenueDto =>
  formToInsertDto(form)

const PageVenueClient = (props: Props): React.ReactElement => {
  const [form, setForm] = React.useState<FormState>(EMPTY_FORM)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [editingForm, setEditingForm] = React.useState<FormState>(EMPTY_FORM)

  const {
    venues,
    isLoading,
    createVenueMutation,
    updateVenueMutation,
    deleteVenueMutation,
  } = useVenue(props.initialVenues)

  React.useEffect(() => {
    if (createVenueMutation.isSuccess) {
      setForm(EMPTY_FORM)
    }
  }, [createVenueMutation.isSuccess])

  React.useEffect(() => {
    if (updateVenueMutation.isSuccess) {
      setEditingId(null)
      setEditingForm(EMPTY_FORM)
    }
  }, [updateVenueMutation.isSuccess])

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createVenueMutation.mutate(formToInsertDto(form))
  }

  const handleUpdate = (id: string) => {
    updateVenueMutation.mutate({ id, dto: formToUpdateDto(editingForm) })
  }

  const handleDelete = (id: string) => {
    if (window.confirm('確定要刪除此場館嗎？')) {
      deleteVenueMutation.mutate(id)
    }
  }

  const startEditing = (venue: TVenueDto) => {
    setEditingId(venue.id)
    setEditingForm(venueToForm(venue))
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditingForm(EMPTY_FORM)
  }

  const renderFormFields = (
    state: FormState,
    onChange: (next: FormState) => void,
    idPrefix: string
  ) => (
    <div className="space-y-4">
      <div>
        <label
          htmlFor={`${idPrefix}-name`}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          場館名稱 <span className="text-red-500">*</span>
        </label>
        <input
          id={`${idPrefix}-name`}
          type="text"
          placeholder="輸入場館名稱"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black transition-all focus:border-transparent focus:ring-2 focus:ring-orange-500"
          value={state.name}
          onChange={e => onChange({ ...state, name: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${idPrefix}-area`}
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            地區
          </label>
          <select
            id={`${idPrefix}-area`}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black transition-all focus:border-transparent focus:ring-2 focus:ring-orange-500"
            value={state.area}
            onChange={e =>
              onChange({
                ...state,
                area: e.target.value as FormState['area'],
              })
            }
          >
            <option value="">未指定</option>
            {AREA_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-address`}
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            地址
          </label>
          <input
            id={`${idPrefix}-address`}
            type="text"
            placeholder="例：台北市信義區忠孝東路五段 999 號"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black transition-all focus:border-transparent focus:ring-2 focus:ring-orange-500"
            value={state.address}
            onChange={e => onChange({ ...state, address: e.target.value })}
          />
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-seatCount`}
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            座位數
          </label>
          <input
            id={`${idPrefix}-seatCount`}
            type="number"
            min={0}
            placeholder="例：10000"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black transition-all focus:border-transparent focus:ring-2 focus:ring-orange-500"
            value={state.seatCount}
            onChange={e => onChange({ ...state, seatCount: e.target.value })}
          />
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-lockerCount`}
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            置物櫃數量
          </label>
          <input
            id={`${idPrefix}-lockerCount`}
            type="number"
            min={0}
            placeholder="例：500"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black transition-all focus:border-transparent focus:ring-2 focus:ring-orange-500"
            value={state.lockerCount}
            onChange={e => onChange({ ...state, lockerCount: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={`${idPrefix}-restrictedView`}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          視線受限說明
        </label>
        <textarea
          id={`${idPrefix}-restrictedView`}
          rows={2}
          placeholder="說明哪些座位視線可能受限"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black transition-all focus:border-transparent focus:ring-2 focus:ring-orange-500"
          value={state.restrictedView}
          onChange={e =>
            onChange({ ...state, restrictedView: e.target.value })
          }
        />
      </div>

      <div>
        <label
          htmlFor={`${idPrefix}-trafficGuide`}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          交通指南
        </label>
        <textarea
          id={`${idPrefix}-trafficGuide`}
          rows={2}
          placeholder="例：捷運市政府站 2 號出口步行 5 分鐘"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black transition-all focus:border-transparent focus:ring-2 focus:ring-orange-500"
          value={state.trafficGuide}
          onChange={e => onChange({ ...state, trafficGuide: e.target.value })}
        />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-6">
      {/* 回首頁按鈕 */}
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 rounded-lg bg-white/70 px-4 py-2 text-sm font-medium text-orange-700 shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>回首頁</span>
        </Link>
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-800">場館管理</h1>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-amber-600"></div>
          <p className="mt-3 text-sm text-gray-500">
            注意：場館狀態 (status) 由另一支 API 管理，不在此頁編輯
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* 新增場館表單 */}
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h2 className="mb-6 flex items-center text-2xl font-semibold text-gray-800">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                <svg
                  className="h-4 w-4 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              新增場館
            </h2>

            <form className="space-y-6" onSubmit={handleCreate}>
              {renderFormFields(form, setForm, 'create')}

              <button
                type="submit"
                disabled={createVenueMutation.isPending || !form.name.trim()}
                className="w-full transform rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:from-orange-600 hover:to-amber-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {createVenueMutation.isPending ? '新增中...' : '新增場館'}
              </button>
            </form>

            {createVenueMutation.isError && (
              <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                新增失敗，請再試一次
              </div>
            )}
          </div>

          {/* 場館列表 */}
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h2 className="mb-6 flex items-center text-2xl font-semibold text-gray-800">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <svg
                  className="h-4 w-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              場館列表
              <span className="ml-auto rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
                {venues.length} 個場館
              </span>
            </h2>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500"></div>
              </div>
            ) : venues.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mb-3 text-4xl">🏟️</div>
                <p className="text-gray-500">目前沒有場館</p>
                <p className="text-sm text-gray-400">新增第一個場館吧！</p>
              </div>
            ) : (
              <div className="space-y-3">
                {venues.map(venue => (
                  <div
                    key={venue.id}
                    className="rounded-xl border border-gray-100 p-4 transition-all duration-200 hover:border-orange-200 hover:shadow-md"
                  >
                    {editingId === venue.id ? (
                      <div className="space-y-3">
                        {renderFormFields(
                          editingForm,
                          setEditingForm,
                          `edit-${venue.id}`
                        )}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdate(venue.id)}
                            disabled={
                              updateVenueMutation.isPending ||
                              !editingForm.name.trim()
                            }
                            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 disabled:opacity-50"
                          >
                            {updateVenueMutation.isPending
                              ? '儲存中...'
                              : '儲存'}
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
                          >
                            取消
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-gray-800">
                              {venue.name}
                            </h3>
                            {venue.status && (
                              <span
                                className={`rounded-full px-2 py-0.5 text-xs ${
                                  venue.status === 'PUBLISHED'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {venue.status === 'PUBLISHED'
                                  ? '已發佈'
                                  : '草稿'}
                              </span>
                            )}
                            {venue.area && (
                              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-700">
                                {AREA_OPTIONS.find(o => o.value === venue.area)
                                  ?.label ?? venue.area}
                              </span>
                            )}
                          </div>
                          {venue.address && (
                            <p className="text-sm text-gray-600">
                              📍 {venue.address}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-x-4 text-xs text-gray-500">
                            {venue.seatCount != null && (
                              <span>座位數 {venue.seatCount}</span>
                            )}
                            {venue.lockerCount != null && (
                              <span>置物櫃 {venue.lockerCount}</span>
                            )}
                          </div>
                          {venue.restrictedView && (
                            <p className="text-xs text-gray-500">
                              視線受限：{venue.restrictedView}
                            </p>
                          )}
                          {venue.trafficGuide && (
                            <p className="text-xs text-gray-500">
                              交通：{venue.trafficGuide}
                            </p>
                          )}
                          <p className="text-xs text-gray-400">
                            建立於{' '}
                            {dayjs(venue.createdAt).format(
                              'YYYY/MM/DD HH:mm:ss'
                            )}
                          </p>
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <button
                            onClick={() => startEditing(venue)}
                            className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
                          >
                            編輯
                          </button>
                          <button
                            onClick={() => handleDelete(venue.id)}
                            disabled={deleteVenueMutation.isPending}
                            className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50"
                          >
                            刪除
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageVenueClient
