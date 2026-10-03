import { useH0Animation, type H0AnimationLevel, type H0AnimationQuality, type H0AnimationRecommendationReason } from '../src'
import { useH0Animation as useSubpath } from '../src/composables/useH0Animation'

const preference: H0AnimationLevel = 'recommended'
const motion = useH0Animation()
const quality: H0AnimationQuality = motion.quality.value
const reason: H0AnimationRecommendationReason = motion.recommendationReason.value
motion.setPreference(preference)
motion.refreshRecommendation()
useSubpath()
// @ts-expect-error Recommended is a preference, not a concrete quality.
const invalid: H0AnimationQuality = 'recommended'
// @ts-expect-error Effective quality is readonly.
motion.quality.value = 'high'
void [quality, reason, invalid]
