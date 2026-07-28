<script setup lang="ts">import{H0Textarea}from'@h0nio/ui';import{ref}from'vue';const message=ref('')</script>
<template><H0Textarea v-model="message" class="control" label="Message" placeholder="Describe the issue" :maxlength="280" :min-rows="3" auto-resize hint="Maximum 280 characters."/></template><style scoped>.control{width:min(32rem,100%)}</style>
