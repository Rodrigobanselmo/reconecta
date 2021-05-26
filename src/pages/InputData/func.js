import {AddUserData} from '../../services/firestoreUser'
import {SeeIfCEPExists} from '../../services/nodeCalls'
import {wordUpper,keepOnlyNumbers,formatCPFeCNPJeCEPeCNAE} from '../../helpers/StringHandle'


const teste = {
  "uf": "AC",
  "name": "Rodrigo Barbosa Anselmo",
  "cpf": "231.231.231-23",
  "rg": "12.312.312-3",
  "cell": "(12) 31231-2312",
  "facebook": "",
  "instagram": "",
  "address": {
      "cep": "",
      "rua": "",
      "bairro": "",
      "numero": "",
      "complemento": "",
      "municipio": ""
  },
  "profession": [
      {
          "activit": "Opção 1 Educador Físico",
          "profession": "Educador Físico"
      },
      {
          "activit": "Opção 2 Educador Físico",
          "profession": "Educador Físico"
      }
  ]
}

export function onAddUserData({unform,currentUser,setCurrentUser,setLoad,notification}) {

    let formattedData = {...unform}
    delete formattedData['complemento']
    delete formattedData['logradouro']
    delete formattedData['municipio']
    delete formattedData['bairro']
    delete formattedData['cep']
    formattedData.name = wordUpper((formattedData.name.trim()).split(" "))

    setLoad(true)
    AddUserData(formattedData,currentUser.uid,checkSuccess,checkError)
    console.log('unform',unform)
    console.log('unform',formattedData)
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

// export function onCheckCEP(value,setData,notification){

//   function checkSuccess(response) {
//     // if (response) {
//     //   setData(data=>({...data,cep:value, status:'Warn',message:'Cep já cadastrado'}))
//     // } else {
//     //   setData(data=>({...data,cep:value, status:'Check',message:'Cep válido'}))
//     // }
//   }

//   function checkError(error) {
//     notification.error({message:error?error:'Erro os adquirir CNPJ',modal:true})
//     setData(data=>({...data,CNPJ:value, status:'Warn',message:error}))
//   }

//   SeeIfCEPExists(formatCPFeCNPJeCEPeCNAE(value),companyId,checkSuccess,checkError)
// }
