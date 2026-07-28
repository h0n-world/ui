<script setup lang="ts">import{emailIcon}from'@h0nio/ui/icons';import{H0Input}from'@h0nio/ui';import{ref}from'vue';const email=ref('')</script>
<template><H0Input v-model="email" class="input" type="email" label="Email" placeholder="team@example.com" :prefix-icon="emailIcon" clearable hint="Used for account notifications."/></template>
<style scoped>.input{width:min(28rem,100%)}</style>
