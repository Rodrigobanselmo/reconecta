import { DatePicker } from "@material-ui/pickers";
import styled, {css} from "styled-components";
import Input from '../../MuiHelpers/Input'
import './App.css'

export default function HoursSelection({min,setMin,hour,setHour}) {
  return (
    <div style={{flexDirection:'row',display:'flex',alignItems:'center',justifyContent:"flex-start", width:90}}>
      <Input
        style={{width:35}}
        className={'hour'}
        onChange={({target})=>setHour(parseInt(target.value)<0?23:parseInt(target.value)>23?0:parseInt(target.value))}
        title={'Horas'}
        size={'small'}
        type={'number'}
        value={hour}
        variant="standard"
      />
      <Input
        style={{width:48}}
        onChange={({target})=>setMin(parseInt(target.value)<0?59:parseInt(target.value)>59?0:parseInt(target.value))}
        className={'min'}
        size={'small'}
        type={'number'}
        value={min}
        variant="standard"
      />
    </div>
  )
}
