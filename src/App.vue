<template>
  <MenuBar class="navBarStyle" style="border: 0px">
    <template #start>
      <img alt="logo" src="@/assets/fuzzy-car-choice-logo.png" height="200" class="m-0 p-0" />
    </template>
  </MenuBar>

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

      <div>
        <!-- Criteria Input -->
        <div class="criteria-input">
          <div>
            <label>Nume criteriu:</label>
            <InputText v-model="newCriterion.name" />
          </div>
          <div>
            <label>Tip criteriu:</label>
            <DropDown v-model="newCriterion.type" :options="criterionTypes" />
          </div>
          <div>
            <label>Optimizare:</label>
            <DropDown v-model="newCriterion.optimizationType" :options="optimizationTypes" />
          </div>
          <div>
            <label>Pondere: </label>
            <InputText v-model="newCriterion.weight"></InputText>
          </div>
          <Button @click="addCriterion">Adauga criteriu</Button>
        </div>

        <div>
          <h3>Criteria List</h3>
          <ul>
            <li v-for="(criterion, index) in criteria" :key="index">
              {{ index + 1 }}. Criteriu: {{ criterion.name }}, Tip: {{ criterion.type }},
              Optimizare: {{ criterion.optimizationType }}, Pondere: {{ criterion.weight }}
            </li>
          </ul>
        </div>

        <!-- Data Table -->
        <DataTable
          :value="variants"
          :columns="columns"
          editMode="cell"
          @cell-edit-complete="onCellEditComplete"
          tableClass="editable-cells-table"
          :editable="true"
        >
          <template v-for="criterion in criteria" :key="criterion.name">
            <Column :field="criterion.name" :header="criterion.name" :editable="true"></Column>
          </template>
          <Column field="variant" header="Variant" :editable="true"></Column>
        </DataTable>

        <Dialog v-model:visible="dialogVisible" @hide="resetForm">
          <div class="p-fluid">
            <div><label>Varianta</label> <InputText v-model="formData.variant" /></div>
            <div v-for="(criterion, index) in criteria" :key="index">
              <label>{{ criterion.name }}</label>
              <InputText v-model="formData[criterion.name]" />
            </div>
          </div>

          <div class="p-dialog-footer">
            <Button label="Cancel" @click="hideDialog" />
            <Button label="Add" @click="addRow" />
          </div>
        </Dialog>

        <!-- Add Row Button -->
        <Button @click="openDialog">Adauga rand</Button>

        <!-- Calculate Optimal Decision Button -->
        <Button @click="calculateOptimalDecision">Calculeaza decizia optimă</Button>

        <!-- Display Optimal Decision -->
        <div v-if="optimalDecision">
          <h3>Decizia optima:</h3>
          <p>Varianta: {{ optimalDecision.variant }}</p>
          <p>Scorul: {{ optimalDecision.score }}</p>
        </div>
      </div>
    </TabPanel>
  </TabView>
</template>

<script setup>
import { ref } from 'vue'

const criteria = ref([])
let variants = ref([])

const newCriterion = ref({
  name: '',
  type: '',
  optimizationType: '',
  weight: ''
})

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
}

const hideDialog = () => {
  dialogVisible.value = false
}

const optimalDecision = ref(null)

const criterionTypes = ref(['Regular', 'Fuzzy'])
const optimizationTypes = ref(['Min', 'Max'])

const addCriterion = () => {
  criteria.value.push({ ...newCriterion.value })
  newCriterion.value.name = ''
  newCriterion.value.type = ''
  newCriterion.value.optimizationType = ''
  newCriterion.value.weight = ''
}

// const addRow = () => {
//   const row = {
//     variant: ''
//   }
//   criteria.value.forEach((criterion) => {
//     row[criterion.name] = null
//   })
//   variants.value.push(row)
// }

const onCellEditComplete = (event) => {
  let { data, newValue, field } = event
  data[field] = newValue
  event.preventDefault()
}

const calculateOptimalDecision = () => {
  // Implement the calculation logic based on the inserted values and criterion settings
  // ... your implementation here ...
  // Set the optimal decision in the reactive variable
  optimalDecision.value = {
    variant: 'Variant 1',
    score: 100
  }
}

const columns = criteria.value.map((criterion) => {
  return { field: criterion.name, header: criterion.name, sortable: true }
})

columns.push({ field: 'variant', header: 'Variant' })
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

.criteria-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
}

.criteria-input > div {
  display: flex;
  flex-direction: column;
}

.criteria-input > div:not(:last-child) {
  margin-right: 10px;
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
