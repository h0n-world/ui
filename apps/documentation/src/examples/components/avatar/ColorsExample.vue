<script setup lang="ts">
import { H0Avatar, type H0AvatarColor } from '@h0nio/ui'

const avatars: Array<{ color: H0AvatarColor; name: string }> = [
    { color: 'blue', name: 'Alex Morgan' },
    { color: 'red', name: 'Riley Chen' },
    { color: 'green', name: 'Jordan Lee' },
    { color: 'purple', name: 'Morgan Diaz' },
    { color: 'pink', name: 'Taylor Kim' },
    { color: 'cyan', name: 'Casey Patel' },
    { color: 'orange', name: 'Sam Rivera' },
]
</script>

<template>
    <div class="avatar-colors">
        <figure v-for="avatar in avatars" :key="avatar.color">
            <H0Avatar :name="avatar.name" :color="avatar.color" :size="56" />
            <figcaption>{{ avatar.color }}</figcaption>
        </figure>
    </div>
</template>

<style scoped>
.avatar-colors {
    display: flex;
    flex-wrap: wrap;
    gap: var(--h0n-ui-spacing-lg);
    justify-content: center;
}

.avatar-colors figure {
    align-items: center;
    display: grid;
    gap: var(--h0n-ui-spacing-xs);
    justify-items: center;
    margin: 0;
}

.avatar-colors figcaption {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-xs-size);
}
</style>
