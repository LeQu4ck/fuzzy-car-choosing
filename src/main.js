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

const app = createApp(App)

app.component('TabView', TabView)
app.component('TabPanel', TabPanel)
app.component('MenuBar', MenuBar)
app.component('Button', Button)


app.use(PrimeVue, {ripple: true});

app.mount('#app')
