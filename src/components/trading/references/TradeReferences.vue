<script setup lang="ts">
  import type { ReferenceModel } from './references.types';
  import { useSortable } from '@vueuse/integrations/useSortable';
  import { computed, ref, useTemplateRef, watch } from 'vue';
  import { createUniqueKey } from '@/components/utils';
  import TradeReferenceLink from './TradeReferenceLink.vue';

  type InternalReferenceModel = {
    internalKey: string
  } & ReferenceModel;

  function toInternal (model: ReferenceModel): InternalReferenceModel {
    return { ...model, internalKey: createUniqueKey() };
  }

  function isEqual (a: ReferenceModel, b: ReferenceModel) {
    return a.link === b.link && a.notes === b.notes;
  }

  function zip<A, B> (a: A[], b: B[]) {
    return a.map((x, i) => [x, b[i]]);
  }

  const model = defineModel({ type: Array<ReferenceModel>, default: [] });

  export type ReferenceViewMode
    = | { mode: 'create' }
      | { mode: 'update', tradeId: string };

  const props = defineProps<{
    referenceViewMode: ReferenceViewMode
  }>();

  const internalReferences = ref<InternalReferenceModel[]>(
    model.value.map(x => toInternal(x)),
  );

  watch(model, newValue => {
    if (!newValue) {
      internalReferences.value = [];
      return;
    }

    const bothHaveSameLength = internalReferences.value
      && newValue.length === internalReferences.value.length;
    const structuralEquality = () =>
      zip(newValue, internalReferences.value)
        .every(([a, b]) => isEqual(a, b));

    if (bothHaveSameLength && structuralEquality()) {
      return;
    }

    internalReferences.value = newValue.map(x => toInternal(x));
  });

  watch(internalReferences, newValue => {
    if (!newValue) {
      model.value = [];
      return;
    }

    const bothHaveSameLength = model.value && newValue.length === model.value.length;
    const structuralEquality = () =>
      zip(newValue, model.value)
        .every(([a, b]) => isEqual(a, b));

    if (bothHaveSameLength && structuralEquality()) {
      return;
    }

    model.value = newValue.map(x => ({ link: x.link, notes: x.notes }));
  }, { deep: true });

  const sortableContainer = useTemplateRef('sortable-references');
  const { } = useSortable(sortableContainer, internalReferences, {
    animation: 200,
    handle: '.sortable-reference-handle',
    dataIdAttr: 'data-id',
    dragClass: 'sortable-reference-item',
    ghostClass: 'sortable-reference-ghost',
  });

  function removeReference (internalKey: string) {
    const index = internalReferences.value.findIndex(x => x.internalKey === internalKey);
    if (index === -1)
      return;

    internalReferences.value.splice(index, 1);
  }

  function addReference () {
    const internalKey = createUniqueKey();

    const newItem = {
      link: '',
      notes: '',
      internalKey,
    };

    internalReferences.value.push(newItem);
  }

  const isAddReferenceDisabled = computed(() => {
    return internalReferences.value ? internalReferences.value.length >= 5 : false;
  });

</script>

<template>
  <div ref="sortable-references">
    <div
      v-for="item in internalReferences"
      :key="item.internalKey"
      class="sortable-reference-item h flex flex-row flex-wrap justify-start items-center"
      :data-id="item.internalKey"
    >
      <v-icon class="sortable-reference-handle cursor-grab mx-2" color="primary" icon="mdi-reorder-horizontal" />
      <TradeReferenceLink
        v-model="item as ReferenceModel"
        class="grow shrink min-w-48"
        :view-mode="props.referenceViewMode.mode"
        @remove-reference="removeReference(item.internalKey)"
      />
    </div>
  </div>
  <div class="flex flex-row flex-nowrap justify-end ">
    <v-tooltip location="top" text="Hinzufügen">
      <template #activator="{ props: addReferenceTooltip }">
        <v-btn
          v-bind="addReferenceTooltip"
          color="primary"
          :disabled="isAddReferenceDisabled"
          icon="mdi-plus"
          @click="addReference"
        />
      </template>
    </v-tooltip>
  </div>
  <!-- <div>
      <pre class="text-sm leading-3.5">{{ JSON.stringify(internalReferences, null, 2) }}</pre>
    </div> -->
</template>

<style scoped>
  .sortable-reference-ghost {
    opacity: 0.1;
    background: rgb(var(--v-theme-info));
    background-color: rgb(var(--v-theme-info));
    color: transparent;
  }

  .sortable-reference-ghost button {
    color: transparent;
  }

  .sortable-reference-ghost i {
    color: transparent;
  }
</style>
