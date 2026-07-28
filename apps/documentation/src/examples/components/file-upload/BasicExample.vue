<script setup lang="ts">import{H0FileUpload}from'@h0nio/ui';import{ref}from'vue';const files=ref<File[]>([])</script>
<template><H0FileUpload v-model="files" class="upload" multiple accept=".pdf,image/*" :max-files="3" :max-size="5000000" label="Project files" hint="PDF or image, up to 5 MB each."/></template>
<style scoped>.upload{width:min(36rem,100%)}</style>
