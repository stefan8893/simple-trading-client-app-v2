<script setup lang="ts">
import type { ReferenceModel } from './references.types';
import { useSortable } from '@vueuse/integrations/useSortable';
import { computed, ref, useTemplateRef, watch } from 'vue';
import { createUniqueKey, zip } from '@/components/utils';
import SingleTradeReference from './SingleTradeReference.vue';

type InternalReferenceModel = {
  internalKey: string;
} & ReferenceModel;

function toInternal(model: ReferenceModel): InternalReferenceModel {
  return { ...model, internalKey: createUniqueKey() };
}

function isEqual(a: ReferenceModel, b: ReferenceModel) {
  return a.link === b.link && a.notes === b.notes;
}

const model = defineModel({ type: Array<ReferenceModel>, default: [] });
const props = defineProps<{
  tradeId?: string;
}>();

const internalReferences = ref<InternalReferenceModel[]>(
  model.value.map((x) => toInternal(x)),
);

watch(model, (newValue) => {
  if (!newValue) {
    internalReferences.value = [];
    return;
  }

  const bothHaveSameLength =
    internalReferences.value &&
    newValue.length === internalReferences.value.length;
  const bothHaveStructuralEquality = () =>
    bothHaveSameLength &&
    zip(newValue, internalReferences.value).every(([a, b]) => isEqual(a, b));

  if (bothHaveStructuralEquality()) {
    return;
  }

  internalReferences.value = newValue.map((x) => toInternal(x));
});

watch(
  internalReferences,
  (newValue) => {
    if (!newValue) {
      model.value = [];
      return;
    }

    const bothHaveSameLength =
      internalReferences.value &&
      newValue.length === internalReferences.value.length;
    const bothHaveStructuralEquality = () =>
      bothHaveSameLength &&
      zip(newValue, internalReferences.value).every(([a, b]) => isEqual(a, b));

    if (bothHaveStructuralEquality()) {
      return;
    }

    model.value = newValue.map((x) => ({
      id: x.id,
      link: x.link,
      notes: x.notes,
    }));
  },
  { deep: true },
);

const sortableContainer = useTemplateRef('sortable-references');
const {} = useSortable(sortableContainer, internalReferences, {
  animation: 200,
  handle: '.sortable-reference-handle',
  dataIdAttr: 'data-id',
  dragClass: 'sortable-reference-item',
  ghostClass: 'sortable-reference-ghost',
  forceFallback: true,
  onStart: (evt) => {
    const container = evt.to;
    const currentHeight = container.offsetHeight;

    // fix height to prevent jumps
    container.style.height = `${currentHeight}px`;
  },

  onEnd: (evt) => {
    const container = evt.to;

    container.style.height = '';
  },
});

function removeReference(internalKey: string) {
  const index = internalReferences.value.findIndex(
    (x) => x.internalKey === internalKey,
  );
  if (index === -1) return;

  internalReferences.value.splice(index, 1);
}

function addReference() {
  const internalKey = createUniqueKey();

  const newItem = {
    link: '',
    notes: '',
    internalKey,
  };

  internalReferences.value.push(newItem);
}

const isAddReferenceDisabled = computed(() => {
  return internalReferences.value
    ? internalReferences.value.length >= 5
    : false;
});

const highlightedInternalKey = ref('');

function highlight(internalKey: string) {
  highlightedInternalKey.value = internalKey;
  setTimeout(() => {
    highlightedInternalKey.value = '';
  }, 550);
}
</script>

<template>
  <div ref="sortable-references">
    <div
      v-for="item in internalReferences"
      :key="item.internalKey"
      class="sortable-reference-item background-ease-in-out rounded-xl"
      :class="{
        'highlight-primary': item.internalKey === highlightedInternalKey,
      }"
      :data-id="item.internalKey"
    >
      <SingleTradeReference
        v-model="item as ReferenceModel"
        sortable-handle-class="sortable-reference-handle"
        :trade-id="props.tradeId"
        @highlight="highlight(item.internalKey)"
        @remove-reference="removeReference(item.internalKey)"
      />
    </div>
  </div>
  <div class="flex flex-row flex-nowrap justify-end">
    <v-btn
      class="my-2"
      color="primary"
      :disabled="isAddReferenceDisabled"
      icon="ph:plus"
      @click="addReference"
    />
  </div>
</template>

<style scoped>
.sortable-reference-ghost {
  opacity: 0.1;
  background: rgb(var(--v-theme-primary));
  background-color: rgb(var(--v-theme-primary));
  color: transparent;
}

.sortable-reference-ghost button {
  color: transparent;
}

.sortable-reference-ghost i {
  color: transparent;
}
</style>
