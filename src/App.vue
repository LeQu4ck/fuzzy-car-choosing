<template>
  <Toast position="top-right"></Toast>
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
      <div class="container mt-4 mb-4">
        <h1>Documentația Aplicației Fuzzy de alegere a unui automobil (FDM)</h1>
        <hr />
        <h2>1. Introducere</h2>
        <p>
          Aplicația Fuzzy de alegere a unui automobil (FDM) este o aplicație informatică dezvoltată
          pentru a facilita procesul decizional în alegerea unui automobil, pe baza mai multor
          criterii și alternative. Această aplicație folosește teoria fuzzy pentru a trata
          incertitudinea și ambiguitatea care pot apărea în procesul decizional.
        </p>
        <h2>2. Specificații de Intrare</h2>
        <p>FDM acceptă următoarele tipuri de intrări:</p>
        <ul>
          <li>
            <strong>Criterii</strong>: Aplicația acceptă criterii diferite pentru evaluarea
            automobilului. Două dintre aceste criterii pot fi exprimate ca numere fuzzy
            triunghiulare.
          </li>
          <li>
            <strong>Alternative (Automobile)</strong>: Aplicația permite analiza și comparația a mai
            multor alternative diferite.
          </li>
          <li>
            <strong>Matricea Consecințelor</strong>: Aceasta este o matrice care reprezintă
            rezultatele posibile sau consecințele care ar putea rezulta din alegerea unei anumite
            alternative.
          </li>
          <li>
            <strong>Nivelele de Aspirație</strong>: Acestea sunt nivelurile pe care utilizatorul
            dorește să le atingă pentru fiecare criteriu.
          </li>
          <li>
            <strong>Abaterile Admise</strong>: Acestea sunt marjele de abatere permise de utilizator
            pentru fiecare criteriu.
          </li>
          <li>
            <strong>Ponderile Asociate Criteriilor</strong>: Acestea sunt ponderile pe care
            utilizatorul le acordă fiecărui criteriu. Aceste ponderi vor influența modul în care
            diferitele criterii contribuie la decizia finală.
          </li>
        </ul>
        <h2>3. Algoritmul de Decizie Multi-Atribut (FDM)</h2>
        <p>
          Algoritmul FDM folosește toate intrările specificate mai sus pentru a calcula decizia cea
          mai bună. Acest algoritmul ia în considerare nu numai valoarea fiecărui criteriu, ci și
          importanța relativă a fiecărui criteriu (adică ponderea acestuia), precum și abaterile
          admise și nivelurile de aspirație.
        </p>
        <h2>4. Interfață Utilizator</h2>
        <p>
          Interfața utilizatorului este intuitivă și ușor de utilizat, permițând utilizatorilor să
          introducă criteriile, ponderile, alternativele, nivelele de aspirație, abaterile admise și
          matricea consecințelor într-un format ușor de înțeles.
        </p>
        <h2>5. Tutorial de folosire a aplicației</h2>
        <ul>
          <li>Se introduce un criteriu.</li>
          <li>Se alege un tip de criteriu.</li>
          <li>Se alege optimizarea (min sau max).</li>
          <li>Se introduc următoarele: nivelul de aspirație, abaterea acceptată și ponderea.</li>
          <li>Se adaugă criteriile.</li>
          <li>
            După ce criteriile au fost adăugate, se adaugă variante, facând clic pe butonul
            <strong>"Adaugă variantă"</strong>.
          </li>
          <li>
            În urma apăsării butnoului <strong>"Adaugă variantă"</strong> va apărea o fereastră în
            care va fi scris numele variantei alături de valorile pentru fiecare criteriu.
          </li>
          <li>
            După ce ați adăugat toate variantele, apăsați pe butonul
            <strong>"calculează decizia optimă"</strong> pentru a afișa rezultatele.
          </li>
        </ul>
        <h2>6. Rezultatele Aplicației</h2>
        <p>
          Rezultatele aplicației FDM vor fi prezentate utilizatorilor într-un format clar și ușor de
          interpretat, arătând cum fiecare alternativă se compară cu celelalte în funcție de
          criteriile selectate.
        </p>
        <h2>7. Concluzii</h2>
        <p>
          Aplicația FDM reprezintă o unealtă puternică și flexibilă pentru deciziile multi-atribut,
          permițând utilizatorilor să își evalueze opțiunile într-un mod detaliat și riguros. În
          plus, utilizarea teoriei fuzzy permite tratamentul incertitudinii și ambiguității, făcând
          aplicația FDM adecvată pentru o gamă largă de scenarii decizionale.
        </p>
      </div>
    </TabPanel>

    <TabPanel>
      <template #header>
        <i class="pi pi-calculator mr-2"></i>
        <span>Model</span>
      </template>

      <div style="color: white" class="flex flex-row justify-content-center mt-4">
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
              <InputNumber
                v-model.number="newCriterion.aspirationLevel"
                :maxFractionDigits="2"
              ></InputNumber>
            </div>

            <div class="flex flex-column mr-2">
              <label>Abatere acceptată: </label>
              <InputNumber
                v-model.number="newCriterion.acceptedDeviation"
                :maxFractionDigits="2"
              ></InputNumber>
            </div>
          </div>

          <div class="flex flex-row flex-wrap mr-2 mt-2 mb-2">
            <p style="color: white; text-align: center" class="flex justify-content-start mr-2">
              Pondere?
            </p>
            <ToggleButton type="button" class="border-round-xl" v-model="tglBtn" />
          </div>

          <div v-if="tglBtn" class="flex flex-column mr-2">
            <InputNumber :maxFractionDigits="2" v-model.number="newCriterion.weight"></InputNumber>
          </div>

          <Button
            type="button"
            style="background-color: black; color: white"
            class="mt-4 border-round-md"
            v-tooltip="'Adaugă criteriu'"
            @click="addCriterion"
            icon="pi pi-plus"
          ></Button>
        </div>
      </div>

      <!-- Added data table for criteria -->
      <div class="mt-4 mb-4" v-if="criteria.length > 0">
        <DataTable
          v-model:editing-rows="editingRows"
          :value="criteria"
          editMode="row"
          dataKey="name"
          @row-edit-save="onRowEditSave"
          tableClass="editable-cells-table"
          tableStyle="min-width: 50rem"
        >
          <template #header>
            <h2>Tabel criterii</h2>
          </template>
          <Column
            field="name"
            header="Name"
            style="width: 15%"
            :editable="true"
            body-style="text-align:center"
          >
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
          </Column>

          <Column
            field="type"
            header="Type"
            style="width: 15%"
            :editable="true"
            bodyStyle="text-align:center"
          >
            <template #editor="{ data, field }">
              <DropDown
                v-model="data[field]"
                :options="criterionTypesObjects"
                optionLabel="label"
                optionValue="value"
              >
                <template #option="slotProps">
                  <Tag :value="slotProps.option.value" />
                </template>

                <template #body="slotProps">
                  <Tag :value="slotProps.data.optimizationType" />
                </template>
              </DropDown>
            </template>
          </Column>

          <Column
            field="optimizationType"
            header="Optimization Type"
            style="width: 15%"
            :editable="true"
            bodyStyle="text-align:center"
          >
            <template #editor="{ data, field }">
              <DropDown
                v-model="data[field]"
                :options="optimizationTypesObjects"
                optionLabel="label"
                optionValue="value"
              >
                <template #option="slotProps">
                  <Tag :value="slotProps.option.value" />
                </template>

                <template #body="slotProps">
                  <Tag :value="slotProps.data.optimizationType" />
                </template>
              </DropDown>
            </template>
          </Column>

          <Column
            field="weight"
            header="Weight"
            style="width: 20%"
            :editable="true"
            body-style="text-align:center"
          >
            <template #editor="{ data, field }">
              <InputNumber v-model.number="data[field]" />
            </template>
          </Column>

          <Column
            field="aspirationLevel"
            header="Aspiration Level"
            style="width: 15%"
            :editable="true"
            body-style="text-align:center"
          >
            <template #editor="{ data, field }">
              <InputNumber v-model.number="data[field]" />
            </template>
          </Column>

          <Column
            field="acceptedDeviation"
            header="Accepted Deviation"
            style="width: 15%"
            :editable="true"
            body-style="text-align:center"
          >
            <template #editor="{ data, field }">
              <InputNumber v-model.number="data[field]" />
            </template>
          </Column>

          <Column
            :rowEditor="true"
            style="width: 5%"
            bodyStyle="text-align:center"
            header="Editează rând"
          ></Column>

          <Column style="width: 5%" bodyStyle="text-align:center" header="Șterge rând">
            <template #body="{ data }">
              <Button icon="pi pi-trash" rounded class="p-button-danger" @click="deleteRowCriteria(data)" />
            </template>
          </Column>
        </DataTable>
      </div>

      <!-- Variants data table -->
      <div v-if="criteria.length != 0" class="flex justify-content-center">
        <div style="width: 100%">
          <DataTable
            :value="variants"
            :columns="columns"
            editMode="cell"
            tableClass="editable-cells-table"
            @cell-edit-complete="onCellEditComplete"
            :editable="true"
          >
            <template #header>
              <div class="flex justify-content-between align-items-center">
                <h2>Tabel variante</h2>
                <div class="flex justify-content-between mt-2">
                  <div>
                    <Button type="button" class="border-round-md mr-2" @click="openDialog"
                      >Adaugă variantă</Button
                    >
                  </div>
                  <Button
                    style="max-height: 30px"
                    type="button"
                    class="border-round-md p-button-danger"
                    @click="emptyTable"
                    >Golește tabel</Button
                  >
                </div>
              </div>
            </template>
            <Column field="variant" header="Variant" :editable="true" bodyStyle="text-align:center">
              <template #editor="{ data, field }"> <InputText v-model="data[field]" /> </template
            ></Column>
            <template v-for="criterion in criteria" :key="criterion.name">
              <Column
                :field="criterion.name"
                :header="criterion.name"
                :editable="true"
                bodyStyle="text-align:center"
              >
                <template #editor="{ data, field }"> <InputText v-model="data[field]" /> </template
              ></Column>
            </template>
            <Column style="width: 5%" bodyStyle="text-align:center" header="Șterge rând">
              <template #body="{ data }">
                <Button
                  icon="pi pi-trash"
                  rounded
                  class="p-button-danger"
                  @click="deleteRowVariant(data)"
                />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>

      <Dialog v-model:visible="dialogVisible" @hide="resetForm">
        <div class="p-fluid p-4">
          <div class="mt-2">
            <label style="color: black">Varianta</label>
            <InputText v-model="formData.variant" />
          </div>
          <div class="mt-2" v-for="(criterion, index) in criteria" :key="index">
            <label style="color: black">{{ criterion.name }}</label>
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
          <Button
            type="button"
            class="border-round-md"
            id="denyDialog"
            label="Închide"
            @click="hideDialog"
            style="background-color: #c21f2a; color: white"
          />
          <Button
            type="button"
            class="border-round-md"
            id="accDialog"
            label="Adaugă"
            @click="addRow"
            style="color: white; border: 1px solid white"
          />
        </div>
      </Dialog>

      <div v-if="variants.length > 0" class="mt-4">
        <Button type="button" class="border-round-md" @click="calculateOptimalDecision()"
          >Calculeaza decizia optimă</Button
        >
      </div>

      <!-- Determining fuzzy triangular real numbers -->
      <div v-if="associatedRealNumber.length > 0" class="flex justify-content-center">
        <Card class="mt-4" style="width: 100%">
          <template #title>
            <h4>Numerele reale asociate numerelor fuzzy triunghiulare:</h4>
          </template>
          <template #subtitle> <hr style="width: 100%; border-color: white" /> </template>
          <template #content>
            <div class="flex flex-row justify-content-center" v-if="associatedRealNumber">
              <div v-for="(item, index) in associatedRealNumber" :key="index" class="flex flex-row">
                <p class="flex justify-content-center">{{ index + 1 }}. {{ item }}</p>
              </div>
            </div>
          </template>
        </Card>
      </div>

      <!-- Determining fuzzy sets -->
      <DataTable class="mt-4" v-if="fuzzyMatrix.length > 0" :value="fuzzyMatrix">
        <template #header>
          <h2>Mulțimile fuzzy</h2>
        </template>
        <Column field="variant" header="Variant" bodyStyle="text-align: center"></Column>
        <Column
          v-for="criterion in criteria"
          :key="criterion.name"
          :field="criterion.name"
          :header="criterion.name"
          bodyStyle="text-align:center"
        ></Column>
      </DataTable>

      <!-- Finall output - decision - hierarchy -->

      <div
        v-if="optimalDecision.length > 0 && hierarchy.length > 0"
        class="flex flex-row justify-content-between mb-6"
      >
        <Card class="mt-4" style="width: 45%">
          <template #title> <h3>Decizia optimă:</h3> </template>
          <template #subtitle> <hr style="width: 100%; border-color: white" /> </template>
          <template #content>
            <div class="flex flex-column" v-if="optimalDecision">
              <div
                v-for="dec in optimalDecision"
                :key="dec"
                class="flex flex-column justify-content-center"
              >
                <div>Varianta: {{ dec.variant }}</div>
                <div>Scorul: {{ dec.score }}</div>
              </div>
            </div>
          </template>
        </Card>
        <Card class="mt-4" style="width: 45%">
          <template #title> <h3>Ierarhia</h3> </template>
          <template #subtitle> <hr style="width: 100%" /> </template>
          <template #content>
            <div class="flex flex-column" v-if="hierarchy">
              <div class="flex flex-wrap justify-content-center">
                <div v-for="(item, index) in hierarchy" :key="index" class="flex flex-column">
                  <div class="flex flex-column justify-content-center">
                    <div class="flex justify-content-center mr-2">
                      {{ item.variant }} {{ index < hierarchy.length - 1 ? '>&nbsp;' : '' }}
                    </div>
                    <div class="flex justify-content-center">{{ item.score }}</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </TabPanel>
  </TabView>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'primevue/usetoast'

