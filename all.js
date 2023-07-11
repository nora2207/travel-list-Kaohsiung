// 0 Api資料
const dataApi = 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json';
// 2 設定項目資料
const App = {
  data() {
    return {
      datastore: [], // 景點清單
      cacheArea: '', // 選擇的景點
      cacheSearch: '', // 景點搜尋
      browseLog: [], // 瀏覽紀錄
    };
  },
  methods: {
    // 4 取得遠端資料
    getData(){
      axios.get(dataApi).then((res) => {
        this.datastore = res.data.result.records;
        // 預設第一個
        this.cacheArea = Object.assign({},this.datastore[0]);
      })
    },
    selectPlace(item){
      this.cacheArea = item;
    }             
  },
  // 5 搜尋
  computed: {
    fliterSearch(){
      return this.datastore.filter((item) => {
        return item.Name.match(this.cacheSearch);
      })
    }
  },
  // 6 瀏覽紀錄
  watch: {
    cacheArea(){
      if (!this.browseLog.includes(this.cacheArea)){
        if (this.browseLog.length <10){
          this.browseLog.push(this.cacheArea);
        }else{
          this.browseLog.shift();
          this.browseLog.push(this.cacheArea);
        }
      }
    }
  },
  // 3 生命週期
  created() {
    this.getData();
  }
};

// 1 建立 Vue
Vue.createApp(App).mount('#app');
