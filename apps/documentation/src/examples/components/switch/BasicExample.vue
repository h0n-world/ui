<script setup lang="ts">import{H0Switch}from'@h0nio/ui';import{ref}from'vue';const enabled=ref(true)</script>
<template><H0Switch v-model="enabled" label="Automatic updates" hint="Install stable releases automatically."/></template>
