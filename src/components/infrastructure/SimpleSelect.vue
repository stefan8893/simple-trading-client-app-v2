<script setup lang="ts">
export type SimpleSelectItem = {
  title: string;
  value: string | null;
};
</script>

<template>
  <v-select
    item-title="title"
    item-value="value"
    :menu-props="{
      contentProps: {
        class: 'rounded-xl',
      },
    }"
  />
</template>

<style scoped></style>