//Alegerea unui automobil

const criteria = ref([
  {
    name: 'Pret',
    type: 'Regular',
    optimizationType: 'Min',
    weight: 0.3,
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
  },
  {
    name: 'Consum_100km',
    type: 'Fuzzy',
    optimizationType: 'Min',
    weight: 0.3,
    aspirationLevel: 5.5,
    acceptedDeviation: 1.5
  }
])

const variants = ref([
  {
    variant: 'Masina 1',
    Pret: 13.5,
    Cheltuieli: '400, 430, 500',
    GradConfort: 20,
    Consum_100km: '4, 4.5, 7'
  },
  {
    variant: 'Masina 2',
    Pret: 12,
    Cheltuieli: '440, 500, 530',
    GradConfort: 19,
    Consum_100km: '4.8, 5.6, 9'
  },
  {
    variant: 'Masina 3',
    Pret: 11,
    Cheltuieli: '380, 400, 480',
    GradConfort: 17,
    Consum_100km: '5, 5.5, 6.8'
  },
  {
    variant: 'Masina 4',
    Pret: 10.5,
    Cheltuieli: '410, 450, 520',
    GradConfort: 16,
    Consum_100km: '4.2, 4.8, 6'
  },
  {
    variant: 'Masina 5',
    Pret: 9.8,
    Cheltuieli: '420, 445, 480',
    GradConfort: 18,
    Consum_100km: '4.3, 5.1, 6.2'
  }
])

