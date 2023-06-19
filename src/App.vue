<template>
  <div
    class="navBarStyle flex justify-content-between align-items-center flex-wrap"
    style="border: 0px; min-height: 200px"
  >
    <div class="flex align-items-center justify-content-center">
      <img alt="logo" src="@/assets/fuzzy-car-choice-logo.png" height="200" class="m-0 p-0" />
    </div>
    <div class="flex align-items-center justify-content-between">
      <img
        alt="mijto"
        src="https://media.tenor.com/FQ38aKxDsr4AAAAC/skull-glowing-eye.gif"
        height="150"
        class="m-0 p-0"
      />
    </div>
  </div>

  <TabView class="mt-4 flex flex-column align-items-center">
    <TabPanel>
      <template #header>
        <i class="pi pi-book mr-2"></i>
        <span>Documentație</span>
      </template>
      <p>sdfnjsd</p>
    </TabPanel>

    <TabPanel>
      <template #header>
        <i class="pi pi-calculator mr-2"></i>
        <span>Model</span>
      </template>

      <div class="flex flex-row justify-content-center">
        <div>
          <div class="flex flex-row">
            <div class="flex flex-column mr-2">
              <label>Nume criteriu:</label>
              <InputText v-model="newCriterion.name" />
            </div>
            <div class="flex flex-column mr-2">
              <label>Tip criteriu:</label>
              <DropDown v-model="newCriterion.type" :options="criterionTypes" />
            </div>
            <div class="flex flex-column mr-2">
              <label>Optimizare:</label>
              <DropDown v-model="newCriterion.optimizationType" :options="optimizationTypes" />
            </div>
          </div>
          <div class="flex flex-column">
            <div class="flex flex-column mr-2">
              <label>Nivel aspirație: </label>
              <InputText s v-model="newCriterion.aspirationLevel"></InputText>
            </div>
            <div class="flex flex-column mr-2">
              <label>Abatere acceptată: </label>
              <InputText v-model="newCriterion.acceptedDeviation"></InputText>
            </div>
          </div>
          <div class="flex flex-column mr-2">
            <label>Pondere: </label>
            <InputText v-model="newCriterion.weight"></InputText>
          </div>
          <Button
            class="mt-2 border-circle"
            v-tooltip="'Adaugă criteriu'"
            @click="addCriterion"
            icon="pi pi-plus"
          ></Button>
        </div>
      </div>

      <div class="mb-4">
        <h3>Listă criterii:</h3>
        <ul>
          <li v-for="(criterion, index) in criteria" :key="index">
            {{ index + 1 }}. Criteriu: {{ criterion.name }}, Tip: {{ criterion.type }}, Optimizare:
            {{ criterion.optimizationType }}, Pondere: {{ criterion.weight }}, Nivel aspirație:
            {{ criterion.aspirationLevel }}, Abatere acceptată: {{ criterion.acceptedDeviation }}
          </li>
        </ul>
        <Button v-if="showDeleteCriteriaBtn" @click="deleteCriteria">Șterge criterii</Button>
      </div>

      <!-- Data Table -->
      <DataTable
        :value="variants"
        :columns="columns"
        editMode="cell"
        tableClass="editable-cells-table"
        @cell-edit-complete="onCellEditComplete"
        :editable="true"
      >
        <Column field="variant" header="Variant" :editable="true">
          <template #editor="{ data, field }"> <InputText v-model="data[field]" /> </template
        ></Column>
        <template v-for="criterion in criteria" :key="criterion.name">
          <Column :field="criterion.name" :header="criterion.name" :editable="true">
            <template #editor="{ data, field }"> <InputText v-model="data[field]" /> </template
          ></Column>
        </template>
      </DataTable>

      <Dialog v-model:visible="dialogVisible" @hide="resetForm">
        <div class="p-fluid">
          <div>
            <label>Varianta</label>
            <InputText v-model="formData.variant" />
          </div>
          <div v-for="(criterion, index) in criteria" :key="index">
            <label>{{ criterion.name }}</label>
            <template v-if="criterion.type === 'Fuzzy'">
              <!-- Input Mask for Fuzzy Type -->
              <InputText v-model="formData[criterion.name]" placeholder="ex. 234,324,656" />
            </template>
            <template v-else>
              <!-- Simple Input for Other Criterion Types -->
              <InputText v-model="formData[criterion.name]" />
            </template>
          </div>
        </div>

        <div class="p-dialog-footer">
          <Button id="denyDialog" label="Închide" @click="hideDialog" />
          <Button id="accDialog" label="Adaugă" @click="addRow" />
        </div>
      </Dialog>

      <!-- Add Row Button -->
      <div class="flex justify-content-between mt-2">
        <Button @click="openDialog">Adaugă variantă</Button>
        <Button @click="emptyTable">Golește tabel</Button>
      </div>

      <DataTable class="mt-4" v-if="fuzzyMatrix" :value="fuzzyMatrix">
        <Column field="variant" header="Variant"></Column>
        <Column
          v-for="criterion in criteria"
          :key="criterion.name"
          :field="criterion.name"
          :header="criterion.name"
        ></Column>
      </DataTable>

      <Card class="mt-4" style="width: 100%">
        <template #title> <h3>Decizia optima:</h3> </template>
        <template #subtitle> <hr style="width: 100%; border-color: white" /> </template>
        <template #content>
          <div class="flex flex-column" v-if="optimalDecision && hierarchy">
            <div class="flex flex-column">
              <p>Varianta: {{ optimalDecision.variant }}</p>
              <p>Scorul: {{ optimalDecision }}</p>
            </div>
            <div class="flex flex-row">
              <p>Ierarhie: &nbsp;</p>
              <p v-for="(item, index) in hierarchy" :key="index">
                {{ item }} {{ index < hierarchy.length - 1 ? '>&nbsp;' : '' }}
              </p>
            </div>
          </div>
        </template>
      </Card>

      <div class="mt-4">
        <Button @click="calculateOptimalDecision()">Calculeaza decizia optimă</Button>
      </div>
    </TabPanel>
  </TabView>
