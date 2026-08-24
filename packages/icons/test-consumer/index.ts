import accessibilityIcon from '@h0nio/icons/accessibility-duotone'
import { icons, AccessibilityDuotoneIcon } from '@h0nio/icons/all'
import { iconCatalog } from '@h0nio/icons/catalog'
import { iconToDataUri, renderIcon, type IconDefinition, type IconName } from '@h0nio/icons'
import type { IconMetadata } from '@h0nio/icons/types'
import accessibilitySvg from '@h0nio/icons/svg/accessibility-duotone'

const name: IconName = 'accessibility-duotone'
const definition: IconDefinition = accessibilityIcon
const metadata: IconMetadata = iconCatalog[name]

renderIcon(definition)
iconToDataUri(AccessibilityDuotoneIcon)
icons[name]
metadata.style
accessibilitySvg.toUpperCase()