//Problema unui loc de work

// const criteria = ref([
//   {
//     name: 'salariu',
//     type: 'Regular',
//     optimizationType: 'Max',
//     weight: '',
//     aspirationLevel: 2500,
//     acceptedDeviation: 1000
//   },
//   {
//     name: 'distanta',
//     type: 'Fuzzy',
//     optimizationType: 'Min',
//     weight: '',
//     aspirationLevel: 30,
//     acceptedDeviation: 50
//   },
//   {
//     name: 'solicitarea',
//     type: 'Fuzzy',
//     optimizationType: 'Min',
//     weight: '',
//     aspirationLevel: 10,
//     acceptedDeviation: 5
//   },
//   {
//     name: 'satisfactie',
//     type: 'Regular',
//     optimizationType: 'Max',
//     weight: '',
//     aspirationLevel: '',
//     acceptedDeviation: ''
//   }
// ])

// const criteria = ref([
//   {
//     name: 'salariu',
//     type: 'Regular',
//     optimizationType: 'Max',
//     weight: 0.5,
//     aspirationLevel: 2500,
//     acceptedDeviation: 1000
//   },
//   {
//     name: 'distanta',
//     type: 'Fuzzy',
//     optimizationType: 'Min',
//     weight: 0.1,
//     aspirationLevel: 30,
//     acceptedDeviation: 50
//   },
//   {
//     name: 'solicitarea',
//     type: 'Fuzzy',
//     optimizationType: 'Min',
//     weight: 0.2,
//     aspirationLevel: 10,
//     acceptedDeviation: 5
//   },
//   {
//     name: 'satisfactie',
//     type: 'Regular',
//     optimizationType: 'Max',
//     weight: 0.2,
//     aspirationLevel: '',
//     acceptedDeviation: ''
//   }
// ])