</template>

<script setup>
import { ref } from 'vue'

const criteria = ref([
  {
    name: 'pret',
    type: 'Regular',
    optimizationType: 'Min',
    weight: 0.6,
    aspirationLevel: 9.5,
    acceptedDeviation: 5
  },
  {
    name: 'Cheltuieli',
    type: 'Fuzzy',
    optimizationType: 'Min',
    weight: 0.2,
    aspirationLevel: 400,
    acceptedDeviation: 100
  },
  {
    name: 'GradConfort',
    type: 'Regular',
    optimizationType: 'Max',
    weight: 0.2,
    aspirationLevel: 20,
    acceptedDeviation: 5
  }
])
const variants = ref([
  { variant: 'Masina 1', pret: 13.5, Cheltuieli: '400, 430, 500', GradConfort: 20 },
  { variant: 'Masina 2', pret: 12, Cheltuieli: '440, 500, 530', GradConfort: 19 },
  { variant: 'Masina 3', pret: 11, Cheltuieli: '380, 400, 480', GradConfort: 17 },
  { variant: 'Masina 4', pret: 10.5, Cheltuieli: '410, 450, 520', GradConfort: 16 }
])

// const criteria = ref([])
// const variants = ref([])

const optimalDecision = ref(null)
const hierarchy = ref([])

const newCriterion = ref({
  name: '',
  type: '',
  optimizationType: '',
  weight: '',
  aspirationLevel: '',
  acceptedDeviation: ''
})

const columns = criteria.value.map((criterion) => {
  return { field: criterion.name, header: criterion.name, sortable: true }
})

const showDeleteCriteriaBtn = ref(false)

const deleteCriteria = () => {
  criteria.value = []
  showDeleteCriteriaBtn.value = false
}

columns.push({ field: 'variant', header: 'Variant' })

const dialogVisible = ref(false)
const formData = ref({})

const openDialog = () => {
  formData.value = { variant: '' }
  dialogVisible.value = true
}

const resetForm = () => {
  formData.value = { variant: '' }
}

const addRow = () => {
  const newRow = { ...formData.value }
  variants.value.push(newRow)
  hideDialog()
  console.log(variants.value)
}

const emptyTable = () => {
  variants.value = []
}

const hideDialog = () => {
  dialogVisible.value = false
}

const criterionTypes = ref(['Regular', 'Fuzzy'])
const optimizationTypes = ref(['Min', 'Max'])

const addCriterion = () => {
  criteria.value.push({ ...newCriterion.value })
  newCriterion.value.name = ''
  newCriterion.value.type = ''
  newCriterion.value.optimizationType = ''
  newCriterion.value.weight = ''
  newCriterion.value.aspirationLevel = ''
  newCriterion.value.acceptedDeviation = ''
  showDeleteCriteriaBtn.value = true
  console.log(criteria.value)
}

const onCellEditComplete = (event) => {
  let { data, newValue, field } = event
  data[field] = newValue
}

const fuzzyMatrix = ref([])

