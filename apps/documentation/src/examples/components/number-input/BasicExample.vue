<script setup lang="ts">import{H0NumberInput}from'@h0nio/ui';import{ref}from'vue';const seats=ref<number|null>(3)</script>
<template><H0NumberInput v-model="seats" class="control" label="Seats" :min="1" :max="20" :step="1" hint="Between 1 and 20."/></template><style scoped>.control{width:min(22rem,100%)}</style>