// const variants = ref([
//   { variant: 'j1', salariu: 3500, distanta: '50,70,80', solicitarea: '12,14,15', satisfactie: 1 },
//   { variant: 'j2', salariu: 4000, distanta: '15,30,40', solicitarea: '12,16,18', satisfactie: 0.7 },
//   { variant: 'j3', salariu: 1800, distanta: '10,15,25', solicitarea: '6,10,12', satisfactie: 0.8 },
//   { variant: 'j4', salariu: 2000, distanta: '30,40,45', solicitarea: '5,6,9', satisfactie: 0.4 },
//   { variant: 'j5', salariu: 2400, distanta: '30,50,60', solicitarea: '9,12,16', satisfactie: 0.9 }
// ])

// const criteria = ref([])
// const variants = ref([])

const tglBtn = ref(false)

const optimalDecision = ref([{}])
const hierarchy = ref([])
const associatedRealNumber = ref([])

const newCriterion = ref({
  name: '',
  type: '',
  optimizationType: '',
  weight: null,
  aspirationLevel: null,
  acceptedDeviation: null
})
const columns = criteria.value.map((criterion) => {
  return { field: criterion.name, header: criterion.name, sortable: true }
})

const showDeleteCriteriaBtn = ref(false)

// const deleteCriteria = () => {
//   criteria.value = []
//   showDeleteCriteriaBtn.value = false
// }

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
  //console.log(variants.value)
}