const consequencesMatrix = () => {
  fuzzyMatrix.value = []

  for (const variant of variants.value) {
    const fuzzyValues = {}

    for (const criterion of criteria.value) {
      const { name, type, optimizationType, aspirationLevel, acceptedDeviation } = criterion
      const value = variant[name]

      let fuzzyValue = 0

      if (type === 'Fuzzy') {
        const convertedArray = value.split(/,\s*/).map(Number)
        const defuzzifiedValue =
          0.25 * (convertedArray[0] + 2 * convertedArray[1] + convertedArray[2])
        if (optimizationType === 'Min') {
          fuzzyValue = calculateFuzzyMin(defuzzifiedValue, aspirationLevel, acceptedDeviation)
        } else if (optimizationType === 'Max') {
          fuzzyValue = calculateFuzzyMax(defuzzifiedValue, aspirationLevel, acceptedDeviation)
        }
      } else {
        // Treat as regular type by default
        if (optimizationType === 'Min') {
          fuzzyValue = calculateFuzzyMin(value, aspirationLevel, acceptedDeviation)
        } else if (optimizationType === 'Max') {
          fuzzyValue = calculateFuzzyMax(value, aspirationLevel, acceptedDeviation)
        }
      }

      fuzzyValues[name] = fuzzyValue
    }

    fuzzyMatrix.value.push(fuzzyValues)
  }

  return fuzzyMatrix
}

const calculateFuzzyMin = (value, aspirationLevel, acceptedDeviation) => {
  if (Number(value) <= Number(aspirationLevel)) {
    return 1
  } else if (
    Number(value) > Number(aspirationLevel) &&
    Number(value) < Number(aspirationLevel) + Number(acceptedDeviation)
  ) {
    return (1 - (Number(value) - Number(aspirationLevel)) / Number(acceptedDeviation)).toFixed(2)
  } else if (Number(value) >= Number(aspirationLevel) + Number(acceptedDeviation)) {
    return 0
  }
}

const calculateFuzzyMax = (value, aspirationLevel, acceptedDeviation) => {
  if (Number(value) >= Number(aspirationLevel)) {
    return 1
  } else if (
    Number(value) < Number(aspirationLevel) &&
    Number(value) > Number(aspirationLevel) - Number(acceptedDeviation)
  ) {
    return (1 - (Number(aspirationLevel) - Number(value)) / Number(acceptedDeviation)).toFixed(2)
  } else if (Number(value) <= Number(aspirationLevel) - Number(acceptedDeviation)) {
    return 0
  }
}

const membershipFunction = () => {
  consequencesMatrix()

  const hasWeight = criteria.value.some((criterion) => criterion.weight !== '')
  let membership = []

  if (hasWeight) {
    membership = weightedOptimalDecision(fuzzyMatrix.value)
  } else {
    membership = weightlessOptimalDecision(fuzzyMatrix.value)
  }

  return membership
}

const calculateOptimalDecision = () => {
  optimalDecision.value = null
  hierarchy.value = []
  let membership = []

  membership = membershipFunction()

  optimalDecision.value = Math.max(...membership)
  hierarchy.value = membership.sort(function (a, b) {
    return b - a
  })
  console.log(hierarchy.value)
  console.log(optimalDecision.value)

  return optimalDecision
}

const weightedOptimalDecision = (fuzzyMat) => {
  let weightedRows = []
  weightedRows = fuzzyMat.map((row) => {
    const weightedRow = {}

    for (const criterion of criteria.value) {
      const { name, weight } = criterion
      const value = row[name]

      weightedRow[name] = Number(value * weight)
    }

    const rowSum = Object.values(weightedRow).reduce((acc, val) => Number(acc) + Number(val), 0)
    weightedRow.sum = Number(rowSum.toFixed(2))

    return weightedRow
  })

  let weightedArray = []
  weightedArray = weightedRows.map((row) => row.sum)

  return weightedArray
}

const weightlessOptimalDecision = (fuzzyMat) => {
  const weightlessRow = {}
  fuzzyMat.map((row) => {
    for (const criterion of criteria.value) {
      const { name } = criterion
      const value = row[name]

      weightlessRow[name] = Number(value)
    }

    const minRowValue = Math.min(...Object.values(weightlessRow))
    weightlessRow.minValue = minRowValue.toFixed(2)
  })
  return weightlessRow
}
</script>

<style scoped>
.navBarStyle {
  background-color: transparent;
}
:deep(.p-button) {
  background-color: black;
  border: 0;
  margin: 2px;
}
:deep(.p-inputtext) {
  background-color: black;
}
:deep(.p-dropdown) {
  background-color: black;
}
:deep(.p-dropdown-item) {
  color: white;
}
:deep(.p-dropdown-item:focus) {
  background-color: black;
}
:deep(.p-datatable-table) {
  background-color: black;
}
:deep(.p-dropdown-item .p-highlight) {
  background-color: black;
}
</style>

<style>
body {
  background: rgb(0, 0, 0);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 25%,
    rgba(0, 255, 0, 0.9) 63%,
    rgba(2, 206, 1, 1) 80%,
    rgba(8, 4, 4, 1) 100%
  );

  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
</style>
