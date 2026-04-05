<script setup lang="ts">
  const model = defineModel<boolean>();
  const props = defineProps<{
    headerTitle?: string
  }>();

</script>

<template>
  <div>
    <v-hover>
      <template #default="{ isHovering, props: hoverProps }">
        <v-card
          v-bind="hoverProps"
          :color="isHovering ? 'accent' : undefined"
          elevation="0"
          variant="flat"
          @click="model = !model"
        >
          <v-card-text class="flex flex-row flex-nowrap justify-between select-none">
            <slot name="header">
              <span class="font-light text-xl">{{ props.headerTitle }}</span>
            </slot>
            <v-icon :icon="model ? 'mdi-chevron-up' : 'mdi-chevron-down'" size="large" />
          </v-card-text>
        </v-card>
      </template>
    </v-hover>

    <v-expand-transition>
      <div v-show="model">
        <slot name="content" />
      </div>
    </v-expand-transition>
  </div>
</template>

<style scoped>
</style>
