import request from '@/utils/request'
export default {
  namespaced:true,
  state:{
    address:[]
  },
  mutations:{
    refreshAddress(state,address){
      state.address = address;
    }
  },
  actions:{
    async findAddressByCustomerId(context,id){
      let response = await request.post("/address/findByCustomerId",{param:id});
      context.commit("refreshAddress",response.data)
    }
  }
}