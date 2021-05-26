import React, {useState} from 'react';
import clsx from 'clsx';
import { lighten, makeStyles,withStyles } from '@material-ui/core/styles';
import {Icons} from '../../components/Icons/iconsDashboard';
// import {ModalMui, ModalFullScreen} from '../../components/Main/MuiHelpers/Modal'
import {TotalNumVerification} from '../../helpers/StringVerification';
import {ContinueButton} from '../../components/Main/MuiHelpers/Button'
import IconButton from '../../components/Main/MuiHelpers/IconButton';
import {HeaderPage,Page,Container,InputsContainer,Title,SubTitle,IconCloseFull,IconGoBackFull} from '../../components/Dashboard/Components/Standard/PageCarousel'
import Checkbox from '@material-ui/core/Checkbox';
import {FormLabel,PoliticsContainer} from './styles'
import useTimeOut from '../../hooks/useTimeOut';
import Input, {InputEnd,InputUnform,SelectedEnd} from '../../components/Main/MuiHelpers/Input'
import {HeaderForm,FormContainer,SubTitleForm,TitleForm,DividerForm,AddAnotherForm,ButtonForm} from '../../components/Dashboard/Components/Form/comp'
import {NumberFormatCNPJ,NumberOnly,RGFormat,NumberFormatOnly,NumberFormatCEP, NumberFormatCPF,NumberFormatTel,NumberFormatCell} from '../../lib/textMask'
import {ModalButtons} from '../../components/Main/MuiHelpers/ModalButtons'
import * as Yup from 'yup'
import {estados} from '../../constants/geral'
import {onCheckCEP} from './func'
import styled from "styled-components";
import { SettingsPhoneTwoTone } from '@material-ui/icons';

const AddButtonActivitie = styled.div`
  margin:5px auto 20px 26px;
  padding:0px 10px 2px;
  display:inline-block;
  border-radius:10px;
  border: 1px solid ${({theme})=> theme.palette.background.line};
  background-color: ${({theme})=> theme.palette.primary.mainBlue};
  cursor: pointer;
  span {
    margin:0;
    padding:0;
    font-size:12px;
    color: ${({theme})=>theme.palette.primary.contrastText};
  }

  &:hover {
    opacity:0.7;
    /* filter: brightness(0.95); */
  }

  &:active {
    opacity:0.8;
    /* filter: brightness(0.95); */
  }
`;


export default function PageWrapper({children, ...restProps }) {
    return (
        <Page {...restProps}>
          <Container>
            {children}
          </Container>
        </Page>
    );
}

PageWrapper.IconClose =  function Header({onLogout,notification,setLoad,infoModal}) {

    return(
    <IconCloseFull >
        <IconButton onClick={()=>notification.modal({title: infoModal.title,text:infoModal.text,open:true,onClick:()=>onLogout({setLoad,notification})})} aria-label="close" icon={'Close'}/>
    </IconCloseFull>
  )
}

PageWrapper.IconBack =  function Header({setPosition,setInfoModal}) {

    function onGoBack() {
        setPosition(position=>position-1)
    }

  return(
    <IconGoBackFull >
        <IconButton onClick={onGoBack} aria-label="goBack" icon={'ArrowBack'}/>
    </IconGoBackFull>
  )
}

PageWrapper.Header =  function Header(props) {
  return(
    <HeaderPage center={props.center} >
        {/* <Title>Politicas de Privacidade</Title> */}
        <Title >{props.text}</Title>
        {props.subText && <SubTitle>{props.subText}</SubTitle>}
    </HeaderPage>

  )
}

