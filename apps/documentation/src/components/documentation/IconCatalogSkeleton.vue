<script setup lang="ts">
import { H0Skeleton } from '@h0nio/ui'

defineOptions({
    name: 'IconCatalogSkeleton',
})

const cards = Array.from({ length: 8 }, (_, index) => index)
</script>

<template>
    <section class="icon-catalog-skeleton" role="status" aria-label="Loading icon catalog">
        <span class="visually-hidden">Loading icon catalog</span>

        <div class="catalog-heading-skeleton">
            <div class="catalog-heading-skeleton__copy">
                <H0Skeleton width="8.5rem" height="0.65rem" radius="var(--h0n-ui-radius-sm)" />
                <H0Skeleton width="9.5rem" height="2rem" />
            </div>
            <div class="catalog-heading-skeleton__count">
                <H0Skeleton width="4.25rem" height="1.8rem" />
                <H0Skeleton width="2.5rem" height="0.65rem" radius="var(--h0n-ui-radius-sm)" />
            </div>
        </div>

        <div class="catalog-toolbar-skeleton">
            <div v-for="index in 5" :key="index" class="catalog-toolbar-skeleton__control">
                <H0Skeleton
                    :width="index === 1 ? '4.75rem' : '3.5rem'"
                    height="0.6rem"
                    radius="var(--h0n-ui-radius-sm)"
                />
                <H0Skeleton
                    :width="index === 1 ? '78%' : '68%'"
                    height="1rem"
                    radius="var(--h0n-ui-radius-sm)"
                />
            </div>
        </div>

        <div class="icon-grid-skeleton" aria-hidden="true">
            <div v-for="card in cards" :key="card" class="icon-card-skeleton">
                <H0Skeleton variant="circle" width="2.25rem" height="2.25rem" />
                <div class="icon-card-skeleton__copy">
                    <H0Skeleton
                        :width="card % 3 === 0 ? '72%' : '84%'"
                        height="0.7rem"
                        radius="var(--h0n-ui-radius-sm)"
                    />
                    <H0Skeleton width="58%" height="0.55rem" radius="var(--h0n-ui-radius-sm)" />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.icon-catalog-skeleton {
    margin-top: 60px;
}

.visually-hidden {
    block-size: 1px;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    inline-size: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
}

.catalog-heading-skeleton {
    align-items: end;
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    &__copy {
        display: grid;
        gap: 10px;
    }

    &__count {
        align-items: end;
        display: flex;
        gap: 7px;
    }
}

.catalog-toolbar-skeleton {
    background: color-mix(in srgb, var(--h0n-ui-color-surface) 88%, transparent);
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-xl);
    display: grid;
    grid-template-columns:
        minmax(180px, 1fr) minmax(140px, 0.6fr) minmax(105px, 0.45fr)
        minmax(120px, 0.5fr) 120px;
    margin-bottom: 28px;
    overflow: hidden;

    &__control {
        align-content: center;
        display: grid;
        gap: 11px;
        min-height: 72px;
        min-width: 0;
        padding: 12px 14px;

        & + & {
            border-inline-start: 1px solid var(--h0n-ui-color-border);
        }
    }
}

.icon-grid-skeleton {
    border-inline-start: 1px solid var(--h0n-ui-color-border);
    border-top: 1px solid var(--h0n-ui-color-border);
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
}

.icon-card-skeleton {
    align-content: space-between;
    border-bottom: 1px solid var(--h0n-ui-color-border);
    border-inline-end: 1px solid var(--h0n-ui-color-border);
    display: grid;
    justify-items: center;
    min-height: 174px;
    padding: 34px 14px 16px;

    &__copy {
        display: grid;
        gap: 7px;
        justify-self: stretch;
    }
}

@media (max-width: 760px) {
    .catalog-toolbar-skeleton {
        grid-template-columns: 1fr 1fr;

        &__control:first-child {
            border-bottom: 1px solid var(--h0n-ui-color-border);
            grid-column: 1 / -1;
        }

        &__control:nth-child(2),
        &__control:nth-child(4) {
            border-inline-start: 0;
        }

        &__control:nth-child(n + 4) {
            border-top: 1px solid var(--h0n-ui-color-border);
        }
    }

    .icon-grid-skeleton {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (max-width: 520px) {
    .icon-grid-skeleton {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .icon-card-skeleton {
        min-height: 150px;
    }
}
</style>
