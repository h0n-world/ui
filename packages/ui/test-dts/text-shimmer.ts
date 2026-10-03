import { H0TextShimmer, type H0TextShimmerElement, type H0TextShimmerProps } from '../src'
import { H0TextShimmer as SubpathShimmer } from '../src/components/TextShimmer'
const tag: H0TextShimmerElement = 'span'
const props: H0TextShimmerProps = { as: tag, duration: 2500, active: false }
// @ts-expect-error Text Shimmer does not manufacture interactive controls.
const invalid: H0TextShimmerProps = { as: 'button' }
void [H0TextShimmer, SubpathShimmer, props, invalid]
