import {AddUserData} from '../../services/firestoreUser'
import {SeeIfCEPExists} from '../../services/nodeCalls'
import {wordUpper,keepOnlyNumbers,formatCPFeCNPJeCEPeCNAE} from '../../helpers/StringHandle'

export function onAddUserData({data,currentUser,setCurrentUser,setLoad,notification}) {

    let formattedData = {}
    data.map((item,index)=>{
        if(index===0) formattedData.name=item.data.trim()
        else if(index===1) formattedData.name=wordUpper((formattedData.name.trim() + ' ' + item.data.trim()).split(" "))
        else if(index===2) formattedData.info={CPF:item.data}
        else {
            let obj = {}
            obj[item.name] = item.data
            formattedData.info={...formattedData.info,...obj}
        }
    })
    setLoad(true)
    AddUserData(formattedData,currentUser.uid,checkSuccess,checkError)

    function checkSuccess() {
        setCurrentUser(currentUser=>({...currentUser,...formattedData}))
        setTimeout(() => {
            setLoad(false)
            notification.success({message:'Usuário criado com sucesso'})
        }, 1000);
    }

    function checkError(error) {
        setLoad(false)
        setTimeout(() => {
            notification.error({message:error})
        }, 1000);
    }

}

export function onCheckCEP(value,setData,notification){

  function checkSuccess(response) {
    // if (response) {
    //   setData(data=>({...data,cep:value, status:'Warn',message:'Cep já cadastrado'}))
    // } else {
    //   setData(data=>({...data,cep:value, status:'Check',message:'Cep válido'}))
    // }
  }

  function checkError(error) {
    notification.error({message:error?error:'Erro os adquirir CNPJ',modal:true})
    setData(data=>({...data,CNPJ:value, status:'Warn',message:error}))
  }

  SeeIfCEPExists(formatCPFeCNPJeCEPeCNAE(value),companyId,checkSuccess,checkError)
}
