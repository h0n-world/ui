<script setup lang="ts">
import { H0Accordion, type H0AccordionItem } from '@h0nio/ui'

const plans: H0AccordionItem[] = [
    { title: 'Starter plan', content: 'Starter plan features' },
    { title: 'Team plan', content: 'Team plan features' },
]
</script>

<template>
    <div class="accordion-example">
        <H0Accordion :items="plans" :default-open="[0]">
            <template #item="{ item, open }">
                <div class="plan-details">
                    <span>{{ open ? 'Included now' : 'Available when expanded' }}</span>
                    <ul>
                        <li>
                            {{
                                item.title === 'Starter plan'
                                    ? 'One workspace'
                                    : 'Unlimited workspaces'
                            }}
                        </li>
                        <li>
                            {{
                                item.title === 'Starter plan'
                                    ? 'Community support'
                                    : 'Priority support'
                            }}
                        </li>
                    </ul>
                </div>
            </template>
        </H0Accordion>
    </div>
</template>

<style scoped>
.accordion-example {
    max-width: 42rem;
    overflow: hidden;
    width: 100%;
}

.plan-details {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
}

.plan-details span {
    color: var(--h0n-ui-color-text);
    font-weight: var(--h0n-ui-font-weight-semibold);
}

.plan-details ul {
    margin: 0;
    padding-inline-start: var(--h0n-ui-spacing-lg);
}
</style>
