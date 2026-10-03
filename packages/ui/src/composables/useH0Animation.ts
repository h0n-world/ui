import { computed, onMounted } from 'vue'
import { useH0Theme } from '../theme'

/** The same app-scoped motion policy used by H0N UI, for application effects. */
export function useH0Animation() {
    const appearance = useH0Theme()
    const quality = appearance.resolvedAnimation
    onMounted(() => {
        if (appearance.animationRecommendationReason.value === 'pending' || appearance.animationRecommendationReason.value === 'reduced-motion') appearance.refreshAnimationRecommendation()
    })
    return {
        preference: appearance.animation,
        quality,
        recommendedQuality: appearance.recommendedAnimation,
        recommendationReason: appearance.animationRecommendationReason,
        isEvaluating: appearance.isEvaluatingAnimation,
        enabled: computed(() => quality.value !== 'off'),
        reducedMotion: computed(() => quality.value === 'off' || quality.value === 'low'),
        continuous: computed(() => quality.value === 'medium' || quality.value === 'high'),
        rich: computed(() => quality.value === 'high'),
        setPreference: appearance.setAnimation,
        refreshRecommendation: appearance.refreshAnimationRecommendation,
    }
}