const emptyTable = () => {
  variants.value = []
}

const hideDialog = () => {
  dialogVisible.value = false
}

const criterionTypes = ref(['Regular', 'Fuzzy'])
const criterionTypesObjects = ref([
  { label: 'Regular', value: 'Regular' },
  { label: 'Fuzzy', value: 'Fuzzy' }
])
const optimizationTypes = ref(['Min', 'Max'])
const optimizationTypesObjects = ref([
  { label: 'Min', value: 'Min' },
  { label: 'Max', value: 'Max' }
])

const addCriterion = () => {
  if (weightedSumCheck.value) {
    criteria.value.push({ ...newCriterion.value })
    newCriterion.value.name = ''
    newCriterion.value.type = ''
    newCriterion.value.optimizationType = ''
    newCriterion.value.weight = null
    newCriterion.value.aspirationLevel = null
    newCriterion.value.acceptedDeviation = null
    showDeleteCriteriaBtn.value = true
    // console.log(criteria.value)
  }
}

const onCellEditComplete = (event) => {
  let { data, newValue, field } = event
  data[field] = newValue
}

const fuzzyMatrix = ref([])

const consequencesMatrix = () => {
  fuzzyMatrix.value = []
  associatedRealNumber.value = []

  for (const variant of variants.value) {
    const fuzzyValues = {}
    fuzzyValues.variant = variant.variant // Add the variant name property

    for (const criterion of criteria.value) {
      const { name, type, optimizationType, aspirationLevel, acceptedDeviation } = criterion
      const value = variant[name]

      let fuzzyValue = 0

      if (aspirationLevel === '' && acceptedDeviation === '') {
        fuzzyValue = value
      } else {
        if (type === 'Fuzzy') {
          const convertedArray = value.split(/,\s*/).map(Number)
          const defuzzifiedValue =
            0.25 * (convertedArray[0] + 2 * convertedArray[1] + convertedArray[2])
          associatedRealNumber.value.push(defuzzifiedValue)
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
      }

      fuzzyValues[name] = fuzzyValue
    }

    fuzzyMatrix.value.push(fuzzyValues)
  }

  //console.log(fuzzyMatrix)
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
  optimalDecision.value = []
  hierarchy.value = [{ variant: null, score: null }]

  let membership = []
  let maxScore = -Infinity

  membership = membershipFunction()

  membership.forEach((score, index) => {
    const variantName = Object.values(variants.value[index])[0]

    if (score === maxScore) {
      optimalDecision.value.push({ variant: variantName, score })
    } else if (score > maxScore) {
      maxScore = score
      optimalDecision.value = [{ variant: variantName, score }]
    }
  })

  hierarchy.value = membership
    .map((score, index) => ({ variant: Object.values(variants.value[index])[0], score }))
    .sort((a, b) => b.score - a.score)

  console.log(hierarchy.value)
  console.log(optimalDecision.value)

  if (optimalDecision.value.length > 0 && hierarchy.value.length > 0) {
    showToast('info', 'Info', 'Decizia optimă a fost calculată!')
  }else{
    showToast('error', 'Eroare', 'Ceva nu a funcționat!')
  }


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
    weightedRow.variant = row.variant
    weightedRow.sum = Number(rowSum.toFixed(2))

    return weightedRow
  })

  let weightedArray = []
  weightedArray = weightedRows.map((row) => row.sum)

  console.log(weightedArray)
  return weightedArray
}

