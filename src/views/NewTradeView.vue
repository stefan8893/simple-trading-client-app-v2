<script setup lang="ts">
  import { ref, watch } from 'vue';
  import SimpleDateTimePicker from '@/components/infrastructure/dateTimePicker/SimpleDateTimePicker.vue';
  import SimpleStepperNumberInput from '@/components/infrastructure/numberInput/SimpleStepperNumberInput.vue';
  import AssetSelect from '@/components/trading/AssetSelect.vue';
  import ProfileSelect from '@/components/trading/ProfileSelect.vue';
  import ResultSelect from '@/components/trading/ResultSelect.vue';
  import { formatDateTime } from '@/i18n/date-utils';
  import { useLocaleStore } from '@/stores/localeStore';
  const localeStore = useLocaleStore();
  localeStore.locale = 'de-AT';

  const opened = ref<Date | null>(null);
  const closed = ref<Date | null>(null);
  const positionSize = ref<number | null>(null);
  const profitLoss = ref<number | null>(null);
  const entry = ref<number | null>(null);
  const stopLoss = ref<number | null>(null);
  const takeProfit = ref<number | null>(null);
  const exit = ref<number | null>(null);

  const closeTradeSectionExpanded = ref(false);

  watch(opened, () => {
    if (opened.value)
      console.log('opened value changed', formatDateTime(opened.value));
    else
      console.log('opened date not present');
  });
</script>

<template>
  <div class="flex flex-row flex-nowrap justify-center add-trade-container">
    <v-card class="max-w-3xl w-full" title="Neuer Trade">
      <v-card-text class="pt-4">
        <div class="two-columns">
          <div class="left">
            <SimpleDateTimePicker v-model="opened" date-label="Am" time-label="Um" />
            <ProfileSelect />
            <AssetSelect />
            <SimpleStepperNumberInput
              v-model="positionSize"
              :initial-stepper-value="5000"
              label="Positionsgröße"
              :max="999_999_999"
              :min="0"
              :precision="0"
              :step="100"
            />
          </div>
          <div class="right sm:px-10 md:px-14">
            <SimpleStepperNumberInput
              v-model="entry"
              class="w-full"
              currency="USD"
              :initial-stepper-value="1.15"
              label="Einstiegspreis"
              :precision="4"
              show-currency
              :step="0.0001"
            />
            <SimpleStepperNumberInput
              v-model="stopLoss"
              currency="USD"
              error-message=""
              :initial-stepper-value="1.1490"
              label="Stop-Loss"
              :precision="4"
              show-currency
              :step="0.0001"
            />
            <SimpleStepperNumberInput
              v-model="takeProfit"
              currency="USD"
              :initial-stepper-value="1.1530"
              label="Take-Profit"
              :precision="4"
              show-currency
              :step="0.0001"
            />
          </div>
        </div>

        <div class="mt-4">
          <v-hover>
            <template #default="{ isHovering, props: hoverProps }">
              <v-card
                v-bind="hoverProps"
                :color="isHovering ? 'accent' : undefined"
                elevation="0"
                variant="flat"
                @click="closeTradeSectionExpanded = !closeTradeSectionExpanded"
              >
                <v-card-text class="font-light text-lg flex flex-row flex-nowrap justify-between select-none">
                  <div>Abschließen</div>
                  <v-icon :icon="closeTradeSectionExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'" size="large" />
                </v-card-text>
              </v-card>
            </template>
          </v-hover>

          <v-expand-transition class="mt-4">
            <v-card
              v-show="closeTradeSectionExpanded"
              elevation="0"
              :rounded="0"
            >
              <v-card-text class="p-0">
                <div class="two-columns">
                  <div class="left">
                    <SimpleDateTimePicker v-model="closed" date-label="Abgeschlossen am" time-label="Um" />
                    <SimpleStepperNumberInput
                      v-model="profitLoss"
                      currency="EUR"
                      :initial-stepper-value="50"
                      label="Profit/Verlust"
                      :precision="2"
                      show-currency
                      :step="1"
                    />
                  </div>
                  <div class="right sm:px-10 md:px-14">
                    <SimpleStepperNumberInput
                      v-model="exit"
                      currency="USD"
                      :initial-stepper-value="1.1530"
                      label="Ausstiegspreis"
                      :precision="4"
                      show-currency
                      :step="0.0001"
                    />
                    <ResultSelect />
                  </div>

                </div>
              </v-card-text>
            </v-card>
          </v-expand-transition>
        </div>

        <div class="mt-4 flex flex-row flex-wrap justify-end items-start">
          <v-btn color="primary">Speichern</v-btn>
        </div>

      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.add-trade-container{
  container-type: inline-size;
  container-name: add-trade-container;
}
.two-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;

  row-gap: 1rem;
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

  .right {
    padding-inline: 0;
  }
}

</style>