PageWrapper.Input =  function EmailInput({setData,data}) {

  const inputChange = (index) => (event) => {
    console.log(event.target.value)
    let allData = [...data]
    if(index===2) {
        if(TotalNumVerification(event.target.value,11)) {
            allData[index] = {...allData[index],data:event.target.value, status:'OK'}
        } else (
            allData[index] = {...allData[index],data:event.target.value, status:'none'}
        )
    } else {
        if(event.target.value.length<1) {
            allData[index] = {...allData[index],data:event.target.value, status:'none'}
        } else (
            allData[index] = {...allData[index],data:event.target.value, status:'OK'}
        )
    }
    setData(allData)
  }

  const check = (index,value) => {
    let allData = [...data]
    if(index===2) {
        if(TotalNumVerification(value,11)) {
            allData[index] = {...allData[index], status:'OK'}
        } else (
            allData[index] = {...allData[index], status:'Warn',message:'CPF com formatação inválida'}
        )
    } else if (allData[index]?.required && allData[index].required) {
        if(value.length<1) {
            allData[index] = {...allData[index], status:'Warn',message:'Este campo não pode ser nulo'}
        } else (
            allData[index] = {...allData[index], status:'OK'}
        )
    }
    setData(allData)
  }

  return(
    <InputsContainer>
      {data.map((item,index)=>(
        <Input
            key={index}
            status={item?.status && item.status}
            icon={item?.status && item.status}
            required={item?.required?item.required:false}
            onBlur={({target})=>check(index,target.value)}
            onChange={inputChange(index)}
            size={'small'}
            inputProps={{style: {textTransform: 'capitalize'}}}
            label={item.name}
            title={item.message}
            placeholder={item.placeholder}
            variant="outlined"
            validation={(item && item?.status && (item.status === 'Check' || item.status === 'Warn' || item.status === 'Load'))}
        />
      ))}
    </InputsContainer>
  )
}

PageWrapper.Continue =  function Continue({data,setPosition,second,onAddData,checked,position=false}) {

  function disable() {

    let resp = false
    if (position) {
      resp = checked?false : true
    } else {
      data?.map((item)=>{
        if (item.status !== 'OK' && item.status !== 'Check') resp = true
      })
    }
    return resp
  }

  function onClickContinue() {
    setPosition(2)
  }

  return(
    <ContinueButton primary={'true'} onClick={second?onAddData:onClickContinue} size={'medium'} disable={`${disable()}`}>
      {second ?
      <p>Confirmar</p>
      :
      <p>Continuar</p>
      }
    </ContinueButton>
  )
}

