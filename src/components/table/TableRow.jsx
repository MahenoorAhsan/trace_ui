import React from 'react'
import { SocialIcon } from 'react-social-icons';
import style from './table.module.scss';

export default function TableRow(props) {
    const {data, index} = props;
    let returnObj = <></>;
    switch(index){
        case "Title":
            returnObj = <td><a href='#'>{data[index]}</a></td>
            break;
        case "CHANNEL":
            const url = 'https://www.'+data[index].toLowerCase()+'.com/'+data['Handle'].replace(/[|&;$%@"<>()+,]/g, "");
            returnObj = <td><SocialIcon url={url} style={{ borderRadius: 0, width: 25 }} /></td>
            break;
        case "Virality":
        case "Threat":
            let borderStyle ='' ;
            if(data[index] < 30){
                borderStyle = style.border_green;
            }else if(data[index] > 30 && data[index] < 70){
                borderStyle = style.border_yellow;
            }else{
                borderStyle = style.border_red;
            }
            
            returnObj = <td style={{ verticalAlign: 'middle', textAlign: 'center'}}>
                    <span className={`${style.threat_block} ${borderStyle}`}>{Math.ceil(data[index])}</span>
                </td>
            break
        case "EMOTION":
        case "SITUATIONS":
            returnObj = <td>{data[index].join(', ')}</td>
            break;
        case "Handle":
        case "LOCATION":
        case "PErson/Location detected":
            returnObj = <td>{data[index]}</td>
            break;
        case "VIEWS":
        case "REACTS":
            returnObj = <td>{data[index].toLocaleString('en-IN')}</td>
            break;
        default:
            returnObj = <td>{data[index]}</td>
    }
  return returnObj;
}
