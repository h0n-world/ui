import searchIcon from '@h0nio/icons/search'
import {
    type H0ButtonProps,
    type H0CommandItem,
    type H0EmptyStateProps,
    type H0IconSource,
    type H0InputProps,
    type H0SegmentItem,
    type H0SelectOption,
    type H0StepperItem,
    type H0ToastInput,
    type H0ToastProps
} from '@h0nio/ui'
import { warningIcon } from '@h0nio/ui/icons'

const source: H0IconSource = searchIcon
const button: H0ButtonProps = { icon: searchIcon }
const input: H0InputProps = { prefixIcon: searchIcon, suffixIcon: warningIcon }
const selectOption: H0SelectOption = { label: 'Search', value: 'search', icon: searchIcon }
const segmentItem: H0SegmentItem = { label: 'Search', value: 'search', icon: searchIcon }
const stepperItem: H0StepperItem = { label: 'Search', icon: searchIcon }
const commandItem: H0CommandItem = { label: 'Search', value: 'search', icon: searchIcon }
const toast: H0ToastInput = { icon: searchIcon, duration: 3000 }
const toastProps: H0ToastProps = { icon: searchIcon }
const emptyState: H0EmptyStateProps = { icon: searchIcon }

void [source, button, input, selectOption, segmentItem, stepperItem, commandItem, toast, toastProps, emptyState]