const weightlessOptimalDecision = (fuzzyMat) => {
  let weightlessRows = []

  weightlessRows = fuzzyMat.map((row) => {
    const weightlessRow = {}
    for (const criterion of criteria.value) {
      const { name } = criterion
      const value = row[name]

      weightlessRow[name] = Number(value)
    }

    const minRowValue = Math.min(...Object.values(weightlessRow))
    weightlessRow.variant = row.variant
    weightlessRow.min = Number(minRowValue.toFixed(2))
    return weightlessRow
  })

  let weightlessArray = []
  weightlessArray = weightlessRows.map((row) => row.min)

  console.log(weightlessArray)
  return weightlessArray
}

const onRowEditSave = (event) => {
  let { newData, index } = event

  console.log(newData)
  if (weightedSumCheckDataTable(newData.weight, index)) {
    criteria.value[index] = newData
    showToast('success', 'Succes', 'Modificările au fost salvate!')
  }
}

const editingRows = ref([])

function deleteRowCriteria(row) {
  const index = criteria.value.findIndex((item) => item.name === row.name)
  if (index !== -1) {
    criteria.value.splice(index, 1)
    showToast('info', 'Info', 'Rândul a fost șters!')
  }
  //console.log(criteria.value)
}

const deleteRowVariant = (row) => {
  const index = variants.value.findIndex((item) => item.variant === row.variant)
  if (index !== -1) {
    variants.value.splice(index, 1)
    //console.log(variants.value)
    showToast('info', 'Info', 'Rândul a fost șters!')
  }
}
const toast = useToast()

const weightedSumCheck = computed(() => {
  let totalWeight = 0
  let isValid = true

  totalWeight =
    criteria.value.reduce((sum, criterion) => sum + Number(criterion.weight), 0) +
    Number(newCriterion.value.weight)

  console.log(totalWeight)
  if (totalWeight <= 1) {
    return isValid
  } else {
    showToast('error', 'Eroare', 'Suma ponderilor nu poate depasi 1!')
    return !isValid
  }
})

const weightedSumCheckDataTable = (weight, index) => {
  let totalWeight = 0
  let isValid = true

  totalWeight =
    criteria.value.reduce((sum, criterion) => sum + Number(criterion.weight), 0) + Number(weight)
  totalWeight = totalWeight - criteria.value[index].weight

  console.log(totalWeight)
  if (totalWeight <= 1) {
    return isValid
  } else {
    showToast('error', 'Eroare', 'Suma ponderilor nu poate depasi 1!')
    return !isValid
  }
}

const showToast = (severity, msg, detail) => {
  toast.add({
    severity: severity,
    summary: msg,
    detail: detail,
    life: 5000
  })
}
</script>

<style scoped>
.navBarStyle {
  background-color: transparent;
}
:deep(.p-button) {
  /* background-color: black; */
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
:deep(.p-column-header-content) {
  justify-content: center;
}
:deep(.p-cell-editing){
  
}
.container {
  width: 80%;
  margin: auto;
  background-color: #000000;
  padding: 20px;
  border-radius: 15px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #dfd2d2;
}

h2 {
  color: #e0e0e0;
  margin-top: 20px;
}

p {
  color: #b3b3b3;
  text-indent: 3rem;
}

ul {
  margin-left: 1.6rem;
  color: #b3b3b3;
}

hr {
  border: 10;
  height: 1px;
  border-color: white;
  margin-bottom: 25px;
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
label {
  color: white;
}
</style>