PageWrapper.Politics =  function Continue({setChecked,checked}) {

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return(
    <>
      <PoliticsContainer >
        <h3>Politicas</h3>
        <p style={{textAlign:'justify',margin:'10px 0px 20px 0px'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        <h3>Seguran</h3>
        <p style={{textAlign:'justify',margin:'10px 0px 20px 0px'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        <h3>Politicas</h3>
        <p style={{textAlign:'justify',margin:'10px 0px 20px 0px'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        <h3>Seguran</h3>
        <p style={{textAlign:'justify',margin:'10px 0px 20px 0px'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </PoliticsContainer>
      <FormLabel
      control={
        <Checkbox
          checked={checked}
          onChange={handleChange}
          name="checkedB"
          color="primary"
        />
        }
        label="Eu li e concordo com os termos de uso e politicas de privacidade"
      />
    </>
  )
}

PageWrapper.FirstForm =  function InputLast({setUnform,unform}) {

  const formRef = React.useRef()

  const validation = Yup.object({
    nome: Yup.string().required('Nome não pode estar em branco.'),
    cpf: Yup.string().trim().length(14,'CPF incompleto').required('CPF não pode estar em branco.'),
    rg: Yup.string().trim().length(12,'RG incompleto').required('RG não pode estar em branco.'),
    cell: Yup.string().trim().length(15,'Número de celular incompleto').required('Número de celular não pode estar em branco.'),
  })

  const handleSubmit = React.useCallback(async (formData) => {
    formRef.current.setErrors({})
    try {
      await validation.validate(formData, { abortEarly: false })
      setUnform({...unform,...formData})
      console.log('submitted: ', formData)
    } catch (error) {
      console.log('error',error);
      const errors = {}
      console.log('submittedError: ', formData)
      error?.inner?.forEach((err) => {
        errors[err.path] = err.message
      })
      formRef.current?.setErrors(errors)
    }
  }, [unform])

  return(
    <InputsContainer>
      <FormContainer
         noValidate
         ref={formRef}
         onSubmit={handleSubmit}
      >
        <InputUnform
          width={'100%'}
          name={'nome'}
          labelWidth={120}
          label={'Nome Completo'}
          status={'Normal'}
          variant="outlined"
          inputProps={{style: {textTransform: 'capitalize',color:'#000'}}}
        />
        <InputUnform
          width={'50%'}
          name={'cpf'}
          labelWidth={30}
          style={{marginRight:20}}
          label={'CPF'}
          variant="outlined"
          inputProps={{placeholder:'000.000.000-00',style: {textTransform: 'capitalize',color:'#000'}}}
          inputComponent={NumberFormatCPF}
        />
        <InputUnform
          width={'50%'}
          name={'rg'}
          labelWidth={20}
          label={'RG'}
          variant="outlined"
          inputProps={{placeholder:'00.000.000-0',style: {textTransform: 'capitalize',color:'#000'}}}
          inputComponent={RGFormat}
        />
        <InputUnform
          width={'100%'}
          name={'cell'}
          labelWidth={70}
          label={'WhatsApp'}
          statusStart={'WhatsApp'}
          variant="outlined"
          inputProps={{placeholder:'(00) 00000-0000',style: {color:'#000'}}}
          iconStart={'WhatsApp'}
          inputComponent={NumberFormatCell}
        />
        <InputUnform
          width={'100%'}
          name={'facebook'}
          labelWidth={70}
          label={'Facebook'}
          statusStart={'Facebook'}
          variant="outlined"
          inputProps={{placeholder:'https://www.facebook.com/realiza.conecta',style: {color:'#000'}}}
          iconStart={'Facebook'}
        />
        <InputUnform
          width={'100%'}
          name={'instagram'}
          labelWidth={75}
          statusStart={'Instagram'}
          label={'Instagram'}
          iconStart={'Instagram'}
          variant="outlined"
          inputProps={{placeholder:'https://www.instagram.com/realiza.conecta',style: {color:'#000'}}}
        />
        <ButtonForm type='submit' jusify='center' primary={'true'} style={{width:'fit-content'}}>
          Proximo
        </ButtonForm>
      </FormContainer>
    </InputsContainer>
  )
}

PageWrapper.SecondForm =  function InputLast({setUnform,unform,onSecondForm}) {

  const initialStateData = {
    cep:'',
    status:'',
    message:'',
    type:'',
  }

  const formRef = React.useRef()
  const [data, setData] = useState(initialStateData)
  const [_key, setKey] = useState('') //dados dos email inseridos nos inputs
  const [onTimeOut,onClearTime] = useTimeOut()

  React.useEffect(() => {
    if (data.status == 'Check') setKey(Math.random())
  }, [unform])

  const validation = Yup.object({})

  const handleSubmit = React.useCallback(async (formData) => {
    formRef.current.setErrors({})
    try {
      await validation.validate(formData, { abortEarly: false })
      onSecondForm({...unform,...formData})
      console.log('submitted: ', formData)
    } catch (error) {
      console.log('error',error);
      const errors = {}
      console.log('submittedError: ', formData)
      error?.inner?.forEach((err) => {
        errors[err.path] = err.message
      })
      formRef.current?.setErrors(errors)
    }
  }, [unform])

  const onAddCEP = (event) => {
    onClearTime()
    onTimeOut(()=>checkCEP(event.target.value),1000)
    let fullData = {...data}
    if (event.target.value && event.target.value.length > 6) {
      fullData = {...fullData,cep:event.target.value, status:'Load',message:'Carregando...'}
      setData(fullData)
    } else if (fullData.cep){
      fullData = {...fullData, status:'none',message:''}
      setData(fullData)
    }
  }

  const checkCEP = (value) => {
    if (value.length > 7) {
      if (data.cep !== value) {
        setData(data=>({...data,cep:value, status:'Load',message:'Carregando...'}))
        fetch(`https://viacep.com.br/ws/${value}/json/`)
        .then((res) => res.json())
        .then((data) => {
          setData(data=>({...data,cep:value, status:'Check',message:'Cep válido'}))
          setUnform(unform=>({...unform,
            complemento:data.complemento,
            logradouro:data.logradouro,
            municipio:data.localidade,
            bairro:data.bairro,
            uf:data.uf,
            cep:value
          }))
        });
      }
    }
  }

  return(
    <InputsContainer>
      <FormContainer
         noValidate
         ref={formRef}
         onSubmit={handleSubmit}
         key={_key}
      >
        <InputUnform
        width={'100%'}
        name={`address.cep`}
        defaultValue={unform.cep}
        labelWidth={33}
        label={'CEP'}
        variant="outlined"
        inputComponent={NumberFormatCEP}
        size={'small'}
        status={data?.status && data.status}
        icon={data?.status && data.status}
        title={data.message}
        validation={(data && data?.status && (data.status === 'Check' || data.status === 'Warn' || data.status === 'Load'))}
        onChange={onAddCEP}
        />
        <InputUnform
          width={'100%'}
          defaultValue={unform.logradouro}
          name={`address.rua`}
          labelWidth={75}
          label={'Logradouro'}
          variant="outlined"
        />
        <InputUnform
          width={'50%'}
          defaultValue={unform?.bairro}
          name={`address.bairro`}
          labelWidth={50}
          label={'Bairro'}
          variant="outlined"
          style={{marginRight:20}}
        />
        <InputUnform
          width={'15%'}
          name={`address.numero`}
          labelWidth={63}
          label={'Número'}
          variant="outlined"
          style={{marginRight:20}}
          inputComponent={NumberFormatOnly}
        />
        <InputUnform
          width={'35%'}
          defaultValue={unform.complemento}
          name={`address.complemento`}
          labelWidth={96}
          label={'Complemento'}
          icon={'Info'}
          variant="outlined"
        />
        <InputUnform
            width={'90%'}
            defaultValue={unform?.municipio}
            name={`address.municipio`}
            labelWidth={70}
            label={'Município'}
            icon={'Info'}
            variant="outlined"
            style={{marginRight:20}}
            />
        <SelectedEnd
            width={'10%'}
            labelWidth={25}
            label={'UF'}
            selected={unform?.uf?(estados.findIndex(i=>i===unform.uf)+1):1}
            setData={(selected)=>setUnform(data=>({...data,uf:selected}))}
            data={estados}
            variant="outlined"
            />
        <ButtonForm type='submit' jusify='center' primary={'true'} style={{width:'fit-content'}}>
          Proximo
        </ButtonForm>
      </FormContainer>
    </InputsContainer>
  )
}

PageWrapper.ThirdForm =  function InputLast({setUnform,notification,unform,onThirdForm}) {

  const initialData = [
    { name: 'Educador Físico',activities:['Opção 1 Educador Físico','Opção 2 Educador Físico']},
    { name: 'Enfereiro',activities:['Opção 1 Enfereiro','Opção 2 Enfereiro']},
    { name: 'Farmacêutico',activities:['Opção 1 Farmacêutico' ,'Opção 2 Farmacêutico']},
    { name: 'Fisoterapeuta',activities:['Opção 1 Fisoterapeuta','Opção 2 Fisoterapeuta']},
    { name: 'Fonoaudiólogo',activities:['Opção 1 Fonoaudiólogo','Opção 2 Fonoaudiólogo']},
    { name: 'Médico',inputs:['CRM'],activities:['Opção 1 Médico','Opção 2 Médico']},
    { name: 'Naturopata',activities:['Opção 1 Naturopata','Opção 2 Naturopata']},
    { name: 'Nutricionista',activities:['Opção 1 Nutricionista','Opção 2 Nutricionista']},
    { name: 'Psicólogo',activities:['Opção 1 Psicólogo','Opção 2 Psicólogo' ]},
    { name: 'Psicopedagogo',activities:['Opção 1 Psicopedagogo','Opção 2 Psicopedagogo']},
  ]

  const formRef = React.useRef()
  const [data, setData] = useState([...initialData])
  const [profession, setProfession] = useState([])
  const [activities, setActivities] = useState([])
  const [open, setOpen] = useState(false)
  const [newActivit, setNewActivit] = useState('')

  const validation = Yup.object({})

  const handleSubmit = React.useCallback(async (formData) => {

    var object = {}
    Object.keys(formData).map(key=>{
      object[key] = Yup.string().required(`${key.split('-')[1]} não pode estar em branco.`)
    })

    formRef.current.setErrors({
      ...object
    })
    if (activities.length == 0) return notification.warn({message:'Selecione ao menos uma atividade para continuar.'})
    try {
      await validation.validate(formData, { abortEarly: false })
      onThirdForm({...unform,...formData})
      console.log('submitted: ', formData)
    } catch (error) {
      console.log('error',error);
      const errors = {}
      console.log('submittedError: ', formData)
      error?.inner?.forEach((err) => {
        errors[err.path] = err.message
      })
      formRef.current?.setErrors(errors)
    }
  }, [unform,activities,profession])


  const handleChangeProffesion = (event,item) => {
    if (!event.target.checked) {
      setProfession(profession=>[...profession.filter(i=>i!=item)])
    } else {
      setProfession(profession=>[...profession,item])
    }
  };

  const handleChangeActivities = (event,item) => {
    if (!event.target.checked) {
      setActivities(activitie=>[...activitie.filter(i=>i!=item)])
    } else {
      setActivities(activitie=>[...activitie,item])
    }
  };

  const onAddActivit = () => {
    const index = data.findIndex(i=>i.name==open)
    if (profession[index].activities.includes(newActivit)) return notification.error({message:'Essa atividade já existe.'})

    var newData = {...data}
    const newActivities = [...data[index].activities,newActivit]
    newData[index].activities = [...newActivities]
    setData([...newData])
  };


  function onCloseModalAdd() {
    setOpen(false)
    setNewActivit('')
  }

  const Ascendent = function (a, b) {
    if (a.name.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "") > b.name.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "")) {
        return 1;
    }
    if (b.name.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "") > a.name.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "")) {
        return -1;
    }
    return 0;
  };

  return(
    <InputsContainer>
      <FormContainer
         noValidate
         ref={formRef}
         onSubmit={handleSubmit}
      >
        <div style={{display:'flex',flexDirection:'column'}}>
          {data.sort(Ascendent).map(item=>{
            return (
              <div key={`${item.name}`} style={{display:'flex',flexDirection:'column'}}>
                <div style={{display:'flex',flexDirection:'row',margin:'0 0 10px 0'}}>
                  <Checkbox
                    style={{margin:0,padding:'0 5px 0 0'}}
                    checked={profession.includes(item.name)}
                    size='small'
                    onChange={(event)=>handleChangeProffesion(event,item.name)}
                    name={item.name}
                    color="primary"
                  />
                  <span style={{zIndex:110,marginBottom:0,display:'inline-block',marginTop:0}}>
                    {item.name}
                  </span>
                </div>
                {profession.includes(item.name) &&item?.inputs && item.inputs.length>0 && item.inputs.map((label,indexLabel)=>{
                  return (
                  <div key={`${item.name}-${label}`} style={{margin:'-5px 0 -5px 26px'}}>
                    <InputUnform
                      width={'100%'}
                      // defaultValue={unform.logradouro}
                      name={`${item.name}-${label}`}
                      labelWidth={75}
                      label={label}
                      variant="outlined"
                      inputComponent={NumberOnly}
                    />
                  </div>
                  )
                })}
                {profession.includes(item.name) && item.activities.sort().map((activit,indexAct)=>{
                  return (
                    <div key={`${activit}${indexAct}`} style={{display:'flex',flexDirection:'column'}}>
                      <div style={{display:'flex',flexDirection:'row',margin:'0 0 10px 26px'}}>
                        <Checkbox
                          style={{margin:0,padding:'0 6px 0 0'}}
                          checked={activities.includes(activit)}
                          size='small'
                          onChange={(event)=>handleChangeActivities(event,activit)}
                          name={activit}
                          color="primary"
                        />
                        <span style={{zIndex:110,marginBottom:0,display:'inline-block',marginTop:0}}>
                          {activit}
                        </span>
                      </div>
                      {indexAct == item.activities.length-1 &&
                        <AddButtonActivitie onClick={()=>setOpen(item.name)}>
                          <span>Adicionar Outro</span>
                        </AddButtonActivitie>
                      }
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
        {/* <InputUnform
          width={'100%'}
          name={`Teste`}
          labelWidth={75}
          label={'Teste'}
          variant="outlined"
        /> */}
        <ButtonForm type='submit' justify='center' primary={'true'} style={{width:'fit-content'}}>
          Proximo
        </ButtonForm>
      </FormContainer>
      <ModalButtons
        open={Boolean(open)}
        disable={false}
        onClick={onAddActivit}
        onClose={onCloseModalAdd}
        title={'Nova Atividade'}
        padding={'large'}
      >
        <div style={{backgroundColor:'#fff',padding:0}}>
          <p style={{marginBottom:15}}>Adicione uma nova atividade para a profissão: <span style={{fontWeight:'bold'}}>{profession}</span>?</p>
          <InputEnd
            width={'100%'}
            onChange={({target})=>setNewActivit(target.value)}
            size={'small'}
            labelWidth={90}
            name={'responsavel'}
            label={'Atividade'}
            title={newActivit}
            variant="outlined"
          />
        </div>
      </ModalButtons>
    </InputsContainer>
  )
}

