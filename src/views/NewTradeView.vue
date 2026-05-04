<script setup lang="ts">
import type { ReferenceModel } from '@/components/trading/references/references.types';
import { ref, watch } from 'vue';
import DateTimePicker from '@/components/infrastructure/dateTimePicker/DateTimePicker.vue';
import ExpandPanel from '@/components/infrastructure/ExpandPanel.vue';
import StepperNumberInput from '@/components/infrastructure/numberInput/StepperNumberInput.vue';
import AssetSelect from '@/components/trading/AssetSelect.vue';
import MarkdownNotes from '@/components/trading/notes/MarkdownNotes.vue';
import ProfileSelect from '@/components/trading/ProfileSelect.vue';
import TradeReferences from '@/components/trading/references/TradeReferences.vue';
import ResultSelect from '@/components/trading/ResultSelect.vue';
import { MessageKeys } from '@/i18n/language/message-keys.g';
import { formatDateTime } from '@/i18n/regionalFormat/date-formatter';

const opened = ref<Date | null>(null);
const closed = ref<Date | null>(null);
const positionSize = ref<number | null>(null);
const profitLoss = ref<number | null>(null);
const entry = ref<number | null>(null);
const stopLoss = ref<number | null>(null);
const takeProfit = ref<number | null>(null);
const exit = ref<number | null>(null);
const references = ref<ReferenceModel[]>([]);
const notes = ref<string | null>(null);

const referencesSectionExpanded = ref(false);
const notesSectionExpanded = ref(false);
const closeTradeSectionExpanded = ref(false);

watch(opened, () => {
  if (opened.value)
    console.log('opened value changed', formatDateTime(opened.value));
  else console.log('opened date not present');
});
</script>

<template>
  <div class="grid justify-items-center add-trade-container">
    <v-card
      class="max-w-3xl w-full"
      tag="form"
      :title="$t(MessageKeys.trading.newTrade)"
    >
      <v-card-text class="px-0">
        <div class="two-columns px-4">
          <div class="left">
            <DateTimePicker
              v-model="opened"
              :date-label="$t(MessageKeys.dates.on)"
              :time-label="$t(MessageKeys.dates.at)"
            />

            <ProfileSelect />
            <AssetSelect />

            <StepperNumberInput
              v-model="positionSize"
              :initial-stepper-value="5000"
              :label="$t(MessageKeys.trading.size)"
              :max="999_999_999"
              :min="0"
              :precision="0"
              :step="100"
            />
          </div>

          <div class="right">
            <StepperNumberInput
              v-model="entry"
              class="w-full"
              currency="USD"
              :initial-stepper-value="1.15"
              :label="$t(MessageKeys.trading.entryPrice)"
              :precision="4"
              show-currency
              :step="0.0001"
            />

            <StepperNumberInput
              v-model="stopLoss"
              currency="EUR"
              error-message=""
              :initial-stepper-value="1.149"
              :label="$t(MessageKeys.trading.stopLoss)"
              :precision="4"
              show-currency
              :step="0.0001"
            />

            <StepperNumberInput
              v-model="takeProfit"
              currency="USD"
              :initial-stepper-value="1.153"
              :label="$t(MessageKeys.trading.takeProfit)"
              :precision="4"
              show-currency
              :step="0.0001"
            />
          </div>
        </div>

        <ExpandPanel
          v-model="referencesSectionExpanded"
          class="mt-2"
          :header-title="$t(MessageKeys.trading.reference, 2)"
        >
          <template #content>
            <div class="mt-2 px-4">
              <TradeReferences v-model="references" :trade-id="undefined" />
            </div>
          </template>
        </ExpandPanel>

        <ExpandPanel
          v-model="notesSectionExpanded"
          class="mt-2"
          :header-title="$t(MessageKeys.trading.note)"
        >
          <template #content>
            <div class="mt-2 px-4">
              <MarkdownNotes v-model="notes" :show-editor="true" />
            </div>
          </template>
        </ExpandPanel>

        <ExpandPanel
          v-model="closeTradeSectionExpanded"
          class="mt-2"
          :header-title="$t(MessageKeys.trading.finish)"
        >
          <template #content>
            <div class="two-columns mt-4 px-4">
              <div class="left">
                <DateTimePicker
                  v-model="closed"
                  :date-label="$t(MessageKeys.trading.finishedOn)"
                  :time-label="$t(MessageKeys.dates.at)"
                />

                <StepperNumberInput
                  v-model="profitLoss"
                  currency="EUR"
                  :initial-stepper-value="50"
                  :label="$t(MessageKeys.trading.profitLoss)"
                  :precision="2"
                  show-currency
                  :step="1"
                />
              </div>

              <div class="right">
                <div class="flex flex-col flex-nowrap gap-2">
                  <StepperNumberInput
                    v-model="exit"
                    currency="USD"
                    :initial-stepper-value="1.153"
                    :label="$t(MessageKeys.trading.exitPrice)"
                    :precision="4"
                    show-currency
                    :step="0.0001"
                  />

                  <ResultSelect />
                </div>
              </div>
            </div>
          </template>
        </ExpandPanel>
      </v-card-text>

      <v-card-actions>
        <v-btn>{{ $t(MessageKeys.save) }}</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
.add-trade-container {
  container-type: inline-size;
  container-name: add-trade-container;
}

.two-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;

  row-gap: 1rem;
  column-gap: 2rem;
}

.left {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 8px;
}

.right {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 8px;
}

@container add-trade-container (width < 650px) {
  .two-columns {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
}
</style>
