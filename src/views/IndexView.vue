<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { useTheme } from 'vuetify';
import DateTimePicker from '@/components/infrastructure/dateTimePicker/DateTimePicker.vue';
import NumberInput from '@/components/infrastructure/numberInput/NumberInput.vue';
import StepperNumberInput from '@/components/infrastructure/numberInput/StepperNumberInput.vue';
import { useLocaleStore } from '@/stores/localeStore';

const { cycle } = useTheme();
const localeStore = useLocaleStore();
localeStore.locale = 'en-US';

const dateTime = ref<Date | null>(null);
</script>

<template>
  <v-card>
    <v-card-title> FooBar </v-card-title>
    <v-card-text>
      <div>index.vue works!</div>
      <v-btn color="primary"> Primary </v-btn>
      <v-btn color="secondary"> Secondary </v-btn>
      <v-btn color="accent"> Accent </v-btn>
      <v-btn color="error"> Error </v-btn>
      <v-btn color="info"> Info </v-btn>
      <v-btn color="success"> Success </v-btn>
      <v-btn color="warning"> Warning </v-btn>

      <v-btn class="m-2" icon="ph:sun-dim" @click="cycle()" />

      <div class="mt-4">
        <v-btn class="" color="info" :to="{ name: 'new-trade' }">
          Neuer Trade
        </v-btn>
        <Icon icon="ph:plus" width="24" />
      </div>

      <div class="mt-4">
        <v-btn class="" color="info" :to="{ name: 'trade-references' }">
          Referenzen
        </v-btn>
      </div>

      <div class="mt-4">
        <v-btn class="" color="info" :to="{ name: 'home' }"> Home </v-btn>
      </div>

      <div class="my-6 flex flex-col flex-nowrap gap-4">
        <DateTimePicker v-model="dateTime" date-label="Am" time-label="Um" />
        <NumberInput label="Wert" />
        <StepperNumberInput
          :initial-stepper-value="5000"
          label="Noch ein Wert"
        />
        <div><v-btn color="primary">Speichern</v-btn></div>
      </div>

      <p class="text-4xl mt-14">Lorem Ipsum</p>
      <p class="text-3xl mt-4">Lorem Ipsum</p>
      <p class="text-2xl mt-2">Lorem Ipsum</p>
      <p class="mt-2">Lorem Ipsum</p>
    </v-card-text>
  </v-card>
</template>
