import addStrokeIcon from '@h0nio/icons/add-stroke'
import altArrowDownIcon from '@h0nio/icons/alt-arrow-down-stroke'
import altArrowLeftIcon from '@h0nio/icons/alt-arrow-left-stroke'
import altArrowRightIcon from '@h0nio/icons/alt-arrow-right-stroke'
import altArrowUpIcon from '@h0nio/icons/alt-arrow-up-stroke'
import bellStrokeIcon from '@h0nio/icons/bell-stroke'
import checkCircleIcon from '@h0nio/icons/check-circle-stroke'
import clockCircleIcon from '@h0nio/icons/clock-circle-stroke'
import closeStrokeIcon from '@h0nio/icons/close'
import dangerCircleIcon from '@h0nio/icons/danger-circle-stroke'
import dangerTriangleIcon from '@h0nio/icons/danger-triangle-stroke'
import infoCircleIcon from '@h0nio/icons/info-circle-stroke'
import letterIcon from '@h0nio/icons/letter-stroke'
import likeIcon from '@h0nio/icons/like-stroke'
import menuDotsIcon from '@h0nio/icons/menu-dots-stroke'
import minusStrokeIcon from '@h0nio/icons/minus-stroke'
import refreshIcon from '@h0nio/icons/refresh-stroke'
import searchDefinition from '@h0nio/icons/search'
import settingsStrokeIcon from '@h0nio/icons/settings-stroke'
import trashBinIcon from '@h0nio/icons/trash-bin-trash-stroke'
import userStrokeIcon from '@h0nio/icons/user-stroke'
import type { H0IconBodyDefinition } from '../components/Icon/Icon.types'

export type { H0IconBodyDefinition, H0IconDefinition, H0IconNode, H0IconSource } from '../components/Icon/Icon.types'

function compatibilityAlias(icon: H0IconBodyDefinition, name: string): H0IconBodyDefinition {
    return { ...icon, name }
}

export const arrowDownIcon = /* @__PURE__ */ compatibilityAlias(altArrowDownIcon, 'arrow-down')
export const arrowLeftIcon = /* @__PURE__ */ compatibilityAlias(altArrowLeftIcon, 'arrow-left')
export const arrowRightIcon = /* @__PURE__ */ compatibilityAlias(altArrowRightIcon, 'arrow-right')
export const arrowUpIcon = /* @__PURE__ */ compatibilityAlias(altArrowUpIcon, 'arrow-up')
export const bellIcon = /* @__PURE__ */ compatibilityAlias(bellStrokeIcon, 'bell')
export const checkIcon = /* @__PURE__ */ compatibilityAlias(checkCircleIcon, 'check')
export const closeIcon = /* @__PURE__ */ compatibilityAlias(closeStrokeIcon, 'close')
export const emailIcon = /* @__PURE__ */ compatibilityAlias(letterIcon, 'email')
export const errorIcon = /* @__PURE__ */ compatibilityAlias(dangerCircleIcon, 'error')
export const infoIcon = /* @__PURE__ */ compatibilityAlias(infoCircleIcon, 'info')
export const loadingIcon = /* @__PURE__ */ compatibilityAlias(refreshIcon, 'loading')
export const moreHorizontalIcon = /* @__PURE__ */ compatibilityAlias(menuDotsIcon, 'more-horizontal')
export const minusIcon = /* @__PURE__ */ compatibilityAlias(minusStrokeIcon, 'minus')
export const pendingIcon = /* @__PURE__ */ compatibilityAlias(clockCircleIcon, 'pending')
export const plusIcon = /* @__PURE__ */ compatibilityAlias(addStrokeIcon, 'plus')
export const searchIcon = /* @__PURE__ */ compatibilityAlias(searchDefinition, 'search')
export const settingsIcon = /* @__PURE__ */ compatibilityAlias(settingsStrokeIcon, 'settings')
export const successIcon = /* @__PURE__ */ compatibilityAlias(checkCircleIcon, 'success')
export const thumbUpIcon = /* @__PURE__ */ compatibilityAlias(likeIcon, 'thumb-up')
export const trashIcon = /* @__PURE__ */ compatibilityAlias(trashBinIcon, 'trash')
export const userIcon = /* @__PURE__ */ compatibilityAlias(userStrokeIcon, 'user')
export const warningIcon = /* @__PURE__ */ compatibilityAlias(dangerTriangleIcon, 'warning')
