<script setup lang="ts">import{H0SearchField}from'@h0nio/ui';import{ref}from'vue';const query=ref('')</script>
<template><H0SearchField v-model="query" class="control" placeholder="Search documentation" aria-label="Search documentation" clearable/></template><style scoped>.control{width:min(28rem,100%)}</style>
