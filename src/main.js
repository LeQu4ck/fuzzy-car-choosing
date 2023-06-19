/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';

//import "primevue/resources/themes/lara-light-indigo/theme.css";  
import "@/assets/theme.css"   
import "primevue/resources/primevue.min.css";
import 'primeicons/primeicons.css' 
import 'primeflex/primeflex.css'

//components
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import MenuBar from 'primevue/menubar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row';
import Dialog from 'primevue/dialog';
import Card from 'primevue/card';
import InputMask from 'primevue/inputmask';

//directives
import FocusTrap from 'primevue/focustrap';
import Tooltip from 'primevue/tooltip';

const app = createApp(App)

//components
app.component('TabView', TabView)
app.component('TabPanel', TabPanel)
app.component('MenuBar', MenuBar)
app.component('Button', Button)
app.component('InputText', InputText)
app.component('DropDown', Dropdown)
app.component('InputNumber', InputNumber)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Row', Row)
app.component('Dialog', Dialog)
app.component('Card', Card)
app.component('InputMask', InputMask)

//directives
app.directive('focustrap', FocusTrap);
app.directive('tooltip', Tooltip)

app.use(PrimeVue, {ripple: true});

app.mount('#app')
