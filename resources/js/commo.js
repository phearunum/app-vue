
export default {
    data() {
        return {
        }
    },
    methods: {
        async callApi(method, url, dataObj) {
            try {
                return await axios({
                    method: method,
                    url: 'http://localhost:8000' + url,
                    data: dataObj
                });
            } catch (e) {
                console.log(e.response)
                return e.response
            }
        },
        async postAPI(url, dataObj) {
            try {
                return await axios
                    .post(url, dataObj)
                    .then((res) => {
                        return res;
                    })
                    .catch((error) => {
                        return error.response
                    })
            } catch (e) {
                return e.response
            }


        },
        toast_err(desc, titel = "Oops") {
        
         
            this.$Message.error(desc);
          
        },
        toast_smg(desc, titel = "Oops") {
            this.$Message.success(desc);
        },
        checkUserPermission(key) {
            if (!this.userPermission) return true
            let isPermitted = false;
            for (let d of this.userPermission) {
                if (this.$route.name == d.name) {
                    if (d[key]) {
                        isPermitted = true
                        break;
                    } else {
                        break
                    }
                }

            }
            return isPermitted
        }

    },

   

}